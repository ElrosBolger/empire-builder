// buildings.ts
// Configurazione edifici e calcoli

import type { BuildingType } from './types'

export const BUILDINGS: Record<string, BuildingType> = {
  house: {
    name: 'Casa Piccola',
    baseCost: 100,
    baseIncome: 10,
    costMultiplier: 1.15,
    incomeMultiplier: 1.2,
    unlockLevel: 1,
    icon: '🏠',
    tier: 1
  },
  apartment: {
    name: 'Appartamento',
    baseCost: 1000,
    baseIncome: 100,
    costMultiplier: 1.15,
    incomeMultiplier: 1.2,
    unlockLevel: 1,
    icon: '🏢',
    tier: 1
  },
  shop: {
    name: 'Negozio',
    baseCost: 15000,
    baseIncome: 500,
    costMultiplier: 1.18,
    incomeMultiplier: 1.25,
    unlockLevel: 8,
    icon: '🏪',
    tier: 2
  },
  mall: {
    name: 'Centro Commerciale',
    baseCost: 250000,
    baseIncome: 5000,
    costMultiplier: 1.2,
    incomeMultiplier: 1.3,
    unlockLevel: 25,
    icon: '🛍️',
    tier: 2
  },
  factory: {
    name: 'Fabbrica',
    baseCost: 500000,
    baseIncome: 15000,
    costMultiplier: 1.22,
    incomeMultiplier: 1.35,
    unlockLevel: 40,
    icon: '🏭',
    tier: 3
  },
  bank: {
    name: 'Banca',
    baseCost: 2000000,
    baseIncome: 100000,
    costMultiplier: 1.25,
    incomeMultiplier: 1.4,
    unlockLevel: 60,
    icon: '🏦',
    tier: 3
  }
}

// Calcola costo di un edificio (anti-cheat: verificare anche server-side!)
export function calculateBuildingCost(type: string, level: number): number {
  const building = BUILDINGS[type]
  if (!building) return 0

  return Math.floor(
    building.baseCost * Math.pow(building.costMultiplier, level - 1)
  )
}

// Calcola reddito base di un edificio (senza moltiplicatori)
export function calculateBuildingIncome(type: string, level: number): number {
  const building = BUILDINGS[type]
  if (!building) return 0

  return Math.floor(
    building.baseIncome * Math.pow(building.incomeMultiplier, level - 1)
  )
}

// Calcola costo moltiplicatore per edificio
export function calculateMultiplierCost(currentMultiplier: number): number {
  return Math.floor(1000 * Math.pow(1.5, currentMultiplier / 5))
}

// Calcola livello (lato server, non fidarsi del client!)
export function calculateLevel(money: number, totalIncome: number): number {
  const baseLevel = Math.floor(Math.log2(Math.max(1, money / 1000))) + 1
  const incomeBonus = Math.floor(Math.log10(Math.max(1, totalIncome / 10)))
  return Math.max(1, baseLevel + incomeBonus)
}

// Verifica se edificio è sbloccato
export function isBuildingUnlocked(buildingType: string, level: number): boolean {
  const building = BUILDINGS[buildingType]
  if (!building) return false
  return level >= building.unlockLevel
}

// Prendi tutti gli edifici disponibili a questo livello
export function getAvailableBuildingsAtLevel(level: number): string[] {
  return Object.keys(BUILDINGS).filter(type =>
    isBuildingUnlocked(type, level)
  )
}

// Calcola income totale da lista edifici
export function calculateTotalIncome(buildings: Array<{ type: string; level: number; multiplier: number }>): number {
  return buildings.reduce((total, building) => {
    const baseIncome = calculateBuildingIncome(building.type, building.level)
    const withMultiplier = baseIncome * (1 + building.multiplier / 100)
    return total + withMultiplier
  }, 0)
}

// Calcola milestone prestige (40% ridotto vs vecchio)
export function calculatePrestigeGain(level: number): number {
  if (level % 10 !== 0) return 0
  return Math.floor(level / 10) * 3 // Ridotto: era 5
}

// Calcola bonus prestige (66% ridotto!)
export function calculatePrestigeBonus(prestige: number) {
  const sqrt = Math.sqrt(prestige)
  return {
    incomeBonus: sqrt * 0.05,      // 0.05% per sqrt(prestige) - MOLTO SOFT
    costBonus: sqrt * 0.015,       // 0.015% per sqrt(prestige)
    slotBonus: Math.floor(sqrt / Math.sqrt(10)) // +1 ogni sqrt(100)
  }
}
