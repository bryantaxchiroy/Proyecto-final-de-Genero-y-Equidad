import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

type StationReflectionProps = { title: string; text: string; prompt: string; next: string; nextLabel: string }

export function StationReflection({ title, text, prompt, next, nextLabel }: StationReflectionProps) {
  return <section className="station-reflection" aria-labelledby="reflection-heading"><div><p className="kicker"><span className="kicker__dot" /> 04 · REFLEXIÓN</p><h2 id="reflection-heading">{title}</h2></div><div className="station-reflection__body"><p>{text}</p><div className="station-reflection__prompt"><span>UNA PREGUNTA PARA EL CAMINO</span><strong>{prompt}</strong></div><Link to={next}>Continuar: {nextLabel} <ArrowUpRight size={19} aria-hidden="true" /></Link></div></section>
}
