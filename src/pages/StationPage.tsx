import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { StationMotif } from '../components/Artwork'
import { CulturalMap } from '../components/CulturalMap'
import { HistoricalExplorer } from '../components/HistoricalExplorer'
import { MemoryArchive } from '../components/MemoryArchive'
import { OpportunityObservatory } from '../components/OpportunityObservatory'
import { PeacePath } from '../components/PeacePath'
import { ProjectGallery } from '../components/ProjectGallery'
import { StationReflection } from '../components/StationReflection'
import { StationPreview } from '../components/StationPreview'
import { genderMoments, genderSources } from '../data/genderHistory'
import { inequalityMoments, inequalitySources } from '../data/inequalityHistory'
import { violenceMoments, violenceSources } from '../data/violenceHistory'
import { stations } from '../data/stations'
import { GenderClassificationGame } from '../games/GenderClassificationGame'
import { CulturalPuzzleGame } from '../games/CulturalPuzzleGame'
import { OpportunitySimulator } from '../games/OpportunitySimulator'
import { ProtectiveDecisionsGame } from '../games/ProtectiveDecisionsGame'
import { RightsRouteGame } from '../games/RightsRouteGame'
import { NotFound } from './NotFound'

const stationNarratives = {
  genero: {
    title: 'Las oportunidades a través del tiempo',
    introduction: 'Explora cuatro momentos de la participación política de las mujeres en Guatemala. Un derecho reconocido en la ley no siempre estuvo al alcance de todas.',
    moments: genderMoments, sources: genderSources,
    reflectionTitle: 'Los derechos se amplían. Las ideas también pueden cambiar.',
    reflectionText: 'En Guatemala, el reconocimiento del voto femenino pasó de excluir a muchas mujeres a ampliar formalmente la ciudadanía. Esa historia invita a preguntarnos cómo los estereotipos siguen influyendo en quién puede estudiar, participar y decidir. La igualdad escrita en la ley necesita oportunidades reales para vivirse.',
    reflectionPrompt: '¿Qué expectativa sobre los roles de género podemos cuestionar hoy en nuestro entorno?',
    next: '/estacion/violencia', nextLabel: 'Violencia',
  },
  violencia: {
    title: 'Memorias que no deben olvidarse',
    introduction: 'El Conflicto Armado Interno (1960–1996) afectó profundamente a comunidades indígenas y a mujeres. Esta selección aborda hechos documentados sin recrear el sufrimiento de quienes los vivieron.',
    moments: violenceMoments, sources: violenceSources,
    reflectionTitle: 'Recordar también es una forma de cuidar.',
    reflectionText: 'La firma de la paz no borró la violencia sufrida por mujeres y comunidades indígenas. Los informes históricos y el caso Sepur Zarco muestran por qué escuchar sin juzgar, defender la dignidad de las sobrevivientes y sostener la búsqueda de justicia y reparación son tareas colectivas.',
    reflectionPrompt: '¿Cómo podemos acompañar a alguien con respeto, sin imponerle decisiones ni culparle?',
    next: '/estacion/desigualdad', nextLabel: 'Desigualdad de género',
  },
  desigualdad: {
    title: 'Oportunidades que aún debemos construir',
    introduction: 'De los compromisos de paz a los desafíos actuales: explora cómo la educación, el trabajo, la participación y los recursos se relacionan con la igualdad de oportunidades.',
    moments: inequalityMoments, sources: inequalitySources,
    reflectionTitle: 'La igualdad requiere caminos que se puedan recorrer.',
    reflectionText: 'Los Acuerdos de Paz reconocieron barreras que no se resuelven solo con declararlas. Las observaciones posteriores de Naciones Unidas nos recuerdan la importancia de sostener el acceso a educación, recursos, trabajo digno y espacios de decisión, con atención a las realidades de cada comunidad.',
    reflectionPrompt: '¿Qué acción concreta y sostenida abriría oportunidades en nuestro entorno?',
    next: '/estacion/multiculturalidad', nextLabel: 'Identidad cultural y multiculturalidad',
  },
}

