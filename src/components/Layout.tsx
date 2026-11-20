import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { projectImages } from '../data/projectImages'

const verifiedMediaCredits = Object.values(projectImages)
  .flat()
  .filter(image => image.verification === 'verified' && (image.author || image.provenance || image.license || image.sourceUrl))

export function Layout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    setMenuOpen(false)
  }, [location.pathname])

  return (
    <div className="app-shell">
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <header className="site-header">
        <Link to="/" className="brand" aria-label="Huellas de la Desigualdad, inicio">
          <span className="brand__mark" aria-hidden="true"><i /><i /><i /></span>
          <span className="brand__text">HUELLAS<span>DE LA DESIGUALDAD</span></span>
        </Link>
        <button className="menu-toggle" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} aria-controls="main-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={23} /> : <Menu size={23} />}</button>
        <nav id="main-nav" className={`site-nav${menuOpen ? ' site-nav--open' : ''}`} aria-label="Navegación principal">
          <NavLink to="/museo" className={({ isActive }) => isActive ? 'nav-active' : ''}>Explorar museo</NavLink>
          <NavLink to="/proyecto" className={({ isActive }) => isActive ? 'nav-active' : ''}>El proyecto</NavLink>
          <Link className="nav-cta" to="/museo">Entrar al museo <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </nav>
      </header>
      <main id="contenido" tabIndex={-1}>{children}</main>
      <footer className="site-footer">
        <span>HUELLAS DE LA DESIGUALDAD</span><span>Museo vivo digital · Guatemala</span><Link to="/proyecto">Acerca del proyecto <ArrowUpRight size={14} aria-hidden="true" /></Link>
        {location.pathname === '/' && <section className="site-footer__media-credits" aria-labelledby="media-credits-title">
          <h2 id="media-credits-title">Créditos y recursos multimedia</h2>
          <p>Este museo utiliza imágenes e ilustraciones con fines educativos. Los recursos procedentes de <a href="https://commons.wikimedia.org/">Wikimedia Commons</a> se utilizan conforme a sus respectivas condiciones de licencia. Las atribuciones específicas y las fuentes verificadas pueden consultarse en el apartado de créditos multimedia.</p>
          <details>
            <summary>Consultar atribuciones multimedia</summary>
            {verifiedMediaCredits.length ? <ul>{verifiedMediaCredits.map(image => <li key={image.src}>
              <strong>{image.title}</strong>
              {image.author && <span>Autor o creador: {image.author}</span>}
              {image.institution && <span>Institución: {image.institution}</span>}
              {image.provenance && <span>Procedencia: {image.provenance}</span>}
              {image.license && <span>Licencia: {image.license}</span>}
              {image.modifications && <span>Modificaciones: {image.modifications}</span>}
              {image.sourceUrl && <a href={image.sourceUrl}>Consultar recurso original</a>}
            </li>)}</ul> : <p>No hay atribuciones individuales verificadas publicadas actualmente. No se atribuyen a Wikimedia Commons los recursos cuya procedencia aún no ha sido comprobada.</p>}
          </details>
        </section>}
      </footer>
    </div>
  )
}
