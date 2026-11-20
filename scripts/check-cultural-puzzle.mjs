import assert from 'node:assert/strict'
import { createServer } from 'vite'

const vite = await createServer({ server: { middlewareMode: true, hmr: false }, appType: 'custom' })

try {
  const { culturalPuzzles } = await vite.ssrLoadModule('/src/data/culturalPuzzles.ts')
  const { culturalStops, culturalSources } = await vite.ssrLoadModule('/src/data/culturalStops.ts')
  const { projectImages } = await vite.ssrLoadModule('/src/data/projectImages.ts')
  const { createCulturalPuzzleReducer, initialPuzzleState, pieceCount, shufflePuzzlePieces } = await vite.ssrLoadModule('/src/games/culturalPuzzleEngine.ts')
  const reduce = createCulturalPuzzleReducer(culturalPuzzles)
  assert.equal(pieceCount, 9)
  assert.equal(culturalPuzzles.length, 4)
  assert.deepEqual(culturalPuzzles.map(level => level.stopId), culturalStops.map(stop => stop.id))
  const sourceIds = new Set(culturalSources.map(source => source.id))
  const photoUrls = new Set()
  for (const level of culturalPuzzles) {
    const stop = culturalStops.find(item => item.id === level.stopId)
    assert.ok(stop && level.illustrationContext && level.artDescription)
    assert.ok(level.svg.startsWith('<svg') && level.svg.includes('viewBox="0 0 600 600"') && level.svg.endsWith('</svg>'))
    assert.ok(!level.svg.includes('<image'), 'No incluir fotografías o imágenes externas')
    const photo = projectImages.multiculturalidad.find(image => image.puzzleId === level.id)
    assert.ok(photo && photo === level.photo, `Foto no vinculada al nivel ${level.id}`)
    assert.ok(photo.src && photo.alt && photo.context && photo.type === 'fotografia')
    assert.ok(photo.verification !== 'verified', 'No presentar fotografías sin procedencia como verificadas')
    assert.ok(!photoUrls.has(photo.src), 'No repetir la misma foto en dos niveles')
    photoUrls.add(photo.src)
    assert.ok(stop.sourceIds.every(id => sourceIds.has(id)))
  }

  for (let seed = 0; seed < 200; seed++) {
    let value = seed + 1
    const order = shufflePuzzlePieces(() => { value = (value * 1664525 + 1013904223) % 4294967296; return value / 4294967296 })
    assert.deepEqual([...order].sort((a, b) => a - b), Array.from({ length: pieceCount }, (_, index) => index))
    assert.ok(order.some((piece, index) => piece !== index), 'El tablero no debe iniciar resuelto')
  }
  assert.deepEqual([...shufflePuzzlePieces(() => 0)].sort((a, b) => a - b), Array.from({ length: pieceCount }, (_, index) => index))

  const order = shufflePuzzlePieces(() => .25)
  const solvedOrder = Array.from({ length: pieceCount }, (_, index) => index)
  assert.equal(reduce(initialPuzzleState, { type: 'start', order: solvedOrder }), initialPuzzleState, 'No aceptar piezas ya ordenadas')
  assert.equal(reduce(initialPuzzleState, { type: 'start', order: [0, 1, 2] }), initialPuzzleState, 'No aceptar órdenes incompletas')
  let state = reduce(initialPuzzleState, { type: 'start', order })
  assert.equal(state.phase, 'playing')
  state = reduce(state, { type: 'place', piece: -1, position: 0 })
  assert.equal(state.feedback, 'select')
  assert.equal(state.board[0], null)
  state = reduce(state, { type: 'selectPiece', piece: 0 })
  state = reduce(state, { type: 'place', piece: 0, position: 1 })
  assert.equal(state.feedback, 'miss')
  assert.equal(state.board[1], null)
  assert.equal(state.tray.length, pieceCount)
  state = reduce(state, { type: 'place', piece: 0, position: 0 })
  assert.equal(state.board[0], 0)
  assert.equal(state.tray.length, 8)
  assert.equal(reduce(state, { type: 'place', piece: 0, position: 0 }), state, 'No duplicar piezas colocadas')
  state = reduce(state, { type: 'restartLevel', order: shufflePuzzlePieces(() => .8) })
  assert.equal(state.board.filter(piece => piece !== null).length, 0)
  assert.equal(state.tray.length, 9)

  for (const [levelIndex, level] of culturalPuzzles.entries()) {
    assert.equal(state.levelIndex, levelIndex)
    for (let piece = 0; piece < pieceCount; piece++) {
      state = reduce(state, { type: 'selectPiece', piece })
      state = reduce(state, { type: 'place', piece, position: piece })
      assert.equal(state.board[piece], piece)
      assert.equal(state.tray.length, pieceCount - piece - 1)
    }
    assert.equal(state.phase, 'levelDone')
    assert.equal(state.completed.length, levelIndex + 1)
    assert.ok(state.completed.includes(level.id))
    assert.equal(reduce(state, { type: 'place', piece: 0, position: 1 }), state)
    state = reduce(state, { type: 'nextLevel', order: shufflePuzzlePieces(() => .4) })
  }
  assert.equal(state.phase, 'results')
  assert.equal(state.completed.length, 4)
  assert.equal(reduce(state, { type: 'nextLevel', order }), state, 'No avanzar tras resultados')
  state = reduce(state, { type: 'replay' })
  assert.equal(state.phase, 'intro')
  assert.equal(state.completed.length, 0)
  assert.equal(state.board.filter(piece => piece !== null).length, 0)
  console.log('✓ Cuatro niveles 3×3, 200 mezclas, posiciones, reinicio, progreso y fuentes comprobados')
} finally {
  await vite.close()
}
