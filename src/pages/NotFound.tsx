import { Link } from 'react-router-dom'

export function NotFound() {
  return <section className="not-found page-enter"><span className="kicker">PÁGINA NO ENCONTRADA</span><h1>Este camino aún no está <em>trazado.</em></h1><p>Vuelve al vestíbulo para continuar tu recorrido.</p><Link className="button button--primary" to="/museo">Ir al vestíbulo ↗</Link></section>
}
