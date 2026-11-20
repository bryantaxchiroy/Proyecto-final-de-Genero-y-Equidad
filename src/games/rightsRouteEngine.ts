import { bridgeLinks, justiceSteps, peaceTokens, plazaActors, plazaSpaces, rightsChallenges, voiceLinks, voiceNodes, type ChallengeId } from '../data/rightsChallenges'

export type RouteFeedback = 'select' | 'try' | 'linked' | 'already' | null
export type RightsRouteState = {
  phase: 'intro' | 'playing' | 'reflection' | 'results'
  stageIndex: number
  completed: ChallengeId[]
  tokens: ChallengeId[]
  bridgeFrom: string | null
  bridgeConnected: string[]
  voiceFrom: string | null
  voiceConnected: string[]
  justiceOrder: string[]
  justicePlaced: string[]
  plazaActor: string | null
  plazaConnected: string[]
  activatedTokens: string[]
  feedback: RouteFeedback
}

export type RightsRouteAction =
  | { type: 'start' | 'restart' | 'completePeace' }
  | { type: 'continue'; justiceOrder?: string[] }
  | { type: 'chooseBridge'; from: string }
  | { type: 'connectBridge'; to: string }
  | { type: 'chooseVoice'; nodeId: string }
  | { type: 'chooseJustice'; stepId: string }
  | { type: 'chooseActor'; actorId: string }
  | { type: 'connectPlaza'; spaceId: string }
  | { type: 'activateToken'; tokenId: string }

export const initialRightsRouteState: RightsRouteState = {
  phase: 'intro', stageIndex: 0, completed: [], tokens: [], bridgeFrom: null, bridgeConnected: [],
  voiceFrom: null, voiceConnected: [], justiceOrder: [], justicePlaced: [], plazaActor: null,
  plazaConnected: [], activatedTokens: [], feedback: null,
}

export const voiceEdgeKey = (a: string, b: string) => [a, b].sort().join('|')

export function shuffleJusticeSteps(random = Math.random): string[] {
  const order: string[] = justiceSteps.map(step => step.id)
  for (let index = order.length - 1; index > 0; index--) {
    const pick = Math.floor(Math.max(0, Math.min(.999999999, random())) * (index + 1))
    ;[order[index], order[pick]] = [order[pick], order[index]]
  }
  if (order.every((id, index) => id === justiceSteps[index].id)) [order[0], order[1]] = [order[1], order[0]]
  return order
}

const validJusticeOrder = (order: string[] | undefined) => Boolean(order && order.length === justiceSteps.length && new Set(order).size === justiceSteps.length && order.every(id => justiceSteps.some(step => step.id === id)) && order.some((id, index) => id !== justiceSteps[index].id))

function finish(state: RightsRouteState): RightsRouteState {
  const id = rightsChallenges[state.stageIndex].id
  return {
    ...state, phase: 'reflection', completed: state.completed.includes(id) ? state.completed : [...state.completed, id],
    tokens: id !== 'paz' && !state.tokens.includes(id) ? [...state.tokens, id] : state.tokens,
    feedback: null,
  }
}

