import assert from 'node:assert/strict'
import { createServer } from 'vite'

const vite = await createServer({ server: { middlewareMode: true, hmr: false }, appType: 'custom' })

try {
  const { genderCards } = await vite.ssrLoadModule('/src/data/genderCards.ts')
  const { getGenderResult, genderResultLevels } = await vite.ssrLoadModule('/src/data/genderResults.ts')
  const { createClassificationReducer, initialGameState } = await vite.ssrLoadModule('/src/games/classificationEngine.ts')
  const reduce = createClassificationReducer(genderCards)

  assert.ok(genderCards.length >= 8 && genderCards.length <= 12)
  assert.equal(new Set(genderCards.map(card => card.id)).size, genderCards.length)
  assert.ok(genderCards.every(card => card.explanation && card.context && ['stereotype', 'equality'].includes(card.category)))
  assert.ok(genderCards.some(card => card.category === 'stereotype'))
  assert.ok(genderCards.some(card => card.category === 'equality'))

  const expectedLevels = [
    'Una oportunidad para aprender', 'Una oportunidad para aprender', 'Una oportunidad para aprender', 'Una oportunidad para aprender',
    'Sigue explorando', 'Sigue explorando', 'Buen avance', 'Buen avance', 'Muy bien', 'Muy bien', 'Excelente',
  ]
  assert.equal(genderResultLevels.length, 5)
  for (const [correct, name] of expectedLevels.entries()) {
    const result = getGenderResult(correct, 10)
    assert.equal(result.name, name, `Nivel incorrecto para ${correct}/10`)
    assert.equal(result.percent, correct * 10)
    assert.ok(result.title && result.message, `Falta mensaje para ${correct}/10`)
  }
  for (const [correct, total, name] of [[3, 8, 'Una oportunidad para aprender'], [4, 8, 'Sigue explorando'], [5, 8, 'Buen avance'], [7, 8, 'Muy bien'], [8, 8, 'Excelente'], [2, 3, 'Buen avance']]) {
    assert.equal(getGenderResult(correct, total).name, name, `Nivel incorrecto para ${correct}/${total}`)
  }
  assert.equal(getGenderResult(0, 0).name, 'Una oportunidad para aprender')

  let state = reduce(initialGameState, { type: 'start' })
  assert.equal(state.phase, 'playing')
  assert.equal(reduce(state, { type: 'next' }), state, 'No debe avanzar sin responder')
  assert.equal(reduce(state, { type: 'classify', cardId: 'otra-tarjeta', choice: 'equality' }), state, 'No debe aceptar arrastres de otra tarjeta')

  for (const [index, card] of genderCards.entries()) {
    state = reduce(state, { type: 'classify', cardId: card.id, choice: card.category })
    assert.equal(state.phase, 'feedback')
    assert.equal(state.answers.length, index + 1)
    assert.equal(state.answers[index].correct, true)
    assert.equal(reduce(state, { type: 'classify', cardId: card.id, choice: card.category === 'equality' ? 'stereotype' : 'equality' }), state, 'No debe duplicar respuestas')
    state = reduce(state, { type: 'next' })
  }
  assert.equal(state.phase, 'results')
  assert.equal(state.answers.filter(answer => answer.correct).length, genderCards.length)
  assert.equal(reduce(state, { type: 'next' }), state, 'No debe avanzar tras los resultados')

  state = reduce(state, { type: 'replay' })
  assert.equal(state.phase, 'playing')
  assert.equal(state.index, 0)
  assert.equal(state.answers.length, 0)

  for (const card of genderCards) {
    state = reduce(state, { type: 'classify', cardId: card.id, choice: card.category === 'equality' ? 'stereotype' : 'equality' })
    assert.equal(state.answers.at(-1).correct, false)
    state = reduce(state, { type: 'next' })
  }
  assert.equal(state.phase, 'results')
  assert.equal(state.answers.filter(answer => answer.correct).length, 0)
  assert.equal(getGenderResult(state.answers.filter(answer => answer.correct).length, state.answers.length).name, expectedLevels[0])

  state = reduce(state, { type: 'replay' })
  for (const [index, card] of genderCards.entries()) {
    state = reduce(state, { type: 'classify', cardId: card.id, choice: index < 7 ? card.category : card.category === 'equality' ? 'stereotype' : 'equality' })
    state = reduce(state, { type: 'next' })
  }
  assert.equal(state.answers.filter(answer => answer.correct).length, 7)
  assert.equal(getGenderResult(7, state.answers.length).name, 'Buen avance')
  console.log(`✓ ${genderCards.length} tarjetas: partida completa, puntuación, bloqueos, reinicio y cinco niveles correctos`)
} finally {
  await vite.close()
}
