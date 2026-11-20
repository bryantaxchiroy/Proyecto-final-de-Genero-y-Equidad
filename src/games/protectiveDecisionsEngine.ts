import type { StoryChapter } from '../data/protectiveDecisions'

export type DecisionRecord = { sceneId: string; optionId: string; label: string }
export type NarrativeState = {
  screen: 'intro' | 'menu' | 'scene' | 'results'
  chapterId: string | null
  path: string[]
  decisions: DecisionRecord[]
  completed: string[]
  discoveries: string[]
}

export type NarrativeAction =
  | { type: 'start' | 'menu' | 'back' | 'summary' | 'exit' }
  | { type: 'openChapter'; chapterId: string }
  | { type: 'choose'; sceneId: string; optionId: string }

export const initialNarrativeState: NarrativeState = { screen: 'intro', chapterId: null, path: [], decisions: [], completed: [], discoveries: [] }

export function createNarrativeReducer(chapters: StoryChapter[]) {
  return (state: NarrativeState, action: NarrativeAction): NarrativeState => {
    switch (action.type) {
      case 'start':
        return state.screen === 'intro' ? { ...state, screen: 'menu' } : state
      case 'exit':
        return state.screen === 'intro' ? state : { ...initialNarrativeState }
      case 'menu':
        return state.screen === 'scene' || state.screen === 'results'
          ? { ...state, screen: 'menu', chapterId: null, path: [], decisions: [] }
          : state
      case 'openChapter': {
        const chapter = chapters.find(item => item.id === action.chapterId)
        const current = chapters.find(item => item.id === state.chapterId)
        const scene = current?.scenes[state.path.at(-1) ?? '']
        if (!chapter || !['menu', 'results'].includes(state.screen) && !(state.screen === 'scene' && scene?.kind === 'ending')) return state
        return { ...state, screen: 'scene', chapterId: chapter.id, path: [chapter.start], decisions: [] }
      }
      case 'choose': {
        if (state.screen !== 'scene' || !state.chapterId || state.path.at(-1) !== action.sceneId) return state
        const chapter = chapters.find(item => item.id === state.chapterId)
        const scene = chapter?.scenes[action.sceneId]
        if (!chapter || !scene || scene.kind !== 'decision') return state
        const option = scene.options.find(item => item.id === action.optionId)
        const next = option && chapter.scenes[option.next]
        if (!option || !next) return state
        return {
          ...state,
          path: [...state.path, next.id],
          decisions: [...state.decisions, { sceneId: scene.id, optionId: option.id, label: option.text }],
          completed: next.kind === 'ending' && !state.completed.includes(chapter.id) ? [...state.completed, chapter.id] : state.completed,
          discoveries: [...new Set([...state.discoveries, ...next.learningIds])],
        }
      }
      case 'back':
        return state.screen === 'scene' && state.path.length > 1
          ? { ...state, path: state.path.slice(0, -1), decisions: state.decisions.slice(0, -1) }
          : state
      case 'summary': {
        if (state.completed.length !== chapters.length) return state
        const chapter = chapters.find(item => item.id === state.chapterId)
        const scene = chapter?.scenes[state.path.at(-1) ?? '']
        return state.screen === 'menu' || (state.screen === 'scene' && scene?.kind === 'ending')
          ? { ...state, screen: 'results', chapterId: null, path: [], decisions: [] }
          : state
      }
    }
  }
}
