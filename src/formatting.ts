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

export function abbreviateNumber(num: number): string {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1_000, symbol: 'K' },
    { value: 1_000_000, symbol: 'M' },
    { value: 1_000_000_000, symbol: 'B' },
    { value: 1_000_000_000_000, symbol: 'T' }
  ]

  const item = [...lookup].reverse().find(item => num >= item.value)
  return item ? (num / item.value).toFixed(2) + item.symbol : '0'
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('it-IT', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export function getTimeOfDay(): string {
  const hour = new Date().getHours()
  if (hour < 12) return '☀️ Buongiorno'
  if (hour < 18) return '🌤️ Buonpomeriggio'
  return '🌙 Buonasera'
}

export function getProgressBar(current: number, max: number, length: number = 20): string {
  const percentage = Math.min(100, Math.max(0, (current / max) * 100))
  const filled = Math.floor((length * percentage) / 100)
  const empty = length - filled
  return '█'.repeat(filled) + '░'.repeat(empty)
}

export function getTierColor(tier: 1 | 2 | 3): string {
  switch (tier) {
    case 1:
      return '#10b981' // Green
    case 2:
      return '#3b82f6' // Blue
    case 3:
      return '#f59e0b' // Orange
    default:
      return '#6b7280' // Gray
  }
}

export function getTierName(tier: 1 | 2 | 3): string {
  switch (tier) {
    case 1:
      return 'Residenziale'
    case 2:
      return 'Commerciale'
    case 3:
      return 'Industriale'
    default:
      return 'Sconosciuto'
  }
}
