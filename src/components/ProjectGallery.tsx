import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowDownRight, ArrowLeft, ArrowRight, Images, Maximize2, X } from 'lucide-react'
import { projectImages, type ProjectImage } from '../data/projectImages'
import type { StationSlug } from '../data/stations'
import './project-gallery.css'

const typeLabels = {
  fotografia: 'Fotografía contextual',
  ilustracion: 'Ilustración simbólica',
  montaje: 'Montaje ilustrativo',
}

function GalleryImage({ image, onOpen, featured = false }: { image: ProjectImage; onOpen: (button: HTMLButtonElement) => void; featured?: boolean }) {
  return <figure className={`project-gallery__item${featured ? ' project-gallery__item--featured' : ''}`}>
    <button type="button" className="project-gallery__open" aria-label={`Ampliar imagen: ${image.title}. ${image.alt}`} onClick={event => onOpen(event.currentTarget)}>
      <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
      <span className="project-gallery__zoom" aria-hidden="true"><Maximize2 size={17} /> Ampliar</span>
    </button>
    <figcaption>
      <span>{typeLabels[image.type]}{image.verification === 'verified' ? ' · Créditos verificados' : ''}</span>
      <h3>{image.title}</h3>
      <p className="project-gallery__lesson">{image.description}</p>
      <p>{image.context}</p>
    </figcaption>
  </figure>
}

function ImageViewer({ image, index, total, onClose, onNavigate }: { image: ProjectImage; index: number; total: number; onClose: () => void; onNavigate: (direction: number) => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog.showModal()
    closeRef.current?.focus()
    return () => {
      if (dialog.open) dialog.close()
      document.body.style.overflow = previousOverflow
    }
  }, [])

  return createPortal(
    <dialog ref={dialogRef} className="project-gallery__viewer" aria-label={`Visor de imágenes, ${index + 1} de ${total}`} onCancel={event => { event.preventDefault(); onClose() }} onKeyDown={event => {
      if (event.key === 'ArrowLeft') { event.preventDefault(); onNavigate(-1) }
      if (event.key === 'ArrowRight') { event.preventDefault(); onNavigate(1) }
    }}>
      <div className="project-gallery__viewer-top"><span>GALERÍA · {index + 1} / {total}</span><button ref={closeRef} type="button" onClick={onClose} aria-label="Cerrar visor de imágenes">Cerrar <X size={20} aria-hidden="true" /></button></div>
      <div className="project-gallery__viewer-image"><img src={image.src} alt={image.alt} decoding="async" /></div>
      <div className="project-gallery__viewer-bottom"><div><span>{typeLabels[image.type]} · No es evidencia histórica</span><h2>{image.title}</h2><p>{image.description}</p><p>{image.context}</p></div><nav aria-label="Navegación del visor"><button type="button" onClick={() => onNavigate(-1)} aria-label="Imagen anterior"><ArrowLeft size={20} aria-hidden="true" /></button><button type="button" onClick={() => onNavigate(1)} aria-label="Imagen siguiente"><ArrowRight size={20} aria-hidden="true" /></button></nav></div>
    </dialog>, document.body,
  )
}

export function ProjectGallery({ station }: { station: StationSlug }) {
  const images = projectImages[station]
  const [expanded, setExpanded] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const opener = useRef<HTMLButtonElement | null>(null)
  if (!images.length) return null

  const closeViewer = () => {
    setActiveIndex(null)
    const button = opener.current
    requestAnimationFrame(() => { if (button?.isConnected) button.focus() })
  }

  const openViewer = (index: number, button: HTMLButtonElement) => {
    opener.current = button
    setActiveIndex(index)
  }

  return <section className="project-gallery" aria-labelledby={`gallery-${station}`}>
    <div className="project-gallery__heading"><div><p className="kicker"><span className="kicker__dot" /> GALERÍA VISUAL DEL RECORRIDO</p><h2 id={`gallery-${station}`}>Otras formas de <em>mirar.</em></h2><p>Imágenes para pensar junto a la experiencia. Las fotografías no acreditan por sí solas fechas, identidades ni acontecimientos históricos.</p></div><Images size={34} strokeWidth={1.1} aria-hidden="true" /></div>
    <GalleryImage image={images[0]} featured onOpen={button => openViewer(0, button)} />
    <details className="project-gallery__more" onToggle={event => setExpanded(event.currentTarget.open)}><summary>Explorar otras {images.length - 1} imágenes de esta estación <ArrowDownRight size={18} aria-hidden="true" /></summary>{expanded && <div className="project-gallery__grid">{images.slice(1).map((image, index) => <GalleryImage key={image.src} image={image} onOpen={button => openViewer(index + 1, button)} />)}</div>}</details>
    {activeIndex !== null && typeof document !== 'undefined' && <ImageViewer image={images[activeIndex]} index={activeIndex} total={images.length} onClose={closeViewer} onNavigate={direction => setActiveIndex(current => current === null ? null : (current + direction + images.length) % images.length)} />}
  </section>
}
