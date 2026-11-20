import { ArrowRight, ArrowUpRight, MoveUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { StationMotif } from '../components/Artwork'
import { stations } from '../data/stations'

export function Lobby() {
  return <div className="lobby page-enter">
    <section className="lobby__header">
      <div><p className="kicker"><span className="kicker__dot" /> EL VESTÍBULO · TU RECORRIDO COMIENZA AQUÍ</p><h1>Cinco puertas.<br /><em>Una misma historia.</em></h1></div>
      <div className="lobby__aside"><span className="orbit-symbol" aria-hidden="true">✳</span><p>Elige una estación para explorar. Cada espacio ofrece una forma diferente de mirar nuestra historia y nuestro presente.</p><span className="lobby__aside-index">EXPLORA A TU PROPIO RITMO &nbsp; ↗</span></div>
    </section>
    <div className="section-heading"><span>LAS ESTACIONES</span><span>01 — {String(stations.length).padStart(2, '0')}</span></div>
    <div className="station-grid station-grid--five">
      {stations.map(station => <article key={station.slug} className={`station-card station-card--${station.theme}${station.stage === 'preview' ? ' station-card--preview' : ''}`}>
        <div className="station-card__art"><div className="station-card__art-top"><span>ESTACIÓN {station.number}</span><MoveUpRight size={18} aria-hidden="true" /></div><StationMotif theme={station.theme} /><span className="station-card__art-bottom">{station.stage === 'preview' ? 'PRÓXIMA EXPERIENCIA' : 'UNA HISTORIA POR DESCUBRIR'}</span></div>
        <div className="station-card__body"><div className="station-card__meta"><span>{station.number} / {String(stations.length).padStart(2, '0')}</span><span className="status"><span /> {station.stage === 'preview' ? 'EN PREPARACIÓN' : 'POR EXPLORAR'}</span></div><h2>{station.label}</h2><p>{station.short}</p><Link to={`/estacion/${station.slug}`} className="station-card__link" aria-label={`${station.stage === 'preview' ? 'Ver avance de' : 'Explorar'} estación ${station.label}`}>{station.stage === 'preview' ? 'Ver avance de estación' : 'Explorar estación'} <ArrowUpRight size={19} aria-hidden="true" /></Link></div>
      </article>)}
    </div>
    <div className="lobby__closing"><div><span className="kicker">EL RECORRIDO CONTINÚA</span><h2>Al final, todas las<br />huellas se <em>encuentran.</em></h2></div><Link to="/sala-final" className="text-link">Visitar la sala final <ArrowRight size={18} aria-hidden="true" /></Link></div>
  </div>
}
