import { Compass, Info, Puzzle, ScrollText, Sparkles } from 'lucide-react'
import type { Station } from '../data/stations'
import './station-preview.css'

export function StationPreview({ station }: { station: Station }) {
  if (station.stage !== 'preview') return null

  const isMap = station.slug === 'multiculturalidad'

  return <div className="upcoming-station">
    <section className="upcoming-station__history" aria-labelledby="upcoming-history-heading">
      <div className="upcoming-station__intro"><p className="kicker"><span className="kicker__dot" /> 02 · EXPLORACIÓN HISTÓRICA · EN PREPARACIÓN</p><h2 id="upcoming-history-heading">{station.preview.historyTitle}</h2><p>{station.preview.historyDescription}</p><span className="upcoming-station__format"><Compass size={17} aria-hidden="true" /> {station.preview.historyFormat}</span></div>
      <div className={`upcoming-station__scene upcoming-station__scene--${station.theme}`} aria-hidden="true"><div className="upcoming-station__scene-orbit" />{isMap ? <><span className="upcoming-station__node upcoming-station__node--one" /><span className="upcoming-station__node upcoming-station__node--two" /><span className="upcoming-station__node upcoming-station__node--three" /><span className="upcoming-station__node upcoming-station__node--four" /><Compass size={95} strokeWidth={.8} /></> : <><ScrollText size={106} strokeWidth={.8} /><Sparkles className="upcoming-station__scene-spark" size={28} strokeWidth={1.1} /></>}<span className="upcoming-station__scene-caption">DISEÑO CONCEPTUAL · CONTENIDO PENDIENTE</span></div>
    </section>
    <section className="upcoming-station__game" aria-labelledby="upcoming-game-heading"><div><p className="kicker"><span className="kicker__dot" /> 03 · VIDEOJUEGO · EN PREPARACIÓN</p><h2 id="upcoming-game-heading">{station.game}</h2><p>{station.mechanic}</p><div className="upcoming-station__notice"><Info size={17} aria-hidden="true" /> La mecánica y el contenido se incorporarán en una etapa posterior.</div></div><div className="upcoming-station__game-icon" aria-hidden="true">{isMap ? <Puzzle size={85} strokeWidth={.9} /> : <Compass size={85} strokeWidth={.9} />}</div></section>
    <div className="upcoming-station__question"><span>04 · UNA PREGUNTA PARA EL CAMINO</span><p>“{station.question}”</p></div>
  </div>
}
