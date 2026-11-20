import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ArrowUpRight, BriefcaseBusiness, Check, GraduationCap, Landmark, Monitor, ScanSearch, Sparkles } from 'lucide-react'
import { inequalityMoments, inequalitySources } from '../data/inequalityHistory'
import { inequalityCategories, type ObservatoryCategory } from '../data/inequalityObservatory'
import type { HistoricalMoment } from '../data/historicalTypes'
import './opportunity-observatory.css'

const categoryIcons = { educacion: GraduationCap, trabajo: BriefcaseBusiness, participacion: Landmark, recursos: Monitor }

export function OpportunityObservatory({ introduction }: { introduction: string }) {
  const [selected, setSelected] = useState<ObservatoryCategory['id'] | null>(null)
  const [visited, setVisited] = useState<Set<ObservatoryCategory['id']>>(() => new Set())
  const [lens, setLens] = useState<'commitment' | 'observation'>('commitment')
  const investigationHeading = useRef<HTMLHeadingElement>(null)
  const category = inequalityCategories.find(item => item.id === selected)
  const focus = category?.[lens]
  const focusedMoment = inequalityMoments.find(moment => moment.year === focus?.year)
  const focusSource = focusedMoment && inequalitySources.find(source => source.id === focusedMoment.sourceIds[0])
  const evidence = category?.evidenceYears.map(year => inequalityMoments.find(moment => moment.year === year)).filter((moment): moment is HistoricalMoment => Boolean(moment)) ?? []

  const selectCategory = (id: ObservatoryCategory['id']) => {
    setSelected(id)
    setVisited(current => new Set(current).add(id))
    setLens('commitment')
  }

  useEffect(() => {
    if (selected !== null) investigationHeading.current?.focus()
  }, [selected])

  return <section className="opportunity-observatory" aria-labelledby="observatory-heading">
    <div className="opportunity-observatory__header"><div><p className="kicker"><span className="kicker__dot" /> 02 · EXPLORACIÓN HISTÓRICA</p><h2 id="observatory-heading">Observatorio de Oportunidades:<br /><em>las brechas que debemos comprender.</em></h2><p>{introduction}</p></div><span className="opportunity-observatory__header-mark" aria-hidden="true"><ScanSearch size={63} strokeWidth={.8} /></span></div>
    <div className="opportunity-observatory__catalog"><span>SELECCIONA UN ÁREA DE OBSERVACIÓN</span><span role="status" aria-live="polite">{visited.size} de {inequalityCategories.length} áreas exploradas</span></div>
    <div className="opportunity-observatory__categories" role="group" aria-label="Áreas de observación">{inequalityCategories.map((item, index) => {
      const Icon = categoryIcons[item.id]
      return <button type="button" key={item.id} className={`opportunity-observatory__category${selected === item.id ? ' opportunity-observatory__category--selected' : ''}${visited.has(item.id) ? ' opportunity-observatory__category--visited' : ''}`} aria-pressed={selected === item.id} aria-controls="observatory-investigation" onClick={() => selectCategory(item.id)}><span className="opportunity-observatory__category-top"><span>ÁREA {String(index + 1).padStart(2, '0')}</span>{visited.has(item.id) ? <Check size={18} aria-hidden="true" /> : <ArrowUpRight size={18} aria-hidden="true" />}</span><Icon size={31} strokeWidth={1.3} aria-hidden="true" /><strong>{item.name}</strong><small>{visited.has(item.id) ? 'EXPLORADA' : 'EXPLORAR ÁREA'}</small></button>
    })}</div>

    <div id="observatory-investigation" className="opportunity-observatory__investigation">{category ? <article key={category.id} className="opportunity-observatory__panel" aria-labelledby="observatory-investigation-title">
      <div className="opportunity-observatory__panel-top"><div><span>INVESTIGACIÓN · {category.tag.toUpperCase()}</span><h3 id="observatory-investigation-title" ref={investigationHeading} tabIndex={-1}>{category.name}</h3><p>{category.summary}</p></div><div className="opportunity-observatory__panel-symbol" aria-hidden="true"><ScanSearch size={39} strokeWidth={1.1} /></div></div>
      <div className="opportunity-observatory__diagram-heading"><span>DIAGRAMA CUALITATIVO · NO REPRESENTA DATOS MEDIDOS</span><span>COMPROMISO ↔ OBSERVACIÓN</span></div>
      <div className="opportunity-observatory__comparison"><button type="button" className={`opportunity-observatory__lens${lens === 'commitment' ? ' opportunity-observatory__lens--active' : ''}`} aria-pressed={lens === 'commitment'} onClick={() => setLens('commitment')}><span className="opportunity-observatory__lens-type">COMPROMISO HISTÓRICO · {category.commitment.year}</span><strong>{category.commitment.headline}</strong><span>{category.commitment.detail}</span><small>EXAMINAR ESTE ENFOQUE <ArrowRight size={15} aria-hidden="true" /></small></button><div className="opportunity-observatory__connection" aria-hidden="true"><span>↔</span></div><button type="button" className={`opportunity-observatory__lens${lens === 'observation' ? ' opportunity-observatory__lens--active' : ''}`} aria-pressed={lens === 'observation'} onClick={() => setLens('observation')}><span className="opportunity-observatory__lens-type">OBSERVACIÓN POSTERIOR · {category.observation.year}</span><strong>{category.observation.headline}</strong><span>{category.observation.detail}</span><small>EXAMINAR ESTE ENFOQUE <ArrowRight size={15} aria-hidden="true" /></small></button></div>
      <div className="opportunity-observatory__focus" role="status" aria-live="polite"><Sparkles size={22} strokeWidth={1.4} aria-hidden="true" /><div><span>ENFOQUE SELECCIONADO · {lens === 'commitment' ? 'COMPROMISO' : 'OBSERVACIÓN'}</span><p>{focus?.detail}</p>{focusSource && <a href={focusSource.url} target="_blank" rel="noopener noreferrer">Consultar la fuente de {focus?.year} <ArrowUpRight size={15} aria-hidden="true" /></a>}</div></div>
      <div className="opportunity-observatory__reading"><div><span>LECTURA EDUCATIVA DEL MUSEO</span><p>{category.interpretation}</p></div><div><span>PREGUNTA PARA REFLEXIONAR</span><p>{category.question}</p></div></div>
      <div className="opportunity-observatory__evidence"><div className="opportunity-observatory__evidence-title"><h4>El sustento de esta investigación</h4><p>Los textos de 1995 y 1996 son compromisos, no resultados medidos. Las observaciones posteriores no demuestran por sí solas qué se cumplió.</p></div><div className="opportunity-observatory__evidence-grid">{evidence.map(moment => <div className="opportunity-observatory__evidence-card" key={moment.year}><span className="opportunity-observatory__evidence-kind">{Number(moment.year) < 2000 ? 'COMPROMISO DE PAZ' : 'OBSERVACIÓN INSTITUCIONAL'} · {moment.year}</span><h5>{moment.title}</h5><p><strong>Hecho documentado.</strong> {moment.fact}</p><details><summary>Lectura y pregunta del hito</summary><p><strong>Lectura educativa.</strong> {moment.interpretation}</p><p><strong>Para pensar.</strong> {moment.question}</p></details><div className="opportunity-observatory__source-links">{moment.sourceIds.map(id => { const source = inequalitySources.find(item => item.id === id); return source ? <a key={id} href={source.url} target="_blank" rel="noopener noreferrer" aria-label={`Abrir ${source.title} en una nueva pestaña`}>{source.author}: {source.title} <ArrowUpRight size={14} aria-hidden="true" /></a> : null })}</div></div>)}</div></div>
    </article> : <div className="opportunity-observatory__empty"><div className="opportunity-observatory__empty-orbit" aria-hidden="true"><ScanSearch size={70} strokeWidth={1} /></div><div><span>CUATRO PREGUNTAS · UN MISMO FUTURO</span><h3>Observa las conexiones.<br /><em>Encuentra nuevas preguntas.</em></h3><p>Elige un área para comparar un compromiso histórico con una observación posterior. Las comparaciones son cualitativas: no representan estadísticas ni certifican el cumplimiento de un acuerdo.</p></div></div>}</div>
    <div className="opportunity-observatory__closing"><span>EL RECORRIDO CONTINÚA</span><p>{visited.size === inequalityCategories.length ? 'Has explorado las cuatro áreas. Reducir desigualdades requiere escuchar a las comunidades y sostener acciones en educación, trabajo, participación y acceso a recursos.' : 'Puedes explorar las cuatro áreas a tu ritmo. Las oportunidades se construyen con decisiones, recursos y participación sostenida.'}</p></div>
  </section>
}
