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
  total_buildings_built?: number
  play_time_seconds: number
  slots: number
  bought_slots?: number
  buildings: Building[]
  last_sync: Date
  updated_at?: string
}

export type User = {
  id: string
  email: string
  username: string
  created_at: string
  last_login: string
}

export type Transaction = {
  id: string
  user_id: string
  action: string
  building_type?: string
  cost_paid?: number
  money_before: number
  money_after: number
  level_before: number
  level_after: number
  timestamp: string
  client_timestamp: string
  verified: boolean
  suspicious: boolean
}

export type PrestigeLog = {
  id: string
  user_id: string
  milestone_level: number
  prestige_gained: number
  prestige_total: number
  timestamp: string
  verified: boolean
}

export type LeaderboardEntry = {
  id: string
  user_id: string
  username: string
  level: number
  money: number
  prestige: number
  buildings_count: number
  last_update: string
}

export type CheatDetection = {
  id: string
  user_id: string
  reason: string
  severity: 'low' | 'medium' | 'high'
  timestamp: string
  resolved: boolean
}

export type BuildingType = {
  name: string
  baseCost: number
  baseIncome: number
  costMultiplier: number
  incomeMultiplier: number
  unlockLevel: number
  icon: string
  tier: 1 | 2 | 3
}

export type PrestigeBonus = {
  incomeMultiplier: number
  costReducer: number
  slotBonus: number
}
