// App.tsx
// Main game component con anti-cheat Supabase

import { useState, useEffect, useRef } from 'react'
import type { GameState, Building } from './types'
import { supabase, verifyBuildingAction, signOut } from './supabaseClient'
import { calculateLevel, calculateBuildingCost, calculateBuildingIncome, calculatePrestigeGain, calculatePrestigeBonus, getAvailableBuildingsAtLevel, calculateTotalSlots, calculateSlotCost, calculateUpgradeBatch } from './buildings'
import { formatMoney, formatIncome, formatTime } from './formatting'
import { ACHIEVEMENTS, achievementIncomeBonus, findNewlyReached } from './achievements'
import './App.css'

export default function App() {
  const [gameState, setGameState] = useState<GameState | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)
  const [showPrestigeModal, setShowPrestigeModal] = useState(false)
  const [multiplier, setMultiplier] = useState(1)
  const [unlockedAch, setUnlockedAch] = useState<Set<string>>(new Set())
  const [showAchievements, setShowAchievements] = useState(false)
  const [achToast, setAchToast] = useState<string | null>(null)
  const stateRef = useRef<GameState | null>(null)
  stateRef.current = gameState

  // Carica gioco al mount
  useEffect(() => {
    loadGame()
  }, [])

  async function loadGame() {
    try {
      // 1. Verifica autenticazione
      const { data: { user: authUser }, error: authError } = await supabase.auth.getUser()
      
      if (authError || !authUser) {
        // Non è un errore: l'utente semplicemente non ha ancora fatto login.
        setUser(null)
        setGameState(null)
        setIsLoading(false)
        return
      }

      setUser(authUser)

      // 2. Carica game state
      const { data: gameData, error: dbError } = await supabase
        .from('game_state')
        .select('*')
        .eq('user_id', authUser.id)
        .single()

      if (dbError) {
        // Primo gioco - crea entry
        const newState = {
          user_id: authUser.id,
          money: 100000,
          level: 1,
          prestige: 0,
          slots: 12,
          play_time_seconds: 0,
          total_money_earned: 0
        }

        const { data: created, error: createError } = await supabase
          .from('game_state')
          .insert([newState])
          .select()
          .single()

        if (createError) throw createError

        setGameState({
          user_id: authUser.id,
          money: created.money,
          level: created.level,
          prestige: created.prestige,
          slots: created.slots,
          bought_slots: created.bought_slots || 0,
          lifetime_buildings_built: created.lifetime_buildings_built || 0,
          lifetime_upgrades: created.lifetime_upgrades || 0,
          play_time_seconds: created.play_time_seconds,
          total_money_earned: created.total_money_earned,
          buildings: [],
          last_sync: new Date()
        })
      } else {
        // Carica edifici
        const { data: buildings } = await supabase
          .from('buildings')
          .select('*')
          .eq('user_id', authUser.id)

        setGameState({
          user_id: authUser.id,
          money: gameData.money,
          level: gameData.level,
          prestige: gameData.prestige,
          slots: gameData.slots,
          bought_slots: gameData.bought_slots || 0,
          lifetime_buildings_built: gameData.lifetime_buildings_built || 0,
          lifetime_upgrades: gameData.lifetime_upgrades || 0,
          play_time_seconds: gameData.play_time_seconds,
          total_money_earned: gameData.total_money_earned,
          buildings: buildings || [],
          last_sync: new Date()
        })
      }
      // Carica gli achievement gia sbloccati
      const { data: { user: au } } = await supabase.auth.getUser()
      if (au) {
        const { data: achRows } = await supabase
          .from('achievements').select('achievement_key').eq('user_id', au.id)
        setUnlockedAch(new Set((achRows || []).map((r: any) => r.achievement_key)))
      }
    } catch (err) {
      console.error('Load error:', err)
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }

  // Tick LOCALE ogni secondo: reddito fluido in tempo reale (solo UI, non salva)
  useEffect(() => {
    if (!gameState) return

    const tick = setInterval(() => {
      setGameState(prev => {
        if (!prev) return null
        // Reddito al secondo = somma del reddito di tutti gli edifici
        const achBonus = 1 + achievementIncomeBonus(unlockedAch)
        const incomePerSecond = prev.buildings.reduce((sum, b) =>
          sum + calculateBuildingIncome(b.type, b.level), 0
        ) * achBonus
        if (incomePerSecond <= 0) return prev

        const newMoney = prev.money + incomePerSecond
        const newTotalEarned = (prev.total_money_earned || 0) + incomePerSecond
        const newLevel = calculateLevel(newTotalEarned, incomePerSecond)

        // Popup prestige al raggiungimento di un nuovo milestone
        if (newLevel > prev.level && newLevel % 10 === 0) {
          setShowPrestigeModal(true)
        }

        return {
          ...prev,
          money: newMoney,
          total_money_earned: newTotalEarned,
          level: newLevel
        }
      })
    }, 1000) // ogni secondo

    return () => clearInterval(tick)
  }, [gameState?.buildings, unlockedAch])

  // Controllo achievement ogni 3 secondi: sblocca i nuovi raggiunti
  useEffect(() => {
    if (!gameState) return
    const check = setInterval(async () => {
      const s = stateRef.current
      if (!s) return
      const totalIncome = s.buildings.reduce((sum, b) => sum + calculateBuildingIncome(b.type, b.level), 0)
      const ctx = {
        state: s,
        totalIncome,
        lifetimeBuildings: s.lifetime_buildings_built || 0,
        lifetimeUpgrades: s.lifetime_upgrades || 0
      }
      const newly = findNewlyReached(ctx, unlockedAch)
      if (newly.length > 0) {
        const keys = newly.map(a => a.key)
        await supabase.from('achievements').insert(
          keys.map(k => ({ user_id: s.user_id, achievement_key: k }))
        )
        setUnlockedAch(prev => {
          const next = new Set(prev)
          keys.forEach(k => next.add(k))
          return next
        })
        setAchToast(`${newly[0].icon} ${newly[0].name} sbloccato! +${(newly[0].rewardIncome * 100).toFixed(0)}% reddito`)
        setTimeout(() => setAchToast(null), 4000)
      }
    }, 3000)
    return () => clearInterval(check)
  }, [gameState?.user_id, unlockedAch])

  // Salvataggio periodico sul server ogni 30 sec (anti-cheat + persistenza)
  useEffect(() => {
    if (!gameState) return

    const interval = setInterval(async () => {
      try {
        // Legge lo stato attuale dalla UI e lo salva nel DB
        setGameState(prev => {
          if (!prev) return null
          const newPlayTime = (prev.play_time_seconds || 0) + 30

          // Salvataggio asincrono (non blocca la UI)
          supabase
            .from('game_state')
            .update({
              money: prev.money,
              level: prev.level,
              total_money_earned: prev.total_money_earned,
              play_time_seconds: newPlayTime,
              last_sync: new Date()
            })
            .eq('user_id', prev.user_id)
            .then(() => {})

          return { ...prev, play_time_seconds: newPlayTime, last_sync: new Date() }
        })
      } catch (err) {
        console.error('Save error:', err)
      }
    }, 30000) // 30 secondi

    return () => clearInterval(interval)
  }, [gameState?.user_id])

  // Salva subito il denaro corrente nel DB, così l'anti-cheat vede il valore reale
  async function syncMoneyToServer(): Promise<boolean> {
    if (!gameState) return false
    try {
      const { error } = await supabase
        .from('game_state')
        .update({
          money: gameState.money,
          level: gameState.level,
          total_money_earned: gameState.total_money_earned,
          last_sync: new Date()
        })
        .eq('user_id', gameState.user_id)
      return !error
    } catch {
      return false
    }
  }

  // Build building (con anti-cheat server)
  async function buildBuilding(buildingType: string) {
    if (!gameState) return

    // Blocco al cap: non si può costruire se gli slot sono pieni
    if (gameState.buildings.length >= gameState.slots) {
      alert('Slot pieni! Vendi una proprietà o compra uno slot per costruire ancora.')
      return
    }

    try {
      const timestamp = Date.now()
      const cost = calculateBuildingCost(buildingType, 1)

      // 0. Sincronizza il denaro reale col server PRIMA della verifica anti-cheat
      await syncMoneyToServer()

      // 1. VERIFICA SERVER-SIDE (anti-cheat!)
      const { data: verification, error: verifyError } = await verifyBuildingAction(
        gameState.user_id,
        'build',
        buildingType,
        cost,
        new Date(timestamp)
      )

      if (verifyError || !verification?.allowed) {
        alert(`Build denied: ${verification?.error_message || verifyError?.message}`)
        return
      }

      if (verification.suspicious_flag) {
        console.warn('⚠️ Action flagged as suspicious')
      }

      // 2. ESEGUI AZIONE LOCALE
      const newMoney = gameState.money - cost
      const newBuilding: Building = {
        id: crypto.randomUUID(),
        type: buildingType,
        level: 1,
        multiplier: 0
      }

      // 3. LOG TRANSACTION (audit trail)
      await supabase.from('transactions').insert({
        user_id: gameState.user_id,
        action: 'build',
        building_type: buildingType,
        cost_paid: cost,
        money_before: gameState.money,
        money_after: newMoney,
        level_before: gameState.level,
        level_after: gameState.level,
        timestamp: new Date(),
        client_timestamp: new Date(timestamp)
      })

      // 4. SALVA EDIFICIO NEL DB
      await supabase
        .from('buildings')
        .insert({
          user_id: gameState.user_id,
          type: buildingType,
          level: 1,
          multiplier: 0
        })

      // 5. SALVA GAME STATE (costruire e' una spesa: total_money_earned NON cambia)
      const newLifetimeBuilt = ((gameState as any).lifetime_buildings_built || 0) + 1
      await supabase
        .from('game_state')
        .update({
          money: newMoney,
          lifetime_buildings_built: newLifetimeBuilt
        })
        .eq('user_id', gameState.user_id)

      // 6. UPDATE UI
      setGameState({
        ...gameState,
        money: newMoney,
        buildings: [...gameState.buildings, newBuilding],
        lifetime_buildings_built: newLifetimeBuilt
      } as any)
    } catch (err) {
      console.error('Build error:', err)
      alert('Build failed: ' + (err instanceof Error ? err.message : 'Unknown error'))
    }
  }

  // Vendi un edificio (rimborso 50% del costo, mai un guadagno)
  async function sellBuilding(building: Building) {
    if (!gameState) return

    try {
      const refund = Math.floor(calculateBuildingCost(building.type, building.level) * 0.5)
      const newMoney = gameState.money + refund

      // 1. Rimuovi l'edificio dal DB
      const { error: delError } = await supabase
        .from('buildings')
        .delete()
        .eq('id', building.id)

      if (delError) {
        alert('Vendita fallita: ' + delError.message)
        return
      }

      // 2. Aggiorna il denaro (total_money_earned NON cambia: non è un vero guadagno)
      await supabase
        .from('game_state')
        .update({ money: newMoney })
        .eq('user_id', gameState.user_id)

      // 3. Log transazione (audit trail)
      await supabase.from('transactions').insert({
        user_id: gameState.user_id,
        action: 'sell',
        building_type: building.type,
        cost_paid: -refund,
        money_before: gameState.money,
        money_after: newMoney,
        level_before: gameState.level,
        level_after: gameState.level,
        timestamp: new Date(),
        client_timestamp: new Date()
      })

      // 4. Aggiorna UI
      setGameState({
        ...gameState,
        money: newMoney,
        buildings: gameState.buildings.filter(b => b.id !== building.id)
      })
    } catch (err) {
      console.error('Sell error:', err)
      alert('Vendita fallita: ' + (err instanceof Error ? err.message : 'Unknown error'))
    }
  }

  // Potenzia un edificio: +1 livello, aumenta il reddito. Costo esponenziale (anti-exploit)
  async function upgradeBuilding(building: Building) {
    if (!gameState) return

    try {
      // Calcola quanti livelli si possono comprare col moltiplicatore e i soldi disponibili
      const batch = calculateUpgradeBatch(
        building.type,
        building.level,
        multiplier,
        gameState.money
      )

      if (batch.levels === 0) {
        alert('Fondi insufficienti per il potenziamento')
        return
      }

      const targetLevel = building.level + batch.levels
      const cost = batch.totalCost

      // Conferma esplicita dell'acquisto
      const incomeNow = calculateBuildingIncome(building.type, building.level)
      const incomeNext = calculateBuildingIncome(building.type, targetLevel)
      const conferma = window.confirm(
        `Potenziare ${building.type} di ${batch.levels} liv. (Lv${building.level} → Lv${targetLevel})?\n\n` +
        `Costo totale: ${formatMoney(cost)}\n` +
        `Reddito: ${formatIncome(incomeNow)} → ${formatIncome(incomeNext)}`
      )
      if (!conferma) return

      // Sincronizza il denaro reale col server PRIMA della verifica anti-cheat
      await syncMoneyToServer()

      // Anti-cheat: verifica lato server (sul costo totale)
      const { data: verification, error: verifyError } = await verifyBuildingAction(
        gameState.user_id,
        'upgrade',
        building.type,
        cost,
        new Date()
      )

      if (verifyError || !verification?.allowed) {
        alert(`Upgrade negato: ${verification?.error_message || verifyError?.message}`)
        return
      }

      const newMoney = gameState.money - cost

      // 1. Aggiorna il livello dell'edificio nel DB
      const { error: updError } = await supabase
        .from('buildings')
        .update({ level: targetLevel })
        .eq('id', building.id)

      if (updError) {
        alert('Upgrade fallito: ' + updError.message)
        return
      }

      // 2. Scala il denaro (total_money_earned NON cambia: è una spesa)
      await supabase
        .from('game_state')
        .update({ money: newMoney, lifetime_upgrades: (((gameState as any).lifetime_upgrades || 0) + batch.levels) })
        .eq('user_id', gameState.user_id)

      // 3. Log transazione
      await supabase.from('transactions').insert({
        user_id: gameState.user_id,
        action: 'upgrade',
        building_type: building.type,
        cost_paid: cost,
        money_before: gameState.money,
        money_after: newMoney,
        level_before: gameState.level,
        level_after: gameState.level,
        timestamp: new Date(),
        client_timestamp: new Date()
      })

      // 4. Aggiorna UI
      setGameState({
        ...gameState,
        money: newMoney,
        buildings: gameState.buildings.map(b =>
          b.id === building.id ? { ...b, level: targetLevel } : b
        ),
        lifetime_upgrades: (((gameState as any).lifetime_upgrades || 0) + batch.levels)
      } as any)
    } catch (err) {
      console.error('Upgrade error:', err)
      alert('Upgrade fallito: ' + (err instanceof Error ? err.message : 'Unknown error'))
    }
  }

  // Compra uno slot extra con denaro (costo esponenziale)
  async function buySlot() {
    if (!gameState) return

    try {
      const bought = gameState.bought_slots || 0
      const cost = calculateSlotCost(bought)

      if (gameState.money < cost) {
        alert('Fondi insufficienti per comprare uno slot')
        return
      }

      const newMoney = gameState.money - cost
      const newBought = bought + 1
      const newSlots = calculateTotalSlots(gameState.prestige, newBought)

      // Salva nel DB
      await supabase
        .from('game_state')
        .update({ money: newMoney, bought_slots: newBought, slots: newSlots })
        .eq('user_id', gameState.user_id)

      // Log transazione
      await supabase.from('transactions').insert({
        user_id: gameState.user_id,
        action: 'buy_slot',
        cost_paid: cost,
        money_before: gameState.money,
        money_after: newMoney,
        level_before: gameState.level,
        level_after: gameState.level,
        timestamp: new Date(),
        client_timestamp: new Date()
      })

      // Aggiorna UI
      setGameState({
        ...gameState,
        money: newMoney,
        bought_slots: newBought,
        slots: newSlots
      })
    } catch (err) {
      console.error('Buy slot error:', err)
      alert('Acquisto slot fallito: ' + (err instanceof Error ? err.message : 'Unknown error'))
    }
  }

  // Prestige choice
  async function handlePrestigeChoice(choice: 'continue' | 'reset') {
    if (!gameState) return

    try {
      const prestigeGain = calculatePrestigeGain(gameState.level)
      const newPrestige = gameState.prestige + prestigeGain

      // 1. LOG prestige in audit trail
      await supabase.from('prestige_log').insert({
        user_id: gameState.user_id,
        milestone_level: gameState.level,
        prestige_gained: prestigeGain,
        prestige_total: newPrestige,
        verified: true
      })

      if (choice === 'continue') {
        // OPZIONE A: Continua a giocare
        await supabase
          .from('game_state')
          .update({ prestige: newPrestige })
          .eq('user_id', gameState.user_id)

        setGameState({
          ...gameState,
          prestige: newPrestige
        })
      } else {
        // OPZIONE B: Resetta
        const newSlots = calculateTotalSlots(newPrestige, gameState.bought_slots || 0)

        // Cancella edifici
        await supabase
          .from('buildings')
          .delete()
          .eq('user_id', gameState.user_id)

        // Update game state
        await supabase
          .from('game_state')
          .update({
            money: 100000,
            level: 1,
            prestige: newPrestige,
            slots: newSlots,
            play_time_seconds: 0,
            total_money_earned: 0
          })
          .eq('user_id', gameState.user_id)

        setGameState({
          user_id: gameState.user_id,
          money: 100000,
          level: 1,
          prestige: newPrestige,
          slots: newSlots,
          bought_slots: gameState.bought_slots || 0,
          play_time_seconds: 0,
          total_money_earned: 0,
          buildings: [],
          last_sync: new Date()
        })
      }

      setShowPrestigeModal(false)
    } catch (err) {
      console.error('Prestige error:', err)
      alert('Error: ' + (err instanceof Error ? err.message : 'Unknown'))
    }
  }

  // Reset manuale volontario (disponibile da Lv10, con conferma)
  async function handleManualReset() {
    if (!gameState) return

    // Reset serio: solo da Lv10 in su
    if (gameState.level < 10) {
      alert('Il reset è disponibile dal Livello 10. Continua a crescere!')
      return
    }

    const prestigeGain = calculatePrestigeGain(gameState.level)
    const newPrestige = gameState.prestige + prestigeGain

    // Conferma esplicita: azione irreversibile
    const conferma = window.confirm(
      `Vuoi davvero ricominciare?\n\n` +
      `Guadagni: +${prestigeGain} Prestige (totale ${newPrestige})\n` +
      `Perdi: tutti gli edifici e i soldi attuali\n\n` +
      `I bonus prestige rendono la prossima partita più veloce. Procedere?`
    )
    if (!conferma) return

    try {
      // Log audit
      await supabase.from('prestige_log').insert({
        user_id: gameState.user_id,
        milestone_level: gameState.level,
        prestige_gained: prestigeGain,
        prestige_total: newPrestige,
        verified: true
      })

      const newSlots = calculateTotalSlots(newPrestige, gameState.bought_slots || 0)

      // Cancella edifici
      await supabase.from('buildings').delete().eq('user_id', gameState.user_id)

      // Reset dello stato (total_money_earned azzerato: riparti davvero da Lv1)
      await supabase
        .from('game_state')
        .update({
          money: 100000,
          level: 1,
          prestige: newPrestige,
          slots: newSlots,
          play_time_seconds: 0,
          total_money_earned: 0
        })
        .eq('user_id', gameState.user_id)

      setGameState({
        user_id: gameState.user_id,
        money: 100000,
        level: 1,
        prestige: newPrestige,
        slots: newSlots,
        bought_slots: gameState.bought_slots || 0,
        play_time_seconds: 0,
        total_money_earned: 0,
        buildings: [],
        last_sync: new Date()
      })
    } catch (err) {
      console.error('Reset error:', err)
      alert('Reset fallito: ' + (err instanceof Error ? err.message : 'Unknown'))
    }
  }

  // Logout
  async function handleLogout() {
    await signOut()
    setUser(null)
    setGameState(null)
  }

  if (isLoading) return <div className="loading">Loading...</div>
  if (!gameState || !user) return <LoginComponent onLoad={loadGame} />
  if (error) return <div className="error">Error: {error}</div>

  const totalIncome = gameState.buildings.reduce((sum, b) =>
    sum + calculateBuildingIncome(b.type, b.level), 0
  ) * (1 + achievementIncomeBonus(unlockedAch))
  const availableBuildings = getAvailableBuildingsAtLevel(gameState.level)
  const prestigeGain = calculatePrestigeGain(gameState.level)

  return (
    <div className="game-container">
      {/* Header */}
      <header className="game-header">
        <div className="header-left">
          <h1>🏙️ Empire Builder</h1>
          <div className="header-stats">
            <div className="stat">💰 {formatMoney(gameState.money)}</div>
            <div className="stat">⭐ Prestige: {gameState.prestige}</div>
            <div className="stat">📈 {formatIncome(totalIncome)}</div>
          </div>
        </div>
        <div className="header-right">
          <button onClick={() => setShowAchievements(true)} className="btn-ach">
            🏅 {unlockedAch.size}/{ACHIEVEMENTS.length}
          </button>
          <button
            onClick={handleManualReset}
            className="btn-reset"
            disabled={gameState.level < 10}
            title={gameState.level < 10 ? 'Disponibile dal Livello 10' : 'Ricomincia e guadagna Prestige'}
          >
            {gameState.level < 10 ? `🔄 Reset (Lv10)` : `🔄 Reset (+${prestigeGain} ⭐)`}
          </button>
          <button onClick={handleLogout} className="btn-logout">Logout</button>
        </div>
      </header>

      {/* Main Game */}
      <main className="game-main">
        {/* Selettore moltiplicatore globale */}
        <div className="multiplier-bar">
          <span className="multiplier-label">Quantità:</span>
          {[1, 5, 10, 100].map(m => (
            <button
              key={m}
              className={`multiplier-btn ${multiplier === m ? 'active' : ''}`}
              onClick={() => setMultiplier(m)}
            >
              x{m}
            </button>
          ))}
        </div>

        {/* Buildings Grid */}
        <div className="buildings-section">
          <h2>🏗️ Costruisci</h2>
          <div className="buildings-grid">
            {availableBuildings.map(buildingType => (
              <div key={buildingType} className="building-card">
                <h3>{buildingType}</h3>
                <p>Cost: {formatMoney(calculateBuildingCost(buildingType, 1))}</p>
                <p>Income: {formatIncome(calculateBuildingIncome(buildingType, 1))}</p>
                <button
                  onClick={() => buildBuilding(buildingType)}
                  disabled={
                    gameState.money < calculateBuildingCost(buildingType, 1) ||
                    gameState.buildings.length >= gameState.slots
                  }
                  className="btn-build"
                >
                  {gameState.buildings.length >= gameState.slots ? 'Slot pieni' : 'Costruisci'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Properties List */}
        <div className="properties-section">
          <div className="properties-header">
            <h2>🏘️ Proprietà ({gameState.buildings.length}/{gameState.slots})</h2>
            <button
              className="buy-slot-button"
              onClick={buySlot}
              disabled={gameState.money < calculateSlotCost(gameState.bought_slots || 0)}
            >
              ➕ Slot ({formatMoney(calculateSlotCost(gameState.bought_slots || 0))})
            </button>
          </div>
          <div className="properties-list">
            {gameState.buildings.length === 0 ? (
              <p className="empty">Nessuna proprietà ancora</p>
            ) : (
              gameState.buildings.map(building => (
                <div key={building.id} className="property-item">
                  <span>{building.type} Lv{building.level}</span>
                  <span>{formatIncome(calculateBuildingIncome(building.type, building.level))}</span>
                  {(() => {
                    const batch = calculateUpgradeBatch(building.type, building.level, multiplier)
                    return (
                      <button
                        className="upgrade-button"
                        onClick={() => upgradeBuilding(building)}
                        disabled={gameState.money < calculateBuildingCost(building.type, building.level + 1)}
                      >
                        ⬆ Upgrade x{multiplier} ({formatMoney(batch.totalCost)})
                      </button>
                    )
                  })()}
                  <button
                    className="sell-button"
                    onClick={() => sellBuilding(building)}
                  >
                    Vendi ({formatMoney(Math.floor(calculateBuildingCost(building.type, building.level) * 0.5))})
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Bottom Stats */}
      <footer className="game-footer">
        <div className="footer-stat">📊 Lv{gameState.level}</div>
        <div className="footer-stat">🏠 {gameState.buildings.length}</div>
        <div className="footer-stat">⏱️ {formatTime(gameState.play_time_seconds)}</div>
      </footer>

      {/* Prestige Modal */}
      {showPrestigeModal && gameState.level % 10 === 0 && (
        <PrestigeModal
          gameState={gameState}
          onChoice={handlePrestigeChoice}
        />
      )}

      {achToast && <div className="ach-toast">{achToast}</div>}

      {showAchievements && (
        <div className="modal-overlay" onClick={() => setShowAchievements(false)}>
          <div className="ach-modal" onClick={e => e.stopPropagation()}>
            <div className="ach-modal-head">
              <h2>🏅 Achievement ({unlockedAch.size}/{ACHIEVEMENTS.length})</h2>
              <button className="ach-close" onClick={() => setShowAchievements(false)}>✕</button>
            </div>
            <div className="ach-total">
              Bonus reddito totale: <b>+{(achievementIncomeBonus(unlockedAch) * 100).toFixed(0)}%</b>
            </div>
            <div className="ach-list">
              {ACHIEVEMENTS.map(a => {
                const done = unlockedAch.has(a.key)
                return (
                  <div key={a.key} className={`ach-item ${done ? 'done' : 'locked'}`}>
                    <span className="ach-icon">{done ? a.icon : '🔒'}</span>
                    <div className="ach-text">
                      <div className="ach-name">{a.name}</div>
                      <div className="ach-desc">{a.description}</div>
                    </div>
                    <div className="ach-reward">+{(a.rewardIncome * 100).toFixed(0)}%</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Login Component
function LoginComponent({ onLoad }: { onLoad: () => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleAuth() {
    setLoading(true)
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        alert('Check your email for confirmation!')
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        onLoad()
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Auth error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>🏙️ Empire Builder</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button onClick={handleAuth} disabled={loading} className="btn-primary">
          {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
        </button>
        <button onClick={() => setIsSignUp(!isSignUp)} className="btn-secondary">
          {isSignUp ? 'Already have account?' : 'Create account'}
        </button>
      </div>
    </div>
  )
}

// Prestige Modal
function PrestigeModal({ gameState, onChoice }: { gameState: GameState; onChoice: (choice: 'continue' | 'reset') => void }) {
  const prestigeGain = calculatePrestigeGain(gameState.level)
  const newPrestige = gameState.prestige + prestigeGain
  const bonus = calculatePrestigeBonus(newPrestige)

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>🎯 Scelta Strategica</h2>
        
        <div className="prestige-info">
          <p>Hai raggiunto <strong>Lv{gameState.level}</strong>!</p>
          <p>Prestige guadagnato: <strong>+{prestigeGain}</strong></p>
          <p>Prestige totale: <strong>{newPrestige} ⭐</strong></p>

          <hr />

          <h3>Bonus che si Attiveranno:</h3>
          <ul>
            <li>💰 +{formatPercent(bonus.incomeBonus)} Reddito</li>
            <li>💸 -{formatPercent(bonus.costBonus)} Costi</li>
            <li>🏗️ +{bonus.slotBonus} Slot</li>
          </ul>
        </div>

        <div className="modal-buttons">
          <button onClick={() => onChoice('continue')} className="btn-continue">
            ✅ Continua a Giocare
          </button>
          <button onClick={() => onChoice('reset')} className="btn-reset">
            ⭐ RESETTA ADESSO
          </button>
        </div>
      </div>
    </div>
  )
}

function formatPercent(value: number): string {
  return value.toFixed(2) + '%'
}
