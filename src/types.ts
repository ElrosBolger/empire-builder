// types.ts
// Definizioni TypeScript per il gioco

export type Building = {
  id: string
  user_id?: string
  type: string
  level: number
  multiplier: number
  created_at?: string
  updated_at?: string
}

export type GameState = {
  id?: string
  user_id: string
  money: number
  level: number
  prestige: number
  total_money_earned: number
  play_time_seconds: number
  slots: number
  bought_slots?: number
  lifetime_buildings_built?: number
  lifetime_upgrades?: number
  username?: string
  buildings: Building[]
  last_sync: Date
  updated_at?: string
}

export type BuildingType = {
  name: string
  baseCost: number
  baseIncome: number
  costMultiplier: number
  incomeMultiplier: number
  icon: string
  description?: string
  category: string
}

export type BuildingCategory = {
  key: string
  name: string
  icon: string
  unlockPrestige: number
  buildings: string[]
  description: string
  pyramidRow: number // 1 = base (più categorie, meno remunerative), 4 = apice (la migliore, da sola)
}

export type PrestigeBonus = {
  incomeBonus: number
  costBonus: number
  slotBonus: number
}
