import assert from 'node:assert/strict'
import { createServer } from 'vite'

const vite = await createServer({ server: { middlewareMode: true, hmr: false }, appType: 'custom' })

try {
  const { stations } = await vite.ssrLoadModule('/src/data/stations.ts')
  const histories = {
    genero: await vite.ssrLoadModule('/src/data/genderHistory.ts'),
    violencia: await vite.ssrLoadModule('/src/data/violenceHistory.ts'),
    desigualdad: await vite.ssrLoadModule('/src/data/inequalityHistory.ts'),
  }
  const { inequalityCategories } = await vite.ssrLoadModule('/src/data/inequalityObservatory.ts')
  const { culturalStops, culturalSources } = await vite.ssrLoadModule('/src/data/culturalStops.ts')
  const { culturalPuzzles } = await vite.ssrLoadModule('/src/data/culturalPuzzles.ts')
  const { guatemalaOutline, guatemalaBounds, projectGuatemalaPoint } = await vite.ssrLoadModule('/src/data/guatemalaMap.ts')
  const { peaceDoors, peaceSources } = await vite.ssrLoadModule('/src/data/peaceDoors.ts')
  const { rightsChallenges } = await vite.ssrLoadModule('/src/data/rightsChallenges.ts')

  assert.equal(stations.length, 5, 'El museo debe ofrecer cinco estaciones')
  assert.equal(new Set(stations.map(station => station.slug)).size, stations.length, 'Las rutas de estación deben ser únicas')
  assert.equal(new Set(stations.map(station => station.theme)).size, stations.length, 'Cada estación debe tener un color propio')

  for (const [index, station] of stations.entries()) {
    assert.equal(station.number, String(index + 1).padStart(2, '0'), `Numeración incorrecta en ${station.slug}`)
    assert.equal(station.next, stations[index + 1]?.slug, `Recorrido interrumpido en ${station.slug}`)
    assert.equal(station.stage, 'open', `Estado desconocido en ${station.slug}`)
    if (station.slug === 'derechos-humanos') {
      assert.equal(station.game, 'La ruta de los derechos')
      assert.deepEqual(rightsChallenges.map(challenge => challenge.id), peaceDoors.map(door => door.id), 'Los desafíos deben seguir las cinco puertas documentadas')
      assert.equal(peaceDoors.length, 5, 'El recorrido debe tener cinco puertas')
      assert.deepEqual(peaceDoors.map(door => door.id), ['dignidad', 'identidad', 'justicia', 'participacion', 'paz'])
      const ids = new Set(peaceSources.map(source => source.id))
      const routes = new Set(stations.map(item => `/estacion/${item.slug}`))
      routes.add('/museo')
      const kinds = new Set(['Declaración internacional', 'Norma nacional', 'Compromiso de paz', 'Decisión judicial'])
      for (const door of peaceDoors) {
        assert.ok(door.title && door.short && door.overview && door.historical && door.connection && door.question, `Puerta incompleta: ${door.id}`)
        assert.ok(door.historicalSourceIds.length && door.historicalSourceIds.every(id => ids.has(id)), `Acontecimiento sin fuente: ${door.id}`)
        assert.ok(door.evidence.length >= 2 && door.evidence.every(item => kinds.has(item.kind) && item.text && item.sourceIds.length && item.sourceIds.every(id => ids.has(id))), `Instrumentos sin clasificar o sin fuente: ${door.id}`)
        assert.ok(routes.has(door.relatedStation.path), `Ruta de regreso desconocida: ${door.id}`)
      }
      assert.ok(peaceSources.every(source => source.url.startsWith('https://')))
      assert.deepEqual([...new Set(peaceDoors.flatMap(door => door.evidence.map(item => item.kind)))].sort(), [...kinds].sort(), 'Deben distinguirse los cuatro tipos de referencia')
      console.log('✓ /estacion/derechos-humanos: cinco puertas, referencias clasificadas y enlaces válidos')
      continue
    }
    if (station.slug === 'multiculturalidad') {
      assert.equal(station.game, 'Fragmentos de identidad')
      assert.deepEqual(culturalPuzzles.map(level => level.stopId), culturalStops.map(stop => stop.id), 'Los niveles deben coincidir con el Mapa Cultural')
      assert.equal(culturalStops.length, 4, 'El mapa debe ofrecer cuatro fichas')
      assert.deepEqual(culturalStops.map(stop => stop.id).sort(), ['garifuna', 'ladino', 'maya', 'xinka'])
      assert.ok(guatemalaOutline.startsWith('M') && guatemalaOutline.endsWith('Z'), 'Falta la geometría del país')
      const culturalIds = new Set(culturalSources.map(source => source.id))
      for (const stop of culturalStops) {
        assert.ok(stop.localContext && stop.history && stop.identityLanguage && stop.expression && stop.rights && stop.reading && stop.question, `Ficha incompleta: ${stop.id}`)
        assert.ok(stop.longitude > guatemalaBounds.west && stop.longitude < guatemalaBounds.east && stop.latitude > guatemalaBounds.south && stop.latitude < guatemalaBounds.north, `Lugar fuera de Guatemala: ${stop.place}`)
        const point = projectGuatemalaPoint(stop.longitude, stop.latitude)
        assert.ok(point.x > 0 && point.x < 600 && point.y > 0 && point.y < 600, `Marcador fuera del SVG: ${stop.place}`)
        assert.ok(stop.coordinateSource.startsWith('https://www.wikidata.org/wiki/'))
        assert.ok(stop.sourceIds.length >= 2 && stop.sourceIds.every(id => culturalIds.has(id)))
        assert.ok(stop.sourceIds.some(id => id.endsWith('-local')), `Falta fuente del lugar: ${stop.place}`)
      }
      assert.ok(culturalSources.every(source => source.url.startsWith('https://')))
      console.log('✓ /estacion/multiculturalidad: cuatro lugares georreferenciados y fichas con fuentes')
      continue
    }
    const history = histories[station.slug]
    assert.ok(history, `Falta contenido histórico de ${station.slug}`)
    const moments = history[`${station.slug === 'desigualdad' ? 'inequality' : station.slug === 'violencia' ? 'violence' : 'gender'}Moments`]
    const sources = history[`${station.slug === 'desigualdad' ? 'inequality' : station.slug === 'violencia' ? 'violence' : 'gender'}Sources`]
    assert.equal(moments.length, 4, `Se esperaban cuatro hitos para ${station.slug}`)
    assert.equal(new Set(moments.map(moment => moment.year)).size, moments.length, `Fechas duplicadas en ${station.slug}`)
    const sourceIds = new Set(sources.map(source => source.id))
    if (station.slug === 'violencia') {
      assert.equal(station.game, 'Decisiones que protegen')
      const contexts = history.violenceArchiveContexts
      assert.deepEqual(Object.keys(contexts).sort(), moments.map(moment => moment.year).sort(), 'Cada expediente debe tener contexto histórico')
      assert.ok(moments.every(moment => contexts[moment.year].trim()), 'Hay expedientes sin contexto')
    }
    if (station.slug === 'desigualdad') {
      assert.equal(station.game, 'Construyendo oportunidades')
      assert.equal(inequalityCategories.length, 4, 'El observatorio debe tener cuatro áreas')
      assert.equal(new Set(inequalityCategories.map(category => category.id)).size, 4, 'Las áreas deben ser distintas')
      const years = new Set(moments.map(moment => moment.year))
      const representedYears = new Set(inequalityCategories.flatMap(category => category.evidenceYears))
      assert.deepEqual([...representedYears].sort(), [...years].sort(), 'El observatorio debe conservar los cuatro hitos originales')
      for (const category of inequalityCategories) {
        assert.ok(category.summary && category.interpretation && category.question, `Falta una lectura temática en ${category.id}`)
        assert.ok(category.evidenceYears.length >= 2 && category.evidenceYears.every(year => years.has(year)), `Hitos sin respaldo en ${category.id}`)
        assert.ok(category.evidenceYears.includes(category.commitment.year) && category.evidenceYears.includes(category.observation.year), `Comparación sin fuentes en ${category.id}`)
        assert.ok(['1995', '1996'].includes(category.commitment.year) && ['2020', '2023'].includes(category.observation.year), `Tipos de evidencia invertidos en ${category.id}`)
        assert.ok(category.commitment.headline && category.commitment.detail && category.observation.headline && category.observation.detail)
        assert.ok(!/\d+(?:[.,]\d+)?\s*%/.test(JSON.stringify(category)), `Porcentaje no documentado en ${category.id}`)
      }
    }
    for (const moment of moments) {
      assert.ok(moment.fact && moment.interpretation && moment.question, `Falta contenido en ${station.slug}/${moment.year}`)
      assert.ok(moment.sourceIds.length && moment.sourceIds.every(id => sourceIds.has(id)), `Fuentes inexistentes en ${station.slug}/${moment.year}`)
    }
    assert.ok(sources.every(source => source.url.startsWith('https://')), `URL insegura en ${station.slug}`)
    console.log(`✓ /estacion/${station.slug}: cuatro hitos y referencias vinculadas`)
  }
} finally {
  await vite.close()
}
