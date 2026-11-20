import assert from 'node:assert/strict'
import { createServer } from 'vite'

const vite = await createServer({ server: { middlewareMode: true, hmr: false }, appType: 'custom' })

try {
  const { initiatives, simulationRounds, initialBudget, initialIndicators, indicatorKeys } = await vite.ssrLoadModule('/src/data/opportunitySimulation.ts')
  const { describeStrategy } = await vite.ssrLoadModule('/src/data/opportunityReflections.ts')
  const { createOpportunityReducer, effectsForRound, evaluateSimulation, initialSimulationState } = await vite.ssrLoadModule('/src/games/opportunityEngine.ts')
  const reduce = createOpportunityReducer(initiatives, simulationRounds)

  assert.equal(initialBudget, 100)
  assert.equal(simulationRounds.length, 3)
  assert.equal(initiatives.length, 6)
  assert.equal(new Set(initiatives.map(item => item.id)).size, 6)
  assert.ok(initiatives.every(item => item.cost > 0 && indicatorKeys.every(key => Number.isFinite(item.effects[key]))))
  assert.notDeepEqual(simulationRounds[0].options, simulationRounds[1].options)
  assert.equal(simulationRounds[1].operationalCost, 10)
  assert.equal(effectsForRound(initiatives.find(item => item.id === 'transport'), simulationRounds[1]).safety, 19)
  assert.equal(effectsForRound(initiatives.find(item => item.id === 'leadership'), simulationRounds[2]).participation, 22)

  let state = reduce(initialSimulationState, { type: 'start' })
  assert.equal(state.phase, 'round')
  assert.equal(reduce(state, { type: 'invest', initiativeId: 'transport' }), state, 'No comprar fuera de las opciones de ronda 1')
  state = reduce(state, { type: 'invest', initiativeId: 'scholarships' })
  assert.equal(state.budget, 78)
  assert.equal(state.indicators.education, 43)
  assert.equal(reduce(state, { type: 'invest', initiativeId: 'scholarships' }), state, 'No duplicar iniciativas')
  state = reduce(state, { type: 'invest', initiativeId: 'technology' })
  assert.equal(state.budget, 60)
  assert.equal(state.indicators.education, 51)
  assert.equal(state.indicators.technology, 45)
  assert.equal(reduce(state, { type: 'invest', initiativeId: 'training' }), state, 'Máximo de dos por ronda')
  state = reduce(state, { type: 'remove', initiativeId: 'technology' })
  assert.equal(state.budget, 78)
  assert.equal(state.indicators.technology, initialIndicators.technology)
  state = reduce(state, { type: 'invest', initiativeId: 'technology' })
  state = reduce(state, { type: 'advance' })
  assert.equal(state.roundIndex, 1)
  assert.equal(state.budget, 50)
  assert.equal(state.indicators.economy, 30)
  assert.equal(state.indicators.safety, 19)
  assert.equal(reduce(state, { type: 'remove', initiativeId: 'scholarships' }), state, 'No quitar inversiones de rondas cerradas')
  state = reduce(state, { type: 'invest', initiativeId: 'transport' })
  assert.equal(state.budget, 32)
  assert.equal(state.indicators.safety, 38)
  state = reduce(state, { type: 'advance' })
  assert.equal(state.roundIndex, 2)
  state = reduce(state, { type: 'invest', initiativeId: 'leadership' })
  assert.equal(state.budget, 16)
  assert.equal(state.indicators.participation, 53)
  assert.equal(reduce(state, { type: 'invest', initiativeId: 'training' }), state, 'Gasto superior al presupuesto')
  state = reduce(state, { type: 'advance' })
  assert.equal(state.phase, 'results')
  assert.equal(state.investments.length, 4)
  assert.equal(initialBudget - state.budget, 84)
  const outcome = evaluateSimulation(state.investments, 2, initiatives, simulationRounds)
  assert.equal(outcome.operationalSpent, 10)
  assert.equal(outcome.snapshots.length, 4)
  assert.deepEqual(outcome.indicators, state.indicators)
  assert.ok(describeStrategy(state.indicators, state.investments.map(item => item.initiativeId), initiatives).title)
  assert.equal(reduce(state, { type: 'invest', initiativeId: 'prevention' }), state, 'Resultados inmutables')

  state = reduce(state, { type: 'restart' })
  assert.equal(state.phase, 'intro')
  assert.equal(state.investments.length, 0)
  assert.equal(state.budget, 100)
  state = reduce(state, { type: 'start' })
  for (let i = 0; i < 3; i++) state = reduce(state, { type: 'advance' })
  assert.equal(state.phase, 'results')
  assert.equal(state.budget, 90)
  assert.equal(state.indicators.safety, 19)
  assert.ok(describeStrategy(state.indicators, [], initiatives).limitation)

  let strategies = 0
  function explore(current) {
    if (current.phase === 'results') {
      strategies++
      const calculated = evaluateSimulation(current.investments, 2, initiatives, simulationRounds)
      const projectSpent = current.investments.reduce((sum, item) => sum + initiatives.find(project => project.id === item.initiativeId).cost, 0)
      assert.ok(current.budget >= 0)
      assert.equal(current.budget + projectSpent + calculated.operationalSpent, initialBudget)
      assert.deepEqual(current.indicators, calculated.indicators)
      assert.ok(indicatorKeys.every(key => current.indicators[key] >= 0 && current.indicators[key] <= 100))
      return
    }
    const round = simulationRounds[current.roundIndex]
    const available = round.options.filter(id => !current.investments.some(item => item.initiativeId === id))
    const sets = [[], ...available.map(id => [id]), ...available.flatMap((id, index) => available.slice(index + 1).map(other => [id, other]))]
    for (const ids of sets) {
      let candidate = current
      for (const id of ids) candidate = reduce(candidate, { type: 'invest', initiativeId: id })
      explore(reduce(candidate, { type: 'advance' }))
    }
  }
  explore(reduce(initialSimulationState, { type: 'start' }))
  assert.ok(strategies > 100)
  console.log(`✓ Tres rondas, bonos, reinicio, gastos seguros y ${strategies} estrategias posibles verificadas`)
} finally {
  await vite.close()
}
