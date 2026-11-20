import type { IndicatorValues, Initiative, InitiativeId, SimulationRound } from '../data/opportunitySimulation'
import { indicatorKeys, initialBudget, initialIndicators } from '../data/opportunitySimulation'

export type Investment = { initiativeId: InitiativeId; roundId: string }
export type SimulationState = {
  phase: 'intro' | 'round' | 'results'
  roundIndex: number
  investments: Investment[]
  budget: number
  indicators: IndicatorValues
}
export type SimulationAction =
  | { type: 'start' | 'advance' | 'restart' }
  | { type: 'invest' | 'remove'; initiativeId: InitiativeId }

export const initialSimulationState: SimulationState = {
  phase: 'intro', roundIndex: 0, investments: [], budget: initialBudget, indicators: { ...initialIndicators },
}

const clamp = (value: number) => Math.max(0, Math.min(100, value))

export function effectsForRound(initiative: Initiative, round: SimulationRound): IndicatorValues {
  return Object.fromEntries(indicatorKeys.map(key => [key, initiative.effects[key] + round.sharedBonus[key] + (round.projectBonus[initiative.id]?.[key] ?? 0)])) as IndicatorValues
}

export function evaluateSimulation(investments: Investment[], throughRound: number, initiatives: Initiative[], rounds: SimulationRound[]) {
  let budget = initialBudget
  let indicators: IndicatorValues = { ...initialIndicators }
  let operationalSpent = 0
  const snapshots: IndicatorValues[] = [{ ...indicators }]

  for (const round of rounds.slice(0, throughRound + 1)) {
    const cost = Math.min(budget, round.operationalCost)
    budget -= cost
    operationalSpent += cost
    indicators = Object.fromEntries(indicatorKeys.map(key => [key, clamp(indicators[key] + round.scenarioEffect[key])])) as IndicatorValues
    for (const investment of investments.filter(item => item.roundId === round.id)) {
      const initiative = initiatives.find(item => item.id === investment.initiativeId)
      if (!initiative || initiative.cost > budget) continue
      budget -= initiative.cost
      const effects = effectsForRound(initiative, round)
      indicators = Object.fromEntries(indicatorKeys.map(key => [key, clamp(indicators[key] + effects[key])])) as IndicatorValues
    }
    snapshots.push({ ...indicators })
  }
  return { budget, indicators, operationalSpent, snapshots }
}

export function createOpportunityReducer(initiatives: Initiative[], rounds: SimulationRound[]) {
  return (state: SimulationState, action: SimulationAction): SimulationState => {
    if (action.type === 'restart') return { ...initialSimulationState, indicators: { ...initialIndicators }, investments: [] }
    if (action.type === 'start') return state.phase === 'intro' ? { ...state, phase: 'round' } : state
    if (state.phase !== 'round') return state
    const round = rounds[state.roundIndex]
    if (!round) return state

    if (action.type === 'invest') {
      const initiative = initiatives.find(item => item.id === action.initiativeId)
      const count = state.investments.filter(item => item.roundId === round.id).length
      if (!initiative || !round.options.includes(initiative.id) || state.investments.some(item => item.initiativeId === initiative.id) || count >= round.maxChoices || initiative.cost > state.budget) return state
      const investments = [...state.investments, { initiativeId: initiative.id, roundId: round.id }]
      const result = evaluateSimulation(investments, state.roundIndex, initiatives, rounds)
      return { ...state, investments, budget: result.budget, indicators: result.indicators }
    }

    if (action.type === 'remove') {
      if (!state.investments.some(item => item.roundId === round.id && item.initiativeId === action.initiativeId)) return state
      const investments = state.investments.filter(item => !(item.roundId === round.id && item.initiativeId === action.initiativeId))
      const result = evaluateSimulation(investments, state.roundIndex, initiatives, rounds)
      return { ...state, investments, budget: result.budget, indicators: result.indicators }
    }

    if (action.type === 'advance') {
      if (state.roundIndex === rounds.length - 1) return { ...state, phase: 'results' }
      const nextIndex = state.roundIndex + 1
      if (rounds[nextIndex].operationalCost > state.budget) return state
      const result = evaluateSimulation(state.investments, nextIndex, initiatives, rounds)
      return { ...state, roundIndex: nextIndex, budget: result.budget, indicators: result.indicators }
    }
    return state
  }
}
