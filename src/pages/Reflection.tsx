import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { TeamSection } from '../components/TeamSection'
import { stations } from '../data/stations'

export function Reflection() {
  return <div className="reflection page-enter"><div className="page-back"><Link to="/museo"><ArrowLeft size={17} aria-hidden="true" /> Volver al vestíbulo</Link><span>SALA FINAL</span></div>
    <section className="reflection__hero"><span className="reflection__symbol" aria-hidden="true">✳</span><p className="kicker">SALA DE REFLEXIÓN · EL RECORRIDO SIGUE FUERA DEL MUSEO</p><h1>El futuro también<br />deja <em>huellas.</em></h1><p>Cinco miradas conectadas por una pregunta: ¿qué podemos transformar desde donde estamos?</p></section>
    <section className="reflection__links reflection__links--five" aria-label="Temas del museo">{stations.map(station => <Link key={station.slug} to={`/estacion/${station.slug}`}><span>{station.number} / {station.label}</span><ArrowUpRight size={21} aria-hidden="true" /></Link>)}</section>
    <div className="reflection__note"><span>EN CONSTRUCCIÓN</span><p>Esta sala reunirá las conexiones históricas documentadas, las reflexiones de las experiencias y los recursos institucionales verificados en las siguientes fases.</p></div>
    <TeamSection />
  </div>
}
