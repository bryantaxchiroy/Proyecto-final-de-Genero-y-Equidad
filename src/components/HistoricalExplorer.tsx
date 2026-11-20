import { useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Equal, GraduationCap, Handshake, Landmark, Megaphone, ScrollText, ShieldCheck, UsersRound, Vote, BriefcaseBusiness, Monitor } from 'lucide-react'
import type { HistoricalMoment, HistoricalSource } from '../data/historicalTypes'
import './historical.css'

const symbols = { voices: Megaphone, ballot: Vote, open: Landmark, equal: Equal, memory: ScrollText, peace: Handshake, shield: ShieldCheck, school: GraduationCap, work: BriefcaseBusiness, community: UsersRound, technology: Monitor }

type HistoricalExplorerProps = {
  title: string
  introduction: string
  moments: HistoricalMoment[]
  sources: HistoricalSource[]
}

export function HistoricalExplorer({ title, introduction, moments, sources }: HistoricalExplorerProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const moment = moments[activeIndex]
  const Symbol = symbols[moment.symbol]

  return <section className="history" aria-labelledby="history-heading">
    <div className="history__heading"><div><p className="kicker"><span className="kicker__dot" /> 02 · EXPLORACIÓN HISTÓRICA</p><h2 id="history-heading">{title}</h2><p>{introduction}</p></div><span className="history__heading-mark" aria-hidden="true">✳</span></div>
    <p className="history__instruction">Selecciona una fecha para explorar el acontecimiento. Puedes usar Tab y Enter con el teclado.</p>
    <div className="history__timeline" role="group" aria-label="Momentos históricos">
      {moments.map((item, index) => <button type="button" key={item.year} className={`history__stop${activeIndex === index ? ' history__stop--active' : ''}`} aria-pressed={activeIndex === index} aria-controls="history-detail" onClick={() => setActiveIndex(index)}><span className="history__stop-dot" aria-hidden="true" /><strong>{item.year}</strong><span>{item.label}</span></button>)}
    </div>
    <div id="history-detail" className="history__detail" aria-live="polite" aria-atomic="true" key={moment.year}>
      <div className="history__illustration" aria-hidden="true"><span className="history__illustration-ring"/><span className="history__illustration-year">{moment.year}</span><Symbol size={94} strokeWidth={1} /><span className="history__illustration-caption">ARCHIVO · GUATEMALA</span></div>
      <div className="history__story"><span className="history__index">ARCHIVO {String(activeIndex + 1).padStart(2, '0')} / {String(moments.length).padStart(2, '0')}</span><h3>{moment.title}</h3><div className="history__statement"><span>HECHO DOCUMENTADO</span><p>{moment.fact}</p></div><div className="history__statement history__statement--reading"><span>LECTURA EDUCATIVA</span><p>{moment.interpretation}</p></div><p className="history__question">Para pensar: {moment.question}</p><div className="history__citations"><BookOpen size={16} aria-hidden="true" /><span>Fuentes: {moment.sourceIds.map((id, index) => { const source = sources.find(entry => entry.id === id); return source ? <span key={id}>{index > 0 ? ' · ' : ''}<a href={`#fuente-${id}`}>{source.author}</a></span> : null })}</span></div></div>
    </div>
    <div className="history__controls"><span>{String(activeIndex + 1).padStart(2, '0')} <span>/ {String(moments.length).padStart(2, '0')}</span></span><div><button type="button" onClick={() => setActiveIndex(activeIndex - 1)} disabled={activeIndex === 0} aria-label="Acontecimiento anterior"><ArrowLeft size={19} aria-hidden="true" /></button><button type="button" onClick={() => setActiveIndex(activeIndex + 1)} disabled={activeIndex === moments.length - 1} aria-label="Siguiente acontecimiento"><ArrowRight size={19} aria-hidden="true" /></button></div></div>
    <div className="history__sources"><h3>Fuentes para profundizar</h3><p>Consulta aquí los documentos que respaldan los hechos de esta estación. Las preguntas y lecturas educativas son propuestas del museo.</p><ul>{sources.map(source => <li key={source.id} id={`fuente-${source.id}`}><div><strong>{source.author}</strong><span>{source.note}</span></div><a href={source.url} target="_blank" rel="noopener noreferrer" aria-label={`Abrir ${source.title} en una nueva pestaña`}>{source.title} <ArrowUpRight size={16} aria-hidden="true" /></a></li>)}</ul></div>
  </section>
}
