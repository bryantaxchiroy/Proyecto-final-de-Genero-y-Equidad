import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Check, Fingerprint, Landmark, Scale, Sun, UsersRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import { peaceDoors, peaceSources } from '../data/peaceDoors'
import './peace-path.css'

const symbols = { dignidad: Fingerprint, identidad: Landmark, justicia: Scale, participacion: UsersRound, paz: Sun }

export function PeacePath() {
  const [selected, setSelected] = useState<number | null>(null)
  const [visited, setVisited] = useState<Set<string>>(() => new Set())
  const hallwayHeading = useRef<HTMLHeadingElement>(null)
  const roomHeading = useRef<HTMLHeadingElement>(null)
  const door = selected === null ? null : peaceDoors[selected]
  const RoomSymbol = door ? symbols[door.id] : null

  const openDoor = (index: number) => {
    setSelected(index)
    setVisited(current => new Set(current).add(peaceDoors[index].id))
  }

  useEffect(() => {
    if (selected !== null) roomHeading.current?.focus()
  }, [selected])

  const returnToDoors = () => {
    setSelected(null)
    hallwayHeading.current?.focus()
  }

  return <section className="peace-path" aria-labelledby="peace-path-heading">
    <div className="peace-path__header"><p className="kicker"><span className="kicker__dot" /> 02 · RECORRIDO POR LOS DERECHOS</p><h2 id="peace-path-heading">Caminos hacia la Paz:<br /><em>un recorrido por los derechos humanos.</em></h2><p>Abre las puertas en el orden que prefieras. En cada sala distinguirás una declaración internacional, una norma nacional, un compromiso de paz o un hecho documentado de Guatemala.</p></div>
    <div className="peace-path__progress"><span>EL PASILLO · CINCO PUERTAS</span><span role="status" aria-live="polite">{visited.size} de {peaceDoors.length} puertas exploradas</span></div>
    <h3 className="peace-path__hallway-heading" ref={hallwayHeading} tabIndex={-1}>¿Qué puerta quieres abrir?</h3>
    <div className="peace-path__hallway" role="group" aria-label="Cinco puertas de derechos humanos">{peaceDoors.map((item, index) => {
      const Symbol = symbols[item.id]
      return <button type="button" key={item.id} className={`peace-portal peace-portal--${item.id}${selected === index ? ' peace-portal--open' : ''}${visited.has(item.id) ? ' peace-portal--visited' : ''}`} aria-label={`Abrir puerta ${index + 1}: ${item.title}${visited.has(item.id) ? ', explorada' : ''}`} aria-pressed={selected === index} aria-controls="peace-room-container" onClick={() => openDoor(index)}><span className="peace-portal__frame" aria-hidden="true"><span className="peace-portal__inside"><Symbol size={37} strokeWidth={1.2} /></span><span className="peace-portal__leaf"><span className="peace-portal__ornament">✳</span><span className="peace-portal__knob" /></span></span><span className="peace-portal__number">PUERTA {String(index + 1).padStart(2, '0')} {visited.has(item.id) && <Check size={15} aria-hidden="true" />}</span><strong>{item.title}</strong><span className="peace-portal__action">{visited.has(item.id) ? 'EXPLORADA · ABRIR DE NUEVO' : 'ABRIR PUERTA'} <ArrowUpRight size={15} aria-hidden="true" /></span></button>
    })}</div>
    <div id="peace-room-container" className="peace-path__room-container">{door && selected !== null ? <article className={`peace-room peace-room--${door.id}`} key={door.id} aria-labelledby="peace-room-heading"><div className="peace-room__visual" aria-hidden="true"><div className="peace-room__visual-arch"><span className="peace-room__visual-ring" />{RoomSymbol && <RoomSymbol size={105} strokeWidth={.85} />}</div><span>SALA {String(selected + 1).padStart(2, '0')} / {String(peaceDoors.length).padStart(2, '0')}</span><div className="peace-room__visual-path" /></div><div className="peace-room__content"><div className="peace-room__overline"><span>PUERTA {String(selected + 1).padStart(2, '0')} · DERECHOS EN DIÁLOGO</span><span>GUATEMALA</span></div><h3 id="peace-room-heading" ref={roomHeading} tabIndex={-1}>{door.title}</h3><p className="peace-room__lead">{door.overview}</p><div className="peace-room__history"><span>HECHO HISTÓRICO DOCUMENTADO</span><p>{door.historical}</p></div><div className="peace-room__evidence"><h4>Instrumentos y mecanismos</h4>{door.evidence.map((item, index) => <div className="peace-room__evidence-card" key={`${item.kind}-${index}`}><span>{item.kind.toUpperCase()}</span><p>{item.text}</p></div>)}</div><div className="peace-room__connection"><span>CONEXIÓN CON EL MUSEO</span><p>{door.connection}</p><Link to={door.relatedStation.path}>{door.relatedStation.label} <ArrowUpRight size={16} aria-hidden="true" /></Link></div><div className="peace-room__question"><span>UNA PREGUNTA PARA LLEVAR CONTIGO</span><p>{door.question}</p></div><div className="peace-room__sources"><h4><BookOpen size={17} aria-hidden="true" /> Fuentes de esta sala</h4><ul>{[...new Set([...door.historicalSourceIds, ...door.evidence.flatMap(item => item.sourceIds)])].map(id => { const source = peaceSources.find(item => item.id === id); return source ? <li key={id}><a href={source.url} target="_blank" rel="noopener noreferrer" aria-label={`Abrir ${source.title} en una nueva pestaña`}>{source.author}: {source.title} <ArrowUpRight size={14} aria-hidden="true" /></a><span>{source.note}</span></li> : null })}</ul></div><div className="peace-room__controls"><button type="button" onClick={returnToDoors}><ArrowLeft size={17} aria-hidden="true" /> Volver a las puertas</button><div><button type="button" onClick={() => openDoor(selected - 1)} disabled={selected === 0} aria-label="Puerta anterior"><ArrowLeft size={18} aria-hidden="true" /></button><button type="button" onClick={() => openDoor(selected + 1)} disabled={selected === peaceDoors.length - 1}>Siguiente puerta <ArrowRight size={17} aria-hidden="true" /></button></div></div></div></article> : <div className="peace-path__welcome"><div className="peace-path__welcome-symbol" aria-hidden="true">✳</div><div><span>CADA PUERTA ABRE UNA PREGUNTA</span><h3>Los derechos se conocen.<br /><em>La paz se construye.</em></h3><p>Selecciona un portal para entrar. Los hechos y las fuentes están separados de las reflexiones educativas del museo.</p></div></div>}</div>
    <div className="peace-path__closing"><div><span>UN CAMINO QUE CONTINÚA</span><p>{visited.size === peaceDoors.length ? 'Has abierto las cinco puertas: dignidad, identidad, justicia, participación y paz se necesitan mutuamente. Las normas y los acuerdos importan; cumplirlos requiere trabajo continuo.' : 'Puedes abrir cada puerta a tu ritmo. Los derechos se relacionan entre sí y no se agotan en una sola sala.'}</p></div><Link to="/museo">Volver al recorrido <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
  </section>
}
