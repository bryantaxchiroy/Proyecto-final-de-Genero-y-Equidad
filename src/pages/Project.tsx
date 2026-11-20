import { ArrowLeft, ArrowUpRight, BookOpen, HeartHandshake, Layers3 } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Project() {
  return <div className="project page-enter"><div className="page-back"><Link to="/"><ArrowLeft size={17} aria-hidden="true" /> Volver al inicio</Link><span>ACERCA DEL PROYECTO</span></div>
    <section className="project__hero"><p className="kicker"><span className="kicker__dot" /> UNA EXPERIENCIA EDUCATIVA DESDE GUATEMALA</p><h1>Aprender para <em>transformar.</em></h1><p>Huellas de la Desigualdad es un museo digital interactivo creado como proyecto final del curso Multiculturalidad, Género y Equidad. Conecta cinco estaciones sobre género, violencia, desigualdad, identidad cultural y derechos humanos en Guatemala.</p><Link className="button button--primary" to="/museo">Explorar el museo <ArrowUpRight size={19} aria-hidden="true" /></Link></section>
    <section className="project__values"><article><BookOpen aria-hidden="true" /><h2>Contexto con cuidado</h2><p>Los hechos históricos publicados se acompañan de fuentes y se distinguen de las reflexiones educativas del museo.</p></article><article><Layers3 aria-hidden="true" /><h2>Aprender haciendo</h2><p>Cinco estaciones reunirán experiencias distintas para explorar, decidir, construir y reflexionar.</p></article><article><HeartHandshake aria-hidden="true" /><h2>Un espacio respetuoso</h2><p>Sin imágenes explícitas ni culpabilización. La orientación institucional se publicará únicamente tras verificarla.</p></article></section>
    <p className="project__credit">Proyecto final universitario · Multiculturalidad, Género y Equidad · Guatemala</p>
  </div>
}
