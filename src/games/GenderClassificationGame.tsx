import { useEffect, useReducer, useRef, useState } from 'react'
import type { DragEvent } from 'react'
import { ArrowRight, ArrowUpRight, Check, Equal, GripVertical, Lightbulb, RotateCcw, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { genderCards, type Classification } from '../data/genderCards'
import { getGenderResult } from '../data/genderResults'
import { createClassificationReducer, initialGameState } from './classificationEngine'
import './gender-game.css'

const reducer = createClassificationReducer(genderCards)

const categories: { id: Classification; title: string; hint: string }[] = [
  { id: 'stereotype', title: 'Estereotipo de género', hint: 'Limita lo que alguien puede ser o hacer' },
  { id: 'equality', title: 'Promueve la igualdad', hint: 'Abre posibilidades para todas las personas' },
]

export function GenderClassificationGame() {
  const [state, dispatch] = useReducer(reducer, initialGameState)
  const [hovered, setHovered] = useState<Classification | null>(null)
  const cardHeading = useRef<HTMLHeadingElement>(null)
  const feedbackHeading = useRef<HTMLHeadingElement>(null)
  const resultsHeading = useRef<HTMLHeadingElement>(null)
  const card = genderCards[state.index]
  const answer = state.answers[state.index]
  const score = state.answers.filter(item => item.correct).length
  const result = getGenderResult(score, genderCards.length)

  useEffect(() => {
    if (state.phase === 'playing') cardHeading.current?.focus()
    if (state.phase === 'feedback') feedbackHeading.current?.focus()
    if (state.phase === 'results') resultsHeading.current?.focus()
  }, [state.phase, state.index])

  const classify = (choice: Classification, cardId = card.id) => {
    dispatch({ type: 'classify', cardId, choice })
    setHovered(null)
  }

  const startDragging = (event: DragEvent<HTMLElement>) => {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', card.id)
  }

  const dropCard = (event: DragEvent<HTMLButtonElement>, choice: Classification) => {
    event.preventDefault()
    const cardId = event.dataTransfer.getData('text/plain')
    if (cardId) classify(choice, cardId)
    setHovered(null)
  }

  return <section className="gender-game" aria-labelledby="gender-game-title">
    {state.phase === 'intro' && <div className="gender-game__intro">
      <div className="gender-game__intro-copy">
        <p className="gender-game__eyebrow">ESTACIÓN 01 <span /> EXPERIENCIA INTERACTIVA</p>
        <h2 id="gender-game-title">Rompiendo <em>estereotipos.</em></h2>
        <p className="gender-game__lead">Las oportunidades se amplían cuando cuestionamos las ideas que nos dicen quién puede hacer qué.</p>
        <div className="gender-game__historical-bridge"><span className="gender-game__bridge-icon"><Lightbulb size={21} aria-hidden="true" /></span><p>En Guatemala, el reconocimiento del voto de las mujeres se amplió con el tiempo. Las leyes pueden cambiar; también podemos revisar las expectativas sobre profesiones, cuidados y participación que persisten en nuestra vida cotidiana.</p></div>
        <p className="gender-game__instructions"><strong>Tu misión:</strong> clasifica {genderCards.length} afirmaciones en dos caminos. Arrastra cada tarjeta o elige una opción con los botones. Recibirás una explicación después de cada respuesta, sin límite de tiempo.</p>
        <button className="gender-game__primary" type="button" onClick={() => dispatch({ type: 'start' })}>Comenzar juego <ArrowUpRight size={20} aria-hidden="true" /></button>
      </div>
      <div className="gender-game__intro-art" aria-hidden="true"><div className="gender-game__art-orbit" /><div className="gender-game__art-card gender-game__art-card--back"><span>?</span></div><div className="gender-game__art-card gender-game__art-card--front"><Equal size={65} strokeWidth={1.3} /></div><Sparkles className="gender-game__art-spark" size={30} strokeWidth={1.2} /><span className="gender-game__art-caption">LAS IDEAS TAMBIÉN SE TRANSFORMAN</span></div>
    </div>}

    {(state.phase === 'playing' || state.phase === 'feedback') && <div className="gender-game__play">
      <div className="gender-game__play-top"><div><p className="gender-game__eyebrow">ROMPIENDO ESTEREOTIPOS · EN JUEGO</p><h2 id="gender-game-title">Elige un <em>camino.</em></h2></div><div className="gender-game__stats"><span>TARJETA <strong>{String(state.index + 1).padStart(2, '0')} / {String(genderCards.length).padStart(2, '0')}</strong></span><span>ACIERTOS <strong>{score}</strong></span></div></div>
      <div className="gender-game__progress" role="progressbar" aria-label="Tarjetas respondidas" aria-valuemin={0} aria-valuemax={genderCards.length} aria-valuenow={state.answers.length}><div style={{ width: `${state.answers.length / genderCards.length * 100}%` }} /></div>
      <p className="gender-game__play-hint">{state.phase === 'playing' ? 'Arrastra la tarjeta a un destino o selecciona un botón. También puedes usar Tab y Enter.' : 'Tómate tu tiempo para leer la explicación antes de continuar.'}</p>
      <div className="gender-game__arena">
        <div className="gender-game__card-wrap"><article key={card.id} className={`gender-game__card${state.phase === 'feedback' ? ' gender-game__card--answered' : ''}`} draggable={state.phase === 'playing'} onDragStart={state.phase === 'playing' ? startDragging : undefined} onDragEnd={() => setHovered(null)}><div className="gender-game__card-top"><span>AFIRMACIÓN {String(state.index + 1).padStart(2, '0')}</span><GripVertical size={20} aria-hidden="true" /></div><span className="gender-game__card-context">{card.context}</span><h3 ref={cardHeading} tabIndex={-1}>“{card.text}”</h3><div className="gender-game__card-foot"><span>OBSERVA · REFLEXIONA · DECIDE</span><span aria-hidden="true">↗</span></div></article></div>
        <div className="gender-game__destinations" aria-label="Opciones de clasificación">{categories.map(category => {
          const selected = answer?.choice === category.id
          const correct = state.phase === 'feedback' && card.category === category.id
          return <button key={category.id} type="button" className={`gender-game__destination gender-game__destination--${category.id}${hovered === category.id ? ' gender-game__destination--hover' : ''}${selected ? ' gender-game__destination--selected' : ''}${correct ? ' gender-game__destination--correct' : ''}`} disabled={state.phase !== 'playing'} onClick={() => classify(category.id)} onDragOver={state.phase === 'playing' ? event => { event.preventDefault(); event.dataTransfer.dropEffect = 'move' } : undefined} onDragEnter={state.phase === 'playing' ? event => { event.preventDefault(); setHovered(category.id) } : undefined} onDragLeave={event => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setHovered(null) }} onDrop={state.phase === 'playing' ? event => dropCard(event, category.id) : undefined} aria-label={`Clasificar como ${category.title}`}><span className="gender-game__destination-symbol" aria-hidden="true">{category.id === 'stereotype' ? '✳' : <Equal size={25} strokeWidth={1.7} />}</span><span className="gender-game__destination-text"><strong>{category.title}</strong><small>{category.hint}</small></span><span className="gender-game__destination-action" aria-hidden="true">{correct ? <Check size={21} /> : <ArrowRight size={21} />}</span></button>
        })}</div>
      </div>
      {state.phase === 'feedback' && <div className={`gender-game__feedback gender-game__feedback--${answer.correct ? 'correct' : 'try'}`} role="status" aria-live="polite"><div className="gender-game__feedback-symbol" aria-hidden="true">{answer.correct ? <Check size={25} /> : <Lightbulb size={25} />}</div><div><p className="gender-game__eyebrow">{answer.correct ? 'BUENA OBSERVACIÓN' : 'UNA OPORTUNIDAD PARA APRENDER'}</p><h3 ref={feedbackHeading} tabIndex={-1}>{answer.correct ? '¡Clasificación acertada!' : `Esta afirmación ${card.category === 'stereotype' ? 'es un estereotipo' : 'promueve la igualdad'}.`}</h3><p>{card.explanation}</p><button type="button" className="gender-game__next" onClick={() => dispatch({ type: 'next' })}>{state.index === genderCards.length - 1 ? 'Ver mis resultados' : 'Siguiente tarjeta'} <ArrowRight size={18} aria-hidden="true" /></button></div></div>}
    </div>}

    {state.phase === 'results' && <div className="gender-game__results">
      <div className="gender-game__results-art" aria-hidden="true"><span>✳</span><div className="gender-game__results-orbit" /></div>
      <div className="gender-game__results-copy">
        <p className="gender-game__eyebrow">PARTIDA COMPLETADA · ESTACIÓN 01</p>
        <span className="gender-game__level">NIVEL ALCANZADO · {result.name}</span>
        <h2 id="gender-game-title" ref={resultsHeading} tabIndex={-1}>{result.title}</h2>
        <div className="gender-game__result-numbers"><div><strong>{score}<span> / {genderCards.length}</span></strong><small>RESPUESTAS CORRECTAS / TARJETAS RESPONDIDAS</small></div><div><strong>{result.percent}<span>%</span></strong><small>DE ACIERTOS</small></div></div>
        <div className="gender-game__result-progress" role="progressbar" aria-label="Porcentaje de aciertos de esta partida" aria-valuemin={0} aria-valuemax={100} aria-valuenow={result.percent}><span style={{ width: `${result.percent}%` }} /></div>
        <p className="gender-game__results-message">{result.message}</p>
        <p className="gender-game__result-context">Este nivel describe únicamente tus respuestas en esta partida; no evalúa tus valores ni tus capacidades personales.</p>
        <div className="gender-game__results-reflection"><span>PARA LLEVAR CONTIGO</span><p>La historia del sufragio en Guatemala muestra que los derechos pueden ampliarse. Reconocer estereotipos nos ayuda a promover oportunidades en la vida cotidiana. En la siguiente estación exploraremos la violencia desde la memoria y el apoyo respetuoso: los estereotipos no son su única causa.</p></div>
        <div className="gender-game__result-actions"><button className="gender-game__primary" type="button" onClick={() => dispatch({ type: 'replay' })}>Volver a intentar <RotateCcw size={18} aria-hidden="true" /></button><Link to="/estacion/violencia" className="gender-game__secondary">Continuar recorrido <ArrowRight size={17} aria-hidden="true" /></Link><Link to="/museo" className="gender-game__secondary">Ir al vestíbulo <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
      </div>
    </div>}
  </section>
}