export function rightsRouteReducer(state: RightsRouteState, action: RightsRouteAction): RightsRouteState {
  if (action.type === 'restart') return { ...initialRightsRouteState, completed: [], tokens: [], bridgeConnected: [], voiceConnected: [], justiceOrder: [], justicePlaced: [], plazaConnected: [], activatedTokens: [] }
  if (action.type === 'start') return state.phase === 'intro' ? { ...state, phase: 'playing' } : state
  if (action.type === 'continue') {
    if (state.phase !== 'reflection') return state
    if (state.stageIndex === rightsChallenges.length - 1) return { ...state, phase: 'results' }
    const nextIndex = state.stageIndex + 1
    if (rightsChallenges[nextIndex].id === 'justicia' && !validJusticeOrder(action.justiceOrder)) return state
    return { ...state, phase: 'playing', stageIndex: nextIndex, feedback: null, bridgeFrom: null, voiceFrom: null, plazaActor: null, justiceOrder: rightsChallenges[nextIndex].id === 'justicia' ? [...action.justiceOrder!] : state.justiceOrder }
  }
  if (state.phase !== 'playing') return state
  const stage = rightsChallenges[state.stageIndex].id

  if (action.type === 'chooseBridge' && stage === 'dignidad') {
    if (!bridgeLinks.some(link => link.from === action.from) || state.bridgeConnected.includes(action.from)) return state
    return { ...state, bridgeFrom: state.bridgeFrom === action.from ? null : action.from, feedback: null }
  }
  if (action.type === 'connectBridge' && stage === 'dignidad') {
    if (!state.bridgeFrom) return { ...state, feedback: 'select' }
    const link = bridgeLinks.find(item => item.from === state.bridgeFrom)
    if (link?.to !== action.to) return { ...state, feedback: 'try' }
    const bridgeConnected = [...state.bridgeConnected, state.bridgeFrom]
    const next = { ...state, bridgeConnected, bridgeFrom: null, feedback: 'linked' as RouteFeedback }
    return bridgeConnected.length === bridgeLinks.length ? finish(next) : next
  }
  if (action.type === 'chooseVoice' && stage === 'identidad') {
    if (!voiceNodes.some(node => node.id === action.nodeId)) return state
    if (!state.voiceFrom || state.voiceFrom === action.nodeId) return { ...state, voiceFrom: state.voiceFrom === action.nodeId ? null : action.nodeId, feedback: null }
    const key = voiceEdgeKey(state.voiceFrom, action.nodeId)
    if (state.voiceConnected.includes(key)) return { ...state, voiceFrom: null, feedback: 'already' }
    if (!voiceLinks.some(link => voiceEdgeKey(link.a, link.b) === key)) return { ...state, feedback: 'try' }
    const voiceConnected = [...state.voiceConnected, key]
    const next = { ...state, voiceConnected, voiceFrom: null, feedback: 'linked' as RouteFeedback }
    return voiceConnected.length === voiceLinks.length ? finish(next) : next
  }
  if (action.type === 'chooseJustice' && stage === 'justicia') {
    if (!justiceSteps.some(step => step.id === action.stepId) || state.justicePlaced.includes(action.stepId)) return state
    if (justiceSteps[state.justicePlaced.length].id !== action.stepId) return { ...state, feedback: 'try' }
    const justicePlaced = [...state.justicePlaced, action.stepId]
    const next = { ...state, justicePlaced, feedback: 'linked' as RouteFeedback }
    return justicePlaced.length === justiceSteps.length ? finish(next) : next
  }
  if (action.type === 'chooseActor' && stage === 'participacion') {
    if (!plazaActors.some(actor => actor.id === action.actorId)) return state
    return { ...state, plazaActor: state.plazaActor === action.actorId ? null : action.actorId, feedback: null }
  }
  if (action.type === 'connectPlaza' && stage === 'participacion') {
    if (!state.plazaActor) return { ...state, feedback: 'select' }
    if (!plazaSpaces.some(space => space.id === action.spaceId)) return state
    const key = `${state.plazaActor}|${action.spaceId}`
    if (state.plazaConnected.includes(key)) return { ...state, feedback: 'already' }
    const plazaConnected = [...state.plazaConnected, key]
    const next = { ...state, plazaConnected, feedback: 'linked' as RouteFeedback }
    return plazaConnected.length === plazaActors.length * plazaSpaces.length ? finish(next) : next
  }
  if (action.type === 'activateToken' && stage === 'paz') {
    if (!state.tokens.includes(action.tokenId as ChallengeId) || !peaceTokens.some(token => token.id === action.tokenId) || state.activatedTokens.includes(action.tokenId)) return state
    return { ...state, activatedTokens: [...state.activatedTokens, action.tokenId], feedback: 'linked' }
  }
  if (action.type === 'completePeace' && stage === 'paz') {
    return state.activatedTokens.length === peaceTokens.length ? finish(state) : { ...state, feedback: 'select' }
  }
  return state
}
