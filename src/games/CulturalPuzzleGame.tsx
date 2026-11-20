import { useEffect, useReducer, useRef, useState } from 'react'
import type { CSSProperties, DragEvent } from 'react'
import { ArrowRight, ArrowUpRight, Check, Eye, GripVertical, Info, Puzzle, RotateCcw } from 'lucide-react'
import { Link } from 'react-router-dom'
import { culturalPuzzles } from '../data/culturalPuzzles'
import { culturalSources, culturalStops } from '../data/culturalStops'
import { createCulturalPuzzleReducer, initialPuzzleState, pieceCount, piecePositions, shufflePuzzlePieces } from './culturalPuzzleEngine'
import './cultural-puzzle.css'

const reducer = createCulturalPuzzleReducer(culturalPuzzles)
const fallbackImages = Object.fromEntries(culturalPuzzles.map(level => [level.id, `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(level.svg)}`]))

function tileStyle(image: string, piece: number, aspect: number): CSSProperties {
  return {
    backgroundImage: `url("${image}")`, backgroundSize: '300% 300%',
    backgroundPosition: `${(piece % 3) * 50}% ${Math.floor(piece / 3) * 50}%`,
    aspectRatio: String(aspect),
  }
}

export function CulturalPuzzleGame() {
  const [state, dispatch] = useReducer(reducer, initialPuzzleState)
  const [hoveredPosition, setHoveredPosition] = useState<number | null>(null)
  const [asset, setAsset] = useState<{ id: string; aspect: number; failed: boolean } | null>(null)
  const [failedImages, setFailedImages] = useState<Set<string>>(() => new Set())
  const hasStarted = useRef(false)
  const introHeading = useRef<HTMLHeadingElement>(null)
  const playHeading = useRef<HTMLHeadingElement>(null)
  const completionHeading = useRef<HTMLHeadingElement>(null)
  const resultsHeading = useRef<HTMLHeadingElement>(null)
  const firstTrayPiece = useRef<HTMLButtonElement>(null)
  const level = culturalPuzzles[state.levelIndex]
  const stop = culturalStops.find(item => item.id === level.stopId)!
  const ready = asset?.id === level.id
  const image = ready && !asset.failed ? level.photo.src : fallbackImages[level.id]
  const aspect = ready ? asset.aspect : 1
  const artAlt = ready && !asset.failed ? level.photo.alt : level.artDescription
  const artContext = ready && !asset.failed ? `${level.photo.context} ${level.photo.description}` : level.illustrationContext
  const placedCount = state.board.filter(piece => piece !== null).length

  useEffect(() => {
    if (state.phase !== 'playing' && state.phase !== 'levelDone') return
    let cancelled = false
    const photo = new Image()
    photo.onload = () => {
      if (!cancelled) setAsset({ id: level.id, aspect: photo.naturalWidth / photo.naturalHeight, failed: false })
    }
    photo.onerror = () => {
      if (!cancelled) {
        setFailedImages(current => new Set(current).add(level.id))
        setAsset({ id: level.id, aspect: 1, failed: true })
      }
    }
    photo.src = level.photo.src
    return () => { cancelled = true }
  }, [level.id, level.photo.src, state.phase])

  useEffect(() => {
    if (state.phase === 'intro' && hasStarted.current) introHeading.current?.focus()
    if (state.phase !== 'intro') hasStarted.current = true
    if (state.phase === 'playing') playHeading.current?.focus()
    if (state.phase === 'levelDone') completionHeading.current?.focus()
    if (state.phase === 'results') resultsHeading.current?.focus()
  }, [state.phase, state.levelIndex])

  useEffect(() => {
    if (state.phase === 'playing' && placedCount > 0) firstTrayPiece.current?.focus()
  }, [placedCount, state.phase])

  const dropPiece = (event: DragEvent<HTMLButtonElement>, position: number) => {
    event.preventDefault()
    const value = event.dataTransfer.getData('text/plain')
    if (/^[0-8]$/.test(value)) dispatch({ type: 'place', piece: Number(value), position })
    setHoveredPosition(null)
  }

  return <section className="cultural-puzzle" aria-labelledby="cultural-puzzle-title">
    {state.phase === 'intro' && <div className="cultural-puzzle__intro">
      <div className="cultural-puzzle__intro-copy">
        <p className="cultural-puzzle__eyebrow">ESTACIÓN 04 · ROMPECABEZAS CULTURAL</p>
        <h2 id="cultural-puzzle-title" ref={introHeading} tabIndex={-1}>Fragmentos de identidad:<br /><em>descubriendo la diversidad cultural de Guatemala.</em></h2>
        <p className="cultural-puzzle__lead">Reconstruye cuatro fotografías aportadas para el museo. Después de cada imagen descubrirás una ficha con hechos y fuentes del Mapa Cultural.</p>
        <div className="cultural-puzzle__context"><Info size={21} aria-hidden="true" /><p><strong>Las fotografías son contextuales:</strong> no están verificados la identidad de las personas, el lugar, la fecha ni la autoría de cada toma. No documentan las actividades locales descritas en las fichas ni representan a un pueblo entero.</p></div>
        <p className="cultural-puzzle__instructions">Cada nivel tiene nueve piezas. Arrástralas al tablero o selecciona una pieza y luego su posición con ratón, teclado o tacto. La referencia visual es opcional; no hay límite de tiempo.</p>
        <button type="button" className="cultural-puzzle__primary" onClick={() => dispatch({ type: 'start', order: shufflePuzzlePieces() })}>Comenzar recorrido <ArrowUpRight size={19} aria-hidden="true" /></button>
      </div>
      <div className="cultural-puzzle__intro-art" aria-hidden="true"><div className="cultural-puzzle__intro-grid"><span /><span /><span /><span /><span /><span /><span /><span /><span /></div><Puzzle size={77} strokeWidth={.9} /><span>CUATRO IMÁGENES · MUCHAS PREGUNTAS</span></div>
    </div>}

    {state.phase === 'playing' && <div className="cultural-puzzle__play">
      <div className="cultural-puzzle__top"><div><p className="cultural-puzzle__eyebrow">NIVEL {String(state.levelIndex + 1).padStart(2, '0')} / {String(culturalPuzzles.length).padStart(2, '0')} · {stop.people.toUpperCase()}</p><h2 id="cultural-puzzle-title" ref={playHeading} tabIndex={-1}>{level.title}</h2><p>La foto asignada a esta ficha no confirma la identidad de las personas ni documenta la actividad local descrita por sus fuentes.</p></div><div className="cultural-puzzle__level-stat"><span>PIEZAS COLOCADAS</span><strong>{placedCount}<small> / {pieceCount}</small></strong></div></div>
      <div className="cultural-puzzle__levels" aria-label="Progreso de niveles">{culturalPuzzles.map((item, index) => <span key={item.id} className={state.completed.includes(item.id) ? 'cultural-puzzle__level cultural-puzzle__level--done' : index === state.levelIndex ? 'cultural-puzzle__level cultural-puzzle__level--current' : 'cultural-puzzle__level'}><span>{state.completed.includes(item.id) ? <Check size={16} aria-hidden="true" /> : String(index + 1).padStart(2, '0')}</span>{item.id.toUpperCase()}</span>)}</div>
      <div className="cultural-puzzle__progress" role="progressbar" aria-label="Piezas colocadas en este nivel" aria-valuemin={0} aria-valuemax={pieceCount} aria-valuenow={placedCount}><span style={{ width: `${placedCount / pieceCount * 100}%` }} /></div>
      <p className="cultural-puzzle__overall">{state.completed.length} de {culturalPuzzles.length} niveles completados · Sin reloj ni puntuación</p>
      {!ready ? <div className="cultural-puzzle__loading" role="status">Preparando la imagen para este nivel…</div> : <>
        {asset.failed && <p className="cultural-puzzle__fallback" role="status">La fotografía no pudo cargarse. Puedes jugar con la ilustración simbólica original de este nivel.</p>}
        <div className="cultural-puzzle__reference"><details><summary><Eye size={17} aria-hidden="true" /> Mostrar u ocultar imagen de referencia</summary><img src={image} alt={artAlt} /><p>{artContext}</p></details></div>
        <div className="cultural-puzzle__workspace">
          <div className="cultural-puzzle__tray"><div className="cultural-puzzle__workspace-label"><span>PIEZAS DISPONIBLES</span><GripVertical size={18} aria-hidden="true" /></div><p>Elige una pieza. Su ubicación se indica en el nombre accesible para resolver el tablero sin arrastrar.</p><div className="cultural-puzzle__tray-grid">{state.tray.map((piece, index) => <button type="button" key={piece} ref={index === 0 ? firstTrayPiece : undefined} className={state.selectedPiece === piece ? 'cultural-puzzle__piece cultural-puzzle__piece--selected' : 'cultural-puzzle__piece'} style={tileStyle(image, piece, aspect)} aria-label={`Seleccionar pieza ${piece + 1}, fragmento ${piecePositions[piece]}`} aria-pressed={state.selectedPiece === piece} draggable onDragStart={event => { event.dataTransfer.effectAllowed = 'move'; event.dataTransfer.setData('text/plain', String(piece)) }} onClick={() => dispatch({ type: 'selectPiece', piece })}><span aria-hidden="true">✳</span></button>)}</div></div>
          <div className="cultural-puzzle__board-area"><div className="cultural-puzzle__workspace-label"><span>TABLERO · 3 × 3</span><span>{placedCount} / {pieceCount}</span></div><div className="cultural-puzzle__board" style={{ aspectRatio: String(aspect) }} role="group" aria-label="Tablero de nueve posiciones">{state.board.map((piece, position) => piece !== null ? <div key={position} className="cultural-puzzle__slot cultural-puzzle__slot--filled" style={tileStyle(image, piece, aspect)} role="img" aria-label={`Posición ${piecePositions[position]} completada`}><Check size={18} aria-hidden="true" /></div> : <button type="button" key={position} className={hoveredPosition === position ? 'cultural-puzzle__slot cultural-puzzle__slot--hover' : 'cultural-puzzle__slot'} aria-label={`Colocar pieza seleccionada en posición ${piecePositions[position]}`} onClick={() => dispatch({ type: 'place', piece: state.selectedPiece ?? -1, position })} onDragOver={event => { event.preventDefault(); event.dataTransfer.dropEffect = 'move' }} onDragEnter={event => { event.preventDefault(); setHoveredPosition(position) }} onDragLeave={event => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setHoveredPosition(null) }} onDrop={event => dropPiece(event, position)}><span aria-hidden="true">{String(position + 1).padStart(2, '0')}</span></button>)}</div><p className="cultural-puzzle__feedback" role="status" aria-live="polite">{state.feedback === 'miss' ? 'Esta pieza encaja en otra posición. Puedes probar de nuevo o consultar la referencia.' : state.feedback === 'placed' ? 'Pieza ubicada. Sigue con la siguiente.' : state.feedback === 'select' ? 'Selecciona primero una pieza del área disponible.' : state.selectedPiece !== null ? 'Fragmento seleccionado. Ahora elige una posición del tablero.' : 'Selecciona una pieza o arrástrala al tablero.'}</p></div>
        </div>
      </>}
      <div className="cultural-puzzle__play-footer"><span>{asset?.failed ? 'ILUSTRACIÓN SIMBÓLICA ORIGINAL' : 'FOTOGRAFÍA CONTEXTUAL · IDENTIDAD Y PROCEDENCIA SIN VERIFICAR'}</span><button type="button" onClick={() => dispatch({ type: 'restartLevel', order: shufflePuzzlePieces() })}>Reiniciar este nivel <RotateCcw size={17} aria-hidden="true" /></button></div>
    </div>}

    {state.phase === 'levelDone' && <div className="cultural-puzzle__complete">
      <div className="cultural-puzzle__complete-visual"><img src={image} alt={artAlt} /><span>IMAGEN RECONSTRUIDA · NIVEL {String(state.levelIndex + 1).padStart(2, '0')}</span></div>
      <div className="cultural-puzzle__complete-copy"><p className="cultural-puzzle__eyebrow">FICHA EDUCATIVA DESBLOQUEADA · {stop.place.toUpperCase()}</p><h2 id="cultural-puzzle-title" ref={completionHeading} tabIndex={-1}>{stop.people}</h2><p className="cultural-puzzle__complete-caption">{artContext} La actividad local documentada en el Mapa Cultural se presenta a continuación por separado; esta imagen no prueba que muestre a sus participantes.</p><div className="cultural-puzzle__fact"><span>CONTEXTO LOCAL DOCUMENTADO</span><p>{stop.localContext}</p></div><div className="cultural-puzzle__fact"><span>CONTEXTO HISTÓRICO DOCUMENTADO</span><p>{stop.history}</p></div><div className="cultural-puzzle__fact"><span>IDENTIDAD E IDIOMA</span><p>{stop.identityLanguage}</p></div><div className="cultural-puzzle__fact"><span>EXPRESIÓN CULTURAL CONTEXTUALIZADA</span><p>{stop.expression}</p></div><div className="cultural-puzzle__fact"><span>DERECHOS CULTURALES</span><p>{stop.rights}</p></div><div className="cultural-puzzle__question"><span>PARA PENSAR</span><p>{stop.question}</p></div><div className="cultural-puzzle__sources"><strong>Fuentes de los hechos de esta ficha, no de la fotografía</strong>{stop.sourceIds.map(id => { const source = culturalSources.find(item => item.id === id); return source ? <a key={id} href={source.url} target="_blank" rel="noopener noreferrer">{source.author}: {source.title} <ArrowUpRight size={14} aria-hidden="true" /></a> : null })}</div><div className="cultural-puzzle__complete-actions"><button type="button" className="cultural-puzzle__primary" onClick={() => dispatch({ type: 'nextLevel', order: shufflePuzzlePieces() })}>{state.levelIndex === culturalPuzzles.length - 1 ? 'Ver reflexión final' : 'Siguiente imagen'} <ArrowRight size={18} aria-hidden="true" /></button><button type="button" className="cultural-puzzle__secondary" onClick={() => dispatch({ type: 'restartLevel', order: shufflePuzzlePieces() })}>Repetir nivel <RotateCcw size={16} aria-hidden="true" /></button></div></div>
    </div>}

    {state.phase === 'results' && <div className="cultural-puzzle__results"><div className="cultural-puzzle__results-head"><p className="cultural-puzzle__eyebrow">CUATRO IMÁGENES · CUATRO FICHAS EDUCATIVAS</p><h2 id="cultural-puzzle-title" ref={resultsHeading} tabIndex={-1}>Un territorio,<br /><em>muchas voces por escuchar.</em></h2><p>Completaste {state.completed.length} de {culturalPuzzles.length} niveles. Estas fotografías son contextuales: ninguna define a un pueblo entero ni documenta por sí sola los encuentros citados.</p></div><div className="cultural-puzzle__results-grid">{culturalPuzzles.map(item => { const related = culturalStops.find(stop => stop.id === item.stopId)!; const failed = failedImages.has(item.id); return <article key={item.id}><img src={failed ? fallbackImages[item.id] : item.photo.src} alt={failed ? item.artDescription : item.photo.alt} loading="lazy" /><div><span>{related.place} · {related.department}</span><h3>{related.people}</h3><p>{related.reading}</p></div></article> })}</div><div className="cultural-puzzle__results-reflection"><span>REFLEXIÓN PARA EL CAMINO</span><p>El Acuerdo de 1995 reconoció derechos culturales de los pueblos Maya, Garífuna y Xinka. La actividad educativa sobre los cuatro pueblos incluye al Ladino sin confundir estos alcances. Valorar la diversidad significa escuchar cómo se identifican las personas, apoyar sus derechos y evitar reducirlas a una imagen o a un lugar del mapa.</p></div><div className="cultural-puzzle__results-actions"><button type="button" className="cultural-puzzle__primary" onClick={() => dispatch({ type: 'replay' })}>Volver a jugar <RotateCcw size={18} aria-hidden="true" /></button><Link to="/estacion/derechos-humanos">Continuar recorrido <ArrowRight size={18} aria-hidden="true" /></Link><Link to="/museo">Ir al vestíbulo <ArrowUpRight size={17} aria-hidden="true" /></Link></div></div>}
  </section>
}
