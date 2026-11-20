/// <reference types="vite/client" />
import type { StationSlug } from './stations'
import type { CulturalStop } from './culturalStops'

export type ProjectImage = {
  src: string
  title: string
  alt: string
  context: string
  description: string
  type: 'fotografia' | 'ilustracion' | 'montaje'
  author?: string
  institution?: string
  date?: string
  provenance?: string
  license?: string
  sourceUrl?: string
  modifications?: string
  verification?: 'verified' | 'pending'
  puzzleId?: CulturalStop['id']
}

// La ubicación puede actualizarse aquí si el equipo reorganiza los originales.
// Solo se empaquetan archivos JPG, JPEG, PNG y WEBP: el AVIF no verificado queda fuera.
const folder = '../../imagenes para el proyecto final de genero y equidad/imagenes para el proyecto final de genero y equidad/'
const files = import.meta.glob('../../imagenes para el proyecto final de genero y equidad/imagenes para el proyecto final de genero y equidad/*.{jpg,jpeg,png,webp}', { eager: true, query: '?url', import: 'default' })

function asset(filename: string): string {
  const url = files[`${folder}${filename}`]
  if (typeof url !== 'string') throw new Error(`Imagen faltante: ${filename}`)
  return url
}

// Los nombres no demuestran identidad, autoría ni que una foto documente el
// acontecimiento citado en la estación. Campos sin verificar se dejan vacíos.
export const projectImages: Record<StationSlug, ProjectImage[]> = {
  genero: [
    { src: asset('voces_organizadas.jpg'), title: 'Voces en un espacio de diálogo', alt: 'Dos mujeres ante micrófonos durante una reunión con otras personas al fondo.', context: 'Identidad de participantes, lugar y fecha sin verificar.', description: 'La participación requiere espacios donde las voces puedan ser escuchadas y tomadas en cuenta.', type: 'fotografia' },
    { src: asset('un_derecho_limitado.jpg'), title: 'El gesto de votar', alt: 'Una mano introduce una papeleta blanca en una urna de madera.', context: 'La imagen no documenta las reformas guatemaltecas de 1945 o 1965.', description: 'La historia del sufragio muestra que el reconocimiento de un derecho puede ampliarse y también haber excluido a personas.', type: 'fotografia' },
    { src: asset('mas_ciudadania.jpg'), title: 'Espacio público y ciudadanía', alt: 'Gran bandera de Guatemala desplegada en una plaza al anochecer, frente a edificios.', context: 'Fecha y ocasión fotografiada sin verificar.', description: 'La ciudadanía implica participar en las decisiones que afectan a la vida colectiva.', type: 'fotografia' },
    { src: asset('igualdad_ante_la_ley.png'), title: 'Igualdad ante la ley', alt: 'Balanza, mazo, libro y gafas colocados sobre una mesa clara.', context: 'No representa una institución o documento jurídico específico.', description: 'Un principio legal necesita condiciones reales para traducirse en oportunidades cotidianas.', type: 'ilustracion' },
    { src: asset('rompiendo_estereotipos.png'), title: 'Imaginar oportunidades compartidas', alt: 'Ilustración de cinco personas conversando alrededor de una mesa con un mapa y documentos.', context: 'No identifica personas ni culturas reales.', description: 'Las imágenes de colaboración permiten preguntar quiénes pueden participar sin asignar capacidades por género.', type: 'ilustracion' },
  ],
  violencia: [
    { src: asset('1999_memoria_historica.jpg'), title: 'Visitar una exposición de memoria', alt: 'Visitante de espaldas observa tiras de fotografías históricas expuestas en una pared.', context: 'No se ha verificado su relación con el informe de la CEH.', description: 'Consultar archivos y exposiciones puede abrir preguntas sobre los hechos del pasado y sus fuentes.', type: 'fotografia' },
    { src: asset('1996_firma_de_paz.jpg'), title: 'Una ceremonia de firma', alt: 'Personas con traje firman documentos sobre una mesa mientras otras observan ante varias banderas.', context: 'Fecha, evento y personas fotografiadas sin confirmar; no se presenta como registro de los Acuerdos de Paz.', description: 'Una firma puede marcar un compromiso político; conocer sus resultados requiere fuentes adicionales.', type: 'fotografia' },
    { src: asset('2016_justicia_y_reparacion.jpg'), title: 'Símbolos de justicia', alt: 'Balanza, mazo, libro y gafas en una composición de estudio.', context: 'No documenta la sentencia de Sepur Zarco de 2016.', description: 'La justicia y la reparación deben abordarse desde hechos y decisiones documentadas, no desde una imagen genérica.', type: 'ilustracion' },
    { src: asset('decisiones_que_protegen.jpg.webp'), title: 'Un gesto de acompañamiento', alt: 'Dos mujeres se abrazan en un encuentro mientras otras personas observan.', context: 'No se atribuyen experiencias de violencia a las personas fotografiadas.', description: 'Escuchar sin juzgar y respetar la autonomía puede formar parte del apoyo responsable.', type: 'fotografia' },
  ],
  desigualdad: [
    { src: asset('educacion.jpg'), title: 'Aprender en comunidad', alt: 'Docente de pie frente a estudiantes sentados en mesas dentro de un aula.', context: 'Centro, lugar y fecha sin verificar.', description: 'Acceder a educación requiere algo más que una oportunidad escrita: también importan las condiciones de aprendizaje.', type: 'fotografia' },
    { src: asset('trabajo_y_oportunidades.jpg'), title: 'Imágenes de trabajo y recursos', alt: 'Montaje gráfico de personas con ocupaciones distintas ante billetes guatemaltecos.', context: 'No describe empleos reales ni estadísticas económicas.', description: 'Un montaje no mide oportunidades laborales; las barreras deben estudiarse con información documentada.', type: 'montaje' },
    { src: asset('tecnologia_y_recursos.jpg'), title: 'Acceso a tecnología', alt: 'Varias personas observan equipos de robótica y computadoras en un taller.', context: 'Participantes, institución y lugar sin verificar.', description: 'Contar con herramientas y formación puede ampliar las posibilidades de aprender y participar.', type: 'fotografia' },
    { src: asset('desigualdad_de_genero.jpg'), title: 'Trabajo en la tierra', alt: 'Varias mujeres trabajan la tierra con herramientas manuales en una zona rural.', context: 'No se atribuye identidad étnica ni situación económica a las personas.', description: 'Reconocer el trabajo realizado por mujeres también exige preguntar por el acceso a recursos y decisiones.', type: 'fotografia' },
    { src: asset('participacion_y_representacion.png'), title: 'Participación en el espacio público', alt: 'Multitud con banderas guatemaltecas y carteles durante una concentración.', context: 'Motivo, participantes y fecha sin verificar.', description: 'Participar en espacios públicos no garantiza por sí solo acceso igualitario a los lugares de decisión.', type: 'fotografia' },
  ],
  multiculturalidad: [
    { src: asset('pueblos_de_guatemala.jpg'), title: 'Una ciudad para encontrarse', alt: 'Calle empedrada con fachadas de colores, un arco y un volcán al fondo.', context: 'La localidad exacta de la imagen no se ha verificado.', description: 'Las identidades culturales no quedan definidas por una sola ciudad o por una imagen turística.', type: 'fotografia' },
    { src: asset('pueblo_maya.jpeg'), title: 'Una reunión comunitaria', alt: 'Personas reunidas al aire libre alrededor de una actividad con hojas y objetos de colores.', context: 'Pueblo, ceremonia, lugar y fecha sin verificar; no define la identidad de las personas.', description: 'El mapa cultural utiliza iniciativas locales documentadas; esta foto no acredita el festival de murales K’iche’.', type: 'fotografia', puzzleId: 'maya' },
    { src: asset('pueblo_garifuna.jpg'), title: 'Música compartida', alt: 'Grupo de personas toca instrumentos, canta y baila en un espacio abierto.', context: 'Participantes, celebración y lugar sin verificar; no se atribuye una tradición concreta.', description: 'El diálogo con comunidades y fuentes directas permite aprender sobre expresiones musicales sin adjudicar esta escena a un pueblo.', type: 'fotografia', puzzleId: 'garifuna' },
    { src: asset('pueblo_xinka.jpeg'), title: 'Encuentro cultural', alt: 'Grupo de personas con vestimentas de colores durante una reunión al aire libre.', context: 'Participantes, lugar y actividad sin verificar; no se infiere pertenencia por la vestimenta.', description: 'El taller de idioma Xinka documentado en el mapa no se identifica con esta fotografía.', type: 'fotografia', puzzleId: 'xinka' },
    { src: asset('pueblo_ladino.jpg'), title: 'Personas reunidas', alt: 'Grupo de personas posa para una fotografía en un salón.', context: 'La identidad cultural de las personas y el motivo de la reunión no se han verificado.', description: 'Una fotografía de grupo no permite deducir cómo se identifica cada persona.', type: 'fotografia', puzzleId: 'ladino' },
  ],
  'derechos-humanos': [
    { src: asset('caminos_hacia_la_paz.jpg'), title: 'Un paisaje para imaginar el camino', alt: 'Persona de espaldas con una bandera de Guatemala ante un paisaje montañoso.', context: 'Lugar, persona y fecha sin verificar.', description: 'La paz requiere acciones sostenidas y no se reduce a un paisaje o una bandera.', type: 'fotografia' },
    { src: asset('dignidad_e_igualdad.jpg'), title: 'Dignidad y vínculos', alt: 'Figuras de papel tomadas de las manos proyectan sombras alargadas sobre una mesa.', context: 'No representa un hecho histórico.', description: 'La dignidad y la igualdad son principios para todas las personas, no atributos de un grupo.', type: 'fotografia' },
    { src: asset('justicia_y_reparación.jpg'), title: 'Justicia como símbolo', alt: 'Escultura de una figura con balanza y espada ante un edificio iluminado por el sol.', context: 'Monumento y lugar sin verificar; no corresponde a un caso judicial específico.', description: 'Una balanza simboliza justicia, pero las decisiones y reparaciones se conocen en fuentes documentadas.', type: 'fotografia' },
    { src: asset('participación_y_derechos_ciudadanos.jpg'), title: 'Participación ciudadana', alt: 'Personas reunidas junto a una gran bandera de Guatemala en una plaza.', context: 'Evento, participantes y fecha sin verificar.', description: 'El derecho a participar incluye poder intervenir en asuntos que afectan a la comunidad.', type: 'fotografia' },
    { src: asset('cultura_de_paz.jpg'), title: 'Una imagen de paz', alt: 'Dibujo de una paloma blanca con una rama junto a un globo terráqueo y una cinta.', context: 'No representa un acontecimiento de Guatemala.', description: 'La cultura de paz se construye con dignidad, derechos y participación, además de símbolos.', type: 'ilustracion' },
    { src: asset('la_cultura_de_paz.jpg'), title: 'Un símbolo de esperanza', alt: 'Escultura de dos manos levantadas y una figura de ave bajo el cielo.', context: 'Lugar y autoría de la escultura sin verificar.', description: 'Una imagen de esperanza invita a pensar qué acciones pueden proteger los derechos en la práctica.', type: 'fotografia' },
    { src: asset('identidad_cultural.jpg'), title: 'Memoria y expresión', alt: 'Una mujer coloca flores cerca de una escultura de manos ante otras personas.', context: 'Actividad y participantes sin identificar; no se vincula a un pueblo o caso determinado.', description: 'La memoria y la participación de las comunidades requieren escuchar a quienes las viven, sin atribuirles una historia no confirmada.', type: 'fotografia' },
  ],
}
