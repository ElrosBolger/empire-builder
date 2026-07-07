// formatting.ts
// Utilità di formattazione

// Scala estesa: gestisce anche numeri astronomici senza andare in notazione scientifica
const SCALE = [
  { v: 1e33, s: 'Dc' }, { v: 1e30, s: 'No' }, { v: 1e27, s: 'Oc' },
  { v: 1e24, s: 'Sp' }, { v: 1e21, s: 'Sx' }, { v: 1e18, s: 'Qi' },
  { v: 1e15, s: 'Qa' }, { v: 1e12, s: 'T' }, { v: 1e9, s: 'B' },
  { v: 1e6, s: 'M' }, { v: 1e3, s: 'K' }
]

function scaleValue(n: number): string {
  if (!isFinite(n)) return '∞'
  const abs = Math.abs(n)
  for (const { v, s } of SCALE) {
    if (abs >= v) return `${(n / v).toFixed(2)}${s}`
  }
  return n.toFixed(0)
}

export function formatMoney(amount: number): string {
  return `€${scaleValue(amount)}`
}

export function formatIncome(income: number): string {
  return `${scaleValue(income)}/s`
}

export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  if (hours > 0) {
    return `${hours}h ${minutes}m`
  }
  if (minutes > 0) {
    return `${minutes}m ${secs}s`
  }
  return `${secs}s`
}

export function formatPercent(value: number, decimals: number = 2): string {
  return `${value.toFixed(decimals)}%`
}
