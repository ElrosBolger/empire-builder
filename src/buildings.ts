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

export function calculateBuildingCost(type: string, level: number): number {
  const building = BUILDINGS[type]
  if (!building) return 0
  return Math.floor(building.baseCost * Math.pow(building.costMultiplier, level - 1))
}

export function calculateBuildingIncome(type: string, level: number): number {
  const building = BUILDINGS[type]
  if (!building) return 0
  return Math.floor(building.baseIncome * Math.pow(building.incomeMultiplier, level - 1))
}

export function calculateLevel(totalEarned: number, totalIncome: number): number {
  const baseLevel = Math.floor(Math.log2(Math.max(1, totalEarned / 1000))) + 1
  const incomeBonus = Math.floor(Math.log10(Math.max(1, totalIncome / 10)))
  return Math.max(1, baseLevel + incomeBonus)
}

export function isBuildingUnlocked(buildingType: string, level: number): boolean {
  const building = BUILDINGS[buildingType]
  if (!building) return false
  return level >= building.unlockLevel
}

export function getAvailableBuildingsAtLevel(level: number): string[] {
  return Object.keys(BUILDINGS).filter(type => isBuildingUnlocked(type, level))
}

export function calculatePrestigeGain(level: number): number {
  if (level % 10 !== 0) return 0
  return Math.floor(level / 10) * 3
}

export function calculatePrestigeBonus(prestige: number) {
  const sqrt = Math.sqrt(prestige)
  return {
    incomeBonus: sqrt * 0.05,
    costBonus: sqrt * 0.015,
    slotBonus: Math.floor(sqrt / Math.sqrt(10))
  }
}

export const BASE_SLOTS = 12

export function calculateTotalSlots(prestige: number, boughtSlots: number): number {
  const bonus = calculatePrestigeBonus(prestige)
  return BASE_SLOTS + bonus.slotBonus + boughtSlots
}

export function calculateSlotCost(boughtSlots: number): number {
  return Math.floor(50000 * Math.pow(2.5, boughtSlots))
}

export function calculateUpgradeBatch(
  type: string,
  fromLevel: number,
  count: number,
  money?: number
): { levels: number; totalCost: number } {
  let totalCost = 0
  let levels = 0
  for (let i = 1; i <= count; i++) {
    const stepCost = calculateBuildingCost(type, fromLevel + i)
    if (money !== undefined && totalCost + stepCost > money) break
    totalCost += stepCost
    levels++
  }
  return { levels, totalCost }
}
