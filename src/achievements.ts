// achievements.ts — Definizione di tutti gli achievement del gioco.
// Ogni achievement dà un piccolo bonus reddito permanente (rewardIncome, es. 0.02 = +2%).
// Le catene crescono di difficoltà: i primi arrivano presto, gli ultimi richiedono ore e prestige.

import type { GameState } from './types'

export type Achievement = {
  key: string
  name: string
  description: string
  icon: string
  rewardIncome: number   // bonus reddito permanente quando sbloccato
  // Funzione che dice se è raggiunto, dati lo stato e alcuni contatori
  isReached: (ctx: AchievementContext) => boolean
}

export type AchievementContext = {
  state: GameState
  totalIncome: number
  lifetimeBuildings: number
  lifetimeUpgrades: number
}

// Helper per creare catene "a soglia" (10/50/200...) in modo compatto
function chain(
  prefix: string, name: string, icon: string,
  thresholds: number[], reward: number[],
  value: (c: AchievementContext) => number,
  unit: string
): Achievement[] {
  return thresholds.map((t, i) => ({
    key: `${prefix}_${t}`,
    name: `${name} ${romanOrNum(i + 1)}`,
    description: `Raggiungi ${formatThreshold(t)} ${unit}`,
    icon,
    rewardIncome: reward[i],
    isReached: (c) => value(c) >= t
  }))
}

function romanOrNum(n: number): string {
  const r = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII']
  return r[n - 1] || `${n}`
}

function formatThreshold(n: number): string {
  if (n >= 1_000_000_000) return `${n / 1_000_000_000}B`
  if (n >= 1_000_000) return `${n / 1_000_000}M`
  if (n >= 1_000) return `${n / 1_000}K`
  return `${n}`
}

export const ACHIEVEMENTS: Achievement[] = [
  // --- Costruttore: edifici costruiti a vita ---
  ...chain('builder', 'Costruttore', '🏗️',
    [10, 50, 200, 1000, 5000],
    [0.01, 0.02, 0.03, 0.05, 0.08],
    (c) => c.lifetimeBuildings, 'edifici costruiti'),

  // --- Magnate: denaro totale guadagnato ---
  ...chain('tycoon', 'Magnate', '💰',
    [100_000, 10_000_000, 1_000_000_000, 100_000_000_000],
    [0.02, 0.03, 0.05, 0.10],
    (c) => c.state.total_money_earned, '€ guadagnati'),

  // --- Flusso: reddito al secondo ---
  ...chain('income', 'Flusso di Cassa', '📈',
    [1_000, 100_000, 10_000_000, 1_000_000_000],
    [0.02, 0.03, 0.05, 0.10],
    (c) => c.totalIncome, '€/s di reddito'),

  // --- Architetto: livello raggiunto ---
  ...chain('level', 'Architetto', '🏆',
    [10, 25, 50, 100],
    [0.02, 0.04, 0.06, 0.12],
    (c) => c.state.level, 'di livello'),

  // --- Leggenda: prestige accumulato (richiede rigiocare) ---
  ...chain('prestige', 'Leggenda', '⭐',
    [3, 25, 100, 500],
    [0.05, 0.08, 0.12, 0.20],
    (c) => c.state.prestige, 'prestige'),

  // --- Ingegnere: upgrade fatti a vita ---
  ...chain('upgrader', 'Ingegnere', '⬆️',
    [25, 150, 750, 3000],
    [0.02, 0.03, 0.05, 0.08],
    (c) => c.lifetimeUpgrades, 'potenziamenti'),
]

// Totale bonus reddito dagli achievement sbloccati
export function achievementIncomeBonus(unlockedKeys: Set<string>): number {
  return ACHIEVEMENTS.reduce((sum, a) => sum + (unlockedKeys.has(a.key) ? a.rewardIncome : 0), 0)
}

// Trova gli achievement appena raggiunti ma non ancora sbloccati
export function findNewlyReached(ctx: AchievementContext, unlockedKeys: Set<string>): Achievement[] {
  return ACHIEVEMENTS.filter(a => !unlockedKeys.has(a.key) && a.isReached(ctx))
}
