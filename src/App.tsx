// App.tsx
// Main game component con anti-cheat Supabase

import { useState, useEffect } from 'react'
import type { GameState, Building } from './types'
import { supabase, verifyBuildingAction, calculatePlayerIncomeServer, signOut } from './supabaseClient'
import { calculateLevel, calculateBuildingCost, calculateBuildingIncome, calculatePrestigeGain, calculatePrestigeBonus, getAvailableBuildingsAtLevel } from './buildings'
import { formatMoney, formatIncome, formatTime } from './formatting'
import './App.css'

export default function App() {
  const [gameState, setGameState] = useState<GameState | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)
  const [showPrestigeModal, setShowPrestigeModal] = useState(false)

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
          play_time_seconds: gameData.play_time_seconds,
          total_money_earned: gameData.total_money_earned,
          buildings: buildings || [],
          last_sync: new Date()
        })
      }
    } catch (err) {
      console.error('Load error:', err)
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }

  // Sync periodico (reddito da server ogni 30 sec)
  useEffect(() => {
    if (!gameState) return

    const interval = setInterval(async () => {
      try {
        // 1. Calcola reddito dal server (ANTI-CHEAT!)
        const { income, error } = await calculatePlayerIncomeServer(gameState.user_id)

        if (!error && income > 0) {
          const newMoney = gameState.money + income
          const newPlayTime = (gameState.play_time_seconds || 0) + 30
          // Il reddito guadagnato si somma al totale di sempre
          const newTotalEarned = (gameState.total_money_earned || 0) + income

          // 2. Calcola level sul totale guadagnato (non scende mai)
          const totalIncome = gameState.buildings.reduce((sum, b) => 
            sum + calculateBuildingIncome(b.type, b.level), 0
          )
          const newLevel = calculateLevel(newTotalEarned, totalIncome)

          // 3. Salva nel DB
          await supabase
            .from('game_state')
            .update({
              money: newMoney,
              level: newLevel,
              total_money_earned: newTotalEarned,
              play_time_seconds: newPlayTime,
              last_sync: new Date()
            })
            .eq('user_id', gameState.user_id)

          // 4. Check prestige milestone
          if (newLevel > gameState.level && newLevel % 10 === 0) {
            setShowPrestigeModal(true)
          }

          // 5. Update UI
          setGameState(prev => prev ? {
            ...prev,
            money: newMoney,
            level: newLevel,
            total_money_earned: newTotalEarned,
            play_time_seconds: newPlayTime,
            last_sync: new Date()
          } : null)
        }
      } catch (err) {
        console.error('Sync error:', err)
      }
    }, 30000) // 30 secondi

    return () => clearInterval(interval)
  }, [gameState])

  // Build building (con anti-cheat server)
  async function buildBuilding(buildingType: string) {
    if (!gameState) return

    try {
      const timestamp = Date.now()
      const cost = calculateBuildingCost(buildingType, 1)

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

      // 5. SALVA GAME STATE (costruire è una spesa: total_money_earned NON cambia)
      await supabase
        .from('game_state')
        .update({
          money: newMoney
        })
        .eq('user_id', gameState.user_id)

      // 6. UPDATE UI
      setGameState({
        ...gameState,
        money: newMoney,
        buildings: [...gameState.buildings, newBuilding]
      })
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
      const nextLevel = building.level + 1
      const cost = calculateBuildingCost(building.type, nextLevel)

      // Controllo fondi (verrà validato anche lato server)
      if (gameState.money < cost) {
        alert('Fondi insufficienti per il potenziamento')
        return
      }

      // Anti-cheat: verifica lato server
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
        .update({ level: nextLevel })
        .eq('id', building.id)

      if (updError) {
        alert('Upgrade fallito: ' + updError.message)
        return
      }

      // 2. Scala il denaro (total_money_earned NON cambia: è una spesa)
      await supabase
        .from('game_state')
        .update({ money: newMoney })
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
          b.id === building.id ? { ...b, level: nextLevel } : b
        )
      })
    } catch (err) {
      console.error('Upgrade error:', err)
      alert('Upgrade fallito: ' + (err instanceof Error ? err.message : 'Unknown error'))
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
        const bonus = calculatePrestigeBonus(newPrestige)
        const newSlots = 12 + bonus.slotBonus

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
            play_time_seconds: 0
          })
          .eq('user_id', gameState.user_id)

        setGameState({
          user_id: gameState.user_id,
          money: 100000,
          level: 1,
          prestige: newPrestige,
          slots: newSlots,
          play_time_seconds: 0,
          total_money_earned: gameState.total_money_earned,
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
  )
  const availableBuildings = getAvailableBuildingsAtLevel(gameState.level)

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
          <button onClick={handleLogout} className="btn-logout">Logout</button>
        </div>
      </header>

      {/* Main Game */}
      <main className="game-main">
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
                  disabled={gameState.money < calculateBuildingCost(buildingType, 1)}
                  className="btn-build"
                >
                  Costruisci
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Properties List */}
        <div className="properties-section">
          <h2>🏘️ Proprietà ({gameState.buildings.length}/{gameState.slots})</h2>
          <div className="properties-list">
            {gameState.buildings.length === 0 ? (
              <p className="empty">Nessuna proprietà ancora</p>
            ) : (
              gameState.buildings.map(building => (
                <div key={building.id} className="property-item">
                  <span>{building.type} Lv{building.level}</span>
                  <span>{formatIncome(calculateBuildingIncome(building.type, building.level))}</span>
                  <button
                    className="upgrade-button"
                    onClick={() => upgradeBuilding(building)}
                    disabled={gameState.money < calculateBuildingCost(building.type, building.level + 1)}
                  >
                    ⬆ Upgrade ({formatMoney(calculateBuildingCost(building.type, building.level + 1))})
                  </button>
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
