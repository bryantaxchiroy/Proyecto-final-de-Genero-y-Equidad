import { ArrowDown, ArrowRight, ArrowUpRight, Compass, MapPin, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { LandscapeArtwork } from '../components/Artwork'

export function Home() {
  return <>
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__copy">
        <div className="eyebrow"><span className="eyebrow__line" /> UN MUSEO VIVO DIGITAL <span className="eyebrow__line" /></div>
        <p className="hero__edition">UNA EXPERIENCIA PARA MIRAR MÁS ALLÁ</p>
        <h1 id="hero-title">La historia deja <em>huellas.</em><br />Nosotras y nosotros elegimos <em>el camino.</em></h1>
        <p className="hero__intro">Un recorrido por las ideas, la memoria, las oportunidades, la diversidad cultural y los derechos que conectan nuestra historia en Guatemala.</p>
        <div className="hero__actions"><Link className="button button--primary" to="/museo">Iniciar recorrido <ArrowUpRight size={20} aria-hidden="true" /></Link><Link className="text-link" to="/proyecto">Conoce el proyecto <ArrowRight size={18} aria-hidden="true" /></Link></div>
        <div className="hero__footnote"><span className="tiny-sun" aria-hidden="true">✳</span><span>Cinco miradas, una historia,<br />un futuro por transformar.</span></div>
      </div>
      <div className="hero__visual">
        <LandscapeArtwork />
        <div className="visual-grain" aria-hidden="true" />
        <div className="visual-top"><span>01 / 05 &nbsp;—&nbsp; EL COMIENZO</span><Sparkles size={19} aria-hidden="true" /></div>
        <div className="visual-bottom"><div><MapPin size={16} aria-hidden="true" /> GUATEMALA, CENTROAMÉRICA</div><div className="visual-bottom__number">01<span> / 05</span></div></div>
        <div className="visual-caption">Cada puerta abre<br /><em>una nueva mirada.</em></div>
      </div>
      <div className="hero__scroll"><ArrowDown size={15} aria-hidden="true" /> DESLIZA PARA DESCUBRIR</div>
    </section>
    <section className="intro-strip" aria-label="Introducción al recorrido">
      <div className="intro-strip__icon"><Compass size={28} strokeWidth={1.3} aria-hidden="true" /></div>
      <p>No se trata solo de observar el pasado. <strong>Se trata de reconocer lo que podemos transformar hoy.</strong></p>
      <Link to="/museo" aria-label="Descubrir las estaciones del museo">Descubre las estaciones <ArrowUpRight size={17} aria-hidden="true" /></Link>
    </section>
  </>
}
