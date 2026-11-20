import assert from 'node:assert/strict'
import { createServer } from 'vite'

const vite = await createServer({ server: { middlewareMode: true, hmr: false }, appType: 'custom' })

try {
  const { protectiveChapters, protectiveLearnings } = await vite.ssrLoadModule('/src/data/protectiveDecisions.ts')
  const { createNarrativeReducer, initialNarrativeState } = await vite.ssrLoadModule('/src/games/protectiveDecisionsEngine.ts')
  const reduce = createNarrativeReducer(protectiveChapters)
  const learningIds = new Set(protectiveLearnings.map(item => item.id))

  assert.equal(protectiveChapters.length, 3)
  assert.equal(new Set(protectiveChapters.map(chapter => chapter.id)).size, 3)
  for (const chapter of protectiveChapters) {
    assert.ok(chapter.scenes[chapter.start], `Falta el inicio de ${chapter.id}`)
    const reachable = new Set()
    const routes = []
    function explore(id, path) {
      assert.ok(chapter.scenes[id], `Escena inexistente: ${id}`)
      assert.ok(!path.includes(id), `Ciclo sin cierre en ${id}`)
      const scene = chapter.scenes[id]
      reachable.add(id)
      assert.equal(scene.id, id)
      assert.ok(scene.title && scene.dialogue && scene.setting)
      assert.ok(scene.learningIds.every(learning => learningIds.has(learning)), `Aprendizaje desconocido en ${id}`)
      if (scene.kind === 'ending') {
        assert.ok(scene.response && scene.reflection, `Cierre incompleto en ${id}`)
        routes.push([...path, id])
        return
      }
      assert.ok(scene.options.length >= 2 && scene.options.length <= 3, `Opciones fuera de rango en ${id}`)
      assert.equal(new Set(scene.options.map(option => option.id)).size, scene.options.length)
      for (const option of scene.options) {
        assert.ok(option.text && chapter.scenes[option.next], `Ruta interrumpida: ${id}/${option.id}`)
        explore(option.next, [...path, id])
      }
    }
    explore(chapter.start, [])
    assert.equal(reachable.size, Object.keys(chapter.scenes).length, `Escenas inalcanzables en ${chapter.id}`)
    assert.equal(routes.length, 6, `Se esperan seis rutas en ${chapter.id}`)
    assert.equal(new Set(chapter.scenes[chapter.start].options.map(option => option.next)).size, 3, `La primera decisión no ramifica en ${chapter.id}`)
    assert.ok(new Set(routes.map(route => route.at(-1))).size >= 3, `Faltan cierres distintos en ${chapter.id}`)
    console.log(`✓ ${chapter.title}: ${routes.length} rutas, ${reachable.size} escenas alcanzables`)
  }

  let state = reduce(initialNarrativeState, { type: 'start' })
  assert.equal(state.screen, 'menu')
  assert.equal(reduce(state, { type: 'summary' }), state, 'No mostrar resultados antes de explorar capítulos')
  assert.equal(reduce(state, { type: 'openChapter', chapterId: 'inexistente' }), state)
  for (const chapter of protectiveChapters) {
    state = reduce(state, { type: 'openChapter', chapterId: chapter.id })
    assert.equal(state.screen, 'scene')
    const start = chapter.scenes[chapter.start]
    assert.equal(reduce(state, { type: 'choose', sceneId: 'otra-escena', optionId: start.options[0].id }), state)
    state = reduce(state, { type: 'choose', sceneId: start.id, optionId: start.options[0].id })
    assert.equal(state.path.length, 2)
    assert.equal(state.decisions.length, 1)
    const branch = chapter.scenes[state.path.at(-1)]
    assert.equal(reduce(state, { type: 'choose', sceneId: start.id, optionId: start.options[1].id }), state, 'No duplicar ni aceptar una decisión anterior')
    state = reduce(state, { type: 'choose', sceneId: branch.id, optionId: branch.options[0].id })
    assert.equal(chapter.scenes[state.path.at(-1)].kind, 'ending')
    assert.ok(state.completed.includes(chapter.id))
    assert.equal(state.decisions.length, 2)
    if (chapter !== protectiveChapters.at(-1)) state = reduce(state, { type: 'menu' })
  }
  assert.equal(state.completed.length, 3)
  assert.ok(state.discoveries.length > 0)
  state = reduce(state, { type: 'summary' })
  assert.equal(state.screen, 'results')
  state = reduce(state, { type: 'menu' })
  state = reduce(state, { type: 'openChapter', chapterId: protectiveChapters[0].id })
  const first = protectiveChapters[0].scenes[protectiveChapters[0].start]
  state = reduce(state, { type: 'choose', sceneId: first.id, optionId: first.options[1].id })
  assert.equal(state.path.at(-1), first.options[1].next, 'Otra elección debe abrir otra escena')
  state = reduce(state, { type: 'back' })
  assert.equal(state.path.length, 1)
  assert.equal(state.decisions.length, 0)
  state = reduce(state, { type: 'exit' })
  assert.equal(state.screen, 'intro')
  assert.equal(state.completed.length, 0)
  assert.equal(state.discoveries.length, 0)
  console.log('✓ Menú, decisiones, retorno, capítulos independientes, resumen y salida comprobados')
} finally {
  await vite.close()
}
