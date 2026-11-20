import type { CulturalPuzzle } from '../data/culturalPuzzles'

export const puzzleSize = 3
export const pieceCount = puzzleSize * puzzleSize
export const piecePositions = ['superior izquierda', 'superior centro', 'superior derecha', 'centro izquierda', 'centro', 'centro derecha', 'inferior izquierda', 'inferior centro', 'inferior derecha']

export type PuzzleState = {
  phase: 'intro' | 'playing' | 'levelDone' | 'results'
  levelIndex: number
  tray: number[]
  board: (number | null)[]
  selectedPiece: number | null
  completed: string[]
  feedback: 'select' | 'miss' | 'placed' | null
}

export type PuzzleAction =
  | { type: 'start' | 'restartLevel' | 'nextLevel'; order: number[] }
  | { type: 'replay' }
  | { type: 'selectPiece'; piece: number }
  | { type: 'place'; piece: number; position: number }

export const initialPuzzleState: PuzzleState = {
  phase: 'intro', levelIndex: 0, tray: [], board: Array(pieceCount).fill(null), selectedPiece: null, completed: [], feedback: null,
}

const solved = (order: number[]) => order.every((piece, index) => piece === index)
const validOrder = (order: number[]) => order.length === pieceCount && new Set(order).size === pieceCount && order.every(piece => Number.isInteger(piece) && piece >= 0 && piece < pieceCount) && !solved(order)

export function shufflePuzzlePieces(random = Math.random): number[] {
  const pieces = Array.from({ length: pieceCount }, (_, index) => index)
  for (let index = pieceCount - 1; index > 0; index--) {
    const pick = Math.floor(Math.max(0, Math.min(0.999999999, random())) * (index + 1))
    ;[pieces[index], pieces[pick]] = [pieces[pick], pieces[index]]
  }
  if (solved(pieces)) [pieces[0], pieces[1]] = [pieces[1], pieces[0]]
  return pieces
}

export function createCulturalPuzzleReducer(levels: CulturalPuzzle[]) {
  return (state: PuzzleState, action: PuzzleAction): PuzzleState => {
    if (action.type === 'replay') return state.phase === 'results' ? { ...initialPuzzleState, board: Array(pieceCount).fill(null), completed: [] } : state
    if (action.type === 'start') {
      if (state.phase !== 'intro' || !validOrder(action.order)) return state
      return { ...initialPuzzleState, phase: 'playing', tray: [...action.order], board: Array(pieceCount).fill(null), completed: [] }
    }
    if (action.type === 'restartLevel') {
      if (!['playing', 'levelDone'].includes(state.phase) || !validOrder(action.order)) return state
      return { ...state, phase: 'playing', tray: [...action.order], board: Array(pieceCount).fill(null), selectedPiece: null, feedback: null }
    }
    if (action.type === 'nextLevel') {
      if (state.phase !== 'levelDone') return state
      if (state.levelIndex === levels.length - 1) return { ...state, phase: 'results', selectedPiece: null, feedback: null }
      if (!validOrder(action.order)) return state
      return { ...state, phase: 'playing', levelIndex: state.levelIndex + 1, tray: [...action.order], board: Array(pieceCount).fill(null), selectedPiece: null, feedback: null }
    }
    if (state.phase !== 'playing') return state
    if (action.type === 'selectPiece') {
      if (!state.tray.includes(action.piece)) return state
      return { ...state, selectedPiece: state.selectedPiece === action.piece ? null : action.piece, feedback: null }
    }
    if (action.type === 'place') {
      if (!Number.isInteger(action.position) || action.position < 0 || action.position >= pieceCount || state.board[action.position] !== null) return state
      if (!state.tray.includes(action.piece)) return action.piece === -1 ? { ...state, feedback: 'select' } : state
      if (action.piece !== action.position) return { ...state, selectedPiece: action.piece, feedback: 'miss' }
      const board = [...state.board]
      board[action.position] = action.piece
      const tray = state.tray.filter(piece => piece !== action.piece)
      const finished = tray.length === 0
      return { ...state, board, tray, selectedPiece: null, phase: finished ? 'levelDone' : 'playing',
        completed: finished && !state.completed.includes(levels[state.levelIndex].id) ? [...state.completed, levels[state.levelIndex].id] : state.completed,
        feedback: 'placed' }
    }
    return state
  }
}
