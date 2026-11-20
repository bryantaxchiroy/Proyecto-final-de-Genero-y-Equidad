import assert from 'node:assert/strict'
import { createServer } from 'vite'

const vite = await createServer({ server: { middlewareMode: true, hmr: false }, appType: 'custom' })

try {
  const { peaceDoors, peaceSources } = await vite.ssrLoadModule('/src/data/peaceDoors.ts')
  const { rightsChallenges, bridgeLinks, voiceLinks, justiceSteps, plazaActors, plazaSpaces, peaceTokens } = await vite.ssrLoadModule('/src/data/rightsChallenges.ts')
  const { initialRightsRouteState, rightsRouteReducer: reduce, shuffleJusticeSteps, voiceEdgeKey } = await vite.ssrLoadModule('/src/games/rightsRouteEngine.ts')

  assert.equal(rightsChallenges.length, 5)
  assert.deepEqual(rightsChallenges.map(item => item.id), peaceDoors.map(door => door.id))
  assert.equal(new Set(rightsChallenges.map(item => item.icon)).size, 5)
  const sourceIds = new Set(peaceSources.map(source => source.id))
  assert.ok(peaceDoors.every(door => door.historicalSourceIds.every(id => sourceIds.has(id))))
  assert.ok(rightsChallenges.every(item => item.title && item.instruction && item.learning && item.token))
  for (let seed = 0; seed < 100; seed++) {
    let value = seed + 1
    const order = shuffleJusticeSteps(() => { value = (value * 1664525 + 1013904223) % 4294967296; return value / 4294967296 })
    assert.deepEqual([...order].sort(), justiceSteps.map(step => step.id).sort())
    assert.ok(order.some((id, index) => id !== justiceSteps[index].id))
  }

  let state = reduce(initialRightsRouteState, { type: 'start' })
  assert.equal(state.phase, 'playing')
  assert.equal(reduce(state, { type: 'continue' }), state, 'No saltar zonas')
  assert.equal(reduce(state, { type: 'chooseVoice', nodeId: 'identidad' }), state, 'No usar otro mecanismo antes de desbloquearlo')
  state = reduce(state, { type: 'connectBridge', to: bridgeLinks[0].to })
  assert.equal(state.feedback, 'select')
  state = reduce(state, { type: 'chooseBridge', from: bridgeLinks[0].from })
  state = reduce(state, { type: 'connectBridge', to: bridgeLinks[1].to })
  assert.equal(state.feedback, 'try')
  assert.equal(state.bridgeConnected.length, 0)
  state = reduce(state, { type: 'connectBridge', to: bridgeLinks[0].to })
  assert.equal(state.bridgeConnected.length, 1)
  assert.equal(reduce(state, { type: 'chooseBridge', from: bridgeLinks[0].from }), state, 'No repetir tramo construido')
  for (const link of bridgeLinks.slice(1)) {
    state = reduce(state, { type: 'chooseBridge', from: link.from })
    state = reduce(state, { type: 'connectBridge', to: link.to })
  }
  assert.equal(state.phase, 'reflection')
  assert.deepEqual(state.tokens, ['dignidad'])
  assert.equal(state.completed.length, 1)

  state = reduce(state, { type: 'continue' })
  assert.equal(state.stageIndex, 1)
  state = reduce(state, { type: 'chooseVoice', nodeId: 'identidad' })
  state = reduce(state, { type: 'chooseVoice', nodeId: 'derechos' })
  assert.equal(state.feedback, 'try')
  assert.equal(state.voiceConnected.length, 0)
  state = reduce(state, { type: 'chooseVoice', nodeId: 'idiomas' })
  assert.equal(state.voiceConnected.length, 1)
  for (const link of voiceLinks.slice(1)) {
    state = reduce(state, { type: 'chooseVoice', nodeId: link.a })
    state = reduce(state, { type: 'chooseVoice', nodeId: link.b })
  }
  assert.equal(state.phase, 'reflection')
  assert.deepEqual(state.voiceConnected.sort(), voiceLinks.map(link => voiceEdgeKey(link.a, link.b)).sort())
  assert.equal(state.completed.length, 2)

  assert.equal(reduce(state, { type: 'continue', justiceOrder: justiceSteps.map(step => step.id) }), state, 'La secuencia inicial debe estar mezclada')
  state = reduce(state, { type: 'continue', justiceOrder: shuffleJusticeSteps(() => .4) })
  assert.equal(state.stageIndex, 2)
  state = reduce(state, { type: 'chooseJustice', stepId: justiceSteps[2].id })
  assert.equal(state.feedback, 'try')
  assert.equal(state.justicePlaced.length, 0)
  for (const step of justiceSteps) state = reduce(state, { type: 'chooseJustice', stepId: step.id })
  assert.equal(state.phase, 'reflection')
  assert.equal(state.justicePlaced.length, 4)
  assert.equal(state.completed.length, 3)

  state = reduce(state, { type: 'continue' })
  assert.equal(state.stageIndex, 3)
  state = reduce(state, { type: 'connectPlaza', spaceId: plazaSpaces[0].id })
  assert.equal(state.feedback, 'select')
  for (const actor of plazaActors) {
    state = reduce(state, { type: 'chooseActor', actorId: actor.id })
    for (const space of plazaSpaces) {
      state = reduce(state, { type: 'connectPlaza', spaceId: space.id })
      if (state.phase === 'playing' && actor === plazaActors[0] && space === plazaSpaces[0]) {
        assert.equal(reduce(state, { type: 'connectPlaza', spaceId: space.id }).plazaConnected.length, 1, 'No duplicar conexiones')
      }
    }
  }
  assert.equal(state.phase, 'reflection')
  assert.equal(state.plazaConnected.length, plazaActors.length * plazaSpaces.length)
  assert.equal(state.completed.length, 4)

  state = reduce(state, { type: 'continue' })
  assert.equal(state.stageIndex, 4)
  assert.deepEqual(state.tokens, peaceTokens.map(token => token.id))
  state = reduce(state, { type: 'completePeace' })
  assert.equal(state.feedback, 'select')
  for (const token of peaceTokens) {
    state = reduce(state, { type: 'activateToken', tokenId: token.id })
    assert.equal(reduce(state, { type: 'activateToken', tokenId: token.id }), state, 'No activar dos veces')
  }
  assert.equal(state.phase, 'playing', 'El sendero requiere activación final')
  state = reduce(state, { type: 'completePeace' })
  assert.equal(state.phase, 'reflection')
  assert.equal(state.completed.length, 5)
  state = reduce(state, { type: 'continue' })
  assert.equal(state.phase, 'results')
  assert.deepEqual(state.completed, rightsChallenges.map(challenge => challenge.id))
  assert.equal(reduce(state, { type: 'continue' }), state)
  state = reduce(state, { type: 'restart' })
  assert.equal(state.phase, 'intro')
  assert.equal(state.completed.length, 0)
  assert.equal(state.tokens.length, 0)
  console.log('✓ Cinco desafíos, conexiones, orden, inclusión, desbloqueo, fuentes y reinicio comprobados')
} finally {
  await vite.close()
}