export function StationPage() {
  const { slug } = useParams()
  const station = stations.find(item => item.slug === slug)
  if (!station) return <NotFound />
  const narrative = station.slug === 'genero' || station.slug === 'violencia' || station.slug === 'desigualdad' ? stationNarratives[station.slug] : null

  return <div className={`station-page station-page--${station.theme} page-enter`}>
    <div className="page-back"><Link to="/museo"><ArrowLeft size={17} aria-hidden="true" /> Volver al vestíbulo</Link><span>ESTACIÓN {station.number} / {String(stations.length).padStart(2, '0')}</span></div>
    <section className="station-hero"><div className="station-hero__content"><p className="kicker"><span className="kicker__dot" /> ESTACIÓN {station.number} · {station.label.toUpperCase()}</p><h1>{station.title.split(' ').slice(0, -1).join(' ')} <em>{station.title.split(' ').at(-1)}</em></h1><p className="station-hero__description">{station.description}</p><div className="station-hero__tag"><span>◈</span> UNA MIRADA PARA REFLEXIONAR</div></div><div className="station-hero__art"><StationMotif theme={station.theme} large /><span className="station-hero__art-number">{station.number}</span></div></section>
    {station.slug === 'derechos-humanos' ? <>
      <PeacePath />
      <ProjectGallery station={station.slug} />
      <div className="station-game-section"><p className="kicker"><span className="kicker__dot" /> 03 · AVENTURA DE LOS DERECHOS</p><RightsRouteGame /></div>
      <StationReflection title="Cinco estaciones, una responsabilidad compartida." text="Género nos invitó a cuestionar estereotipos; Violencia, a escuchar la memoria con respeto; Desigualdad, a reconocer barreras; y Multiculturalidad, a valorar identidades sin encerrarlas en un lugar. Esta última estación reúne esos caminos en los derechos humanos y la cultura de paz: las normas, los acuerdos y la memoria orientan acciones que debemos sostener entre personas, comunidades e instituciones." prompt="¿Qué acción concreta podemos llevar fuera del museo para cuidar los derechos de otras personas?" next="/sala-final" nextLabel="Sala de reflexión" />
    </> : station.slug === 'multiculturalidad' ? <>
      <CulturalMap />
      <ProjectGallery station={station.slug} />
      <div className="station-game-section"><p className="kicker"><span className="kicker__dot" /> 03 · ROMPECABEZAS CULTURAL</p><CulturalPuzzleGame /></div>
      <StationReflection title="Un país, muchas voces en diálogo." text="El Acuerdo de 1995 reconoció la identidad y los derechos de los pueblos Maya, Garífuna y Xinka; el mapa muestra además una actividad educativa que incluye al pueblo Ladino. Estos puntos son invitaciones a escuchar, no límites culturales. Respetar los idiomas, la autoidentificación y la participación de las comunidades ayuda a combatir la discriminación." prompt={station.question} next="/estacion/derechos-humanos" nextLabel="Derechos humanos y cultura de paz" />
    </> : narrative ? <>
      {station.slug === 'violencia' ? <MemoryArchive introduction={narrative.introduction} /> : station.slug === 'desigualdad' ? <OpportunityObservatory introduction={narrative.introduction} /> : <HistoricalExplorer key={station.slug} title={narrative.title} introduction={narrative.introduction} moments={narrative.moments} sources={narrative.sources} />}
      <ProjectGallery station={station.slug} />
      {station.slug === 'genero' ? <div className="station-game-section"><p className="kicker"><span className="kicker__dot" /> 03 · EL MINIJUEGO</p><GenderClassificationGame /></div> : station.slug === 'violencia' ? <div className="station-game-section"><p className="kicker"><span className="kicker__dot" /> 03 · EXPERIENCIA NARRATIVA</p><ProtectiveDecisionsGame /></div> : <div className="station-game-section"><p className="kicker"><span className="kicker__dot" /> 03 · SIMULADOR DE OPORTUNIDADES</p><OpportunitySimulator /></div>}
      <StationReflection title={narrative.reflectionTitle} text={narrative.reflectionText} prompt={narrative.reflectionPrompt} next={narrative.next} nextLabel={narrative.nextLabel} />
    </> : <StationPreview station={station} />}
    <nav className="station-next" aria-label="Continuar recorrido"><span>CONTINÚA EXPLORANDO</span><Link to={station.next ? `/estacion/${station.next}` : '/sala-final'}>{station.next ? `Siguiente: ${stations.find(item => item.slug === station.next)?.label}` : 'Conoce la sala final'} <ArrowUpRight size={24} aria-hidden="true" /></Link><Link className="station-next__all" to="/museo">Ver todas las estaciones <ArrowRight size={16} aria-hidden="true" /></Link></nav>
  </div>
}
