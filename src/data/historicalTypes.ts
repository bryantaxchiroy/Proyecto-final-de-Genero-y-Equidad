export type HistoricalSource = { id: string; author: string; title: string; url: string; note: string }

export type HistoricalMoment = {
  year: string
  label: string
  title: string
  fact: string
  interpretation: string
  question: string
  sourceIds: string[]
  symbol: 'voices' | 'ballot' | 'open' | 'equal' | 'memory' | 'peace' | 'shield' | 'school' | 'work' | 'community' | 'technology'
}
