import type { Classification, GenderCard } from '../data/genderCards'

export type Answer = { cardId: string; choice: Classification; correct: boolean }

export type GameState = {
  phase: 'intro' | 'playing' | 'feedback' | 'results'
  index: number
  answers: Answer[]
}

export type GameAction =
  | { type: 'start' | 'replay' | 'next' }
  | { type: 'classify'; cardId: string; choice: Classification }

export const initialGameState: GameState = { phase: 'intro', index: 0, answers: [] }

export function createClassificationReducer(cards: GenderCard[]) {
  return (state: GameState, action: GameAction): GameState => {
    switch (action.type) {
      case 'start':
        return state.phase === 'intro' ? { phase: 'playing', index: 0, answers: [] } : state
      case 'replay':
        return state.phase === 'results' ? { phase: 'playing', index: 0, answers: [] } : state
      case 'classify': {
        const card = cards[state.index]
        if (state.phase !== 'playing' || !card || card.id !== action.cardId) return state
        return {
          phase: 'feedback', index: state.index,
          answers: [...state.answers, { cardId: card.id, choice: action.choice, correct: action.choice === card.category }],
        }
      }
      case 'next':
        if (state.phase !== 'feedback') return state
        return state.index === cards.length - 1
          ? { ...state, phase: 'results' }
          : { ...state, phase: 'playing', index: state.index + 1 }
    }
  }
}
