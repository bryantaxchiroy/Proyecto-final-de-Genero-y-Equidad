export type PeaceSource = { id: string; author: string; title: string; url: string; note: string }
export type PeaceEvidence = { kind: 'Declaración internacional' | 'Norma nacional' | 'Compromiso de paz' | 'Decisión judicial'; text: string; sourceIds: string[] }
export type PeaceDoor = {
  id: 'dignidad' | 'identidad' | 'justicia' | 'participacion' | 'paz'
  title: string
  short: string
  overview: string
  historical: string
  historicalSourceIds: string[]
  evidence: PeaceEvidence[]
  connection: string
  relatedStation: { label: string; path: string }
  question: string
}

export const peaceSources: PeaceSource[] = [
  { id: 'udhr', author: 'Naciones Unidas', title: 'Declaración Universal de Derechos Humanos (1948)', url: 'https://www.un.org/es/about-us/universal-declaration-of-human-rights', note: 'Preámbulo y artículos 1, 2, 8, 21 y 27. Declaración internacional, no ley guatemalteca.' },
  { id: 'constitution', author: 'Asamblea Nacional Constituyente · Justia Guatemala', title: 'Constitución Política de la República de Guatemala (1985)', url: 'https://guatemala.justia.com/nacionales/constitucion-de-la-republica-de-guatemala/gdoc/', note: 'Texto constitucional reproducido: artículos 4 (igualdad), 66 (grupos étnicos) y 136 (derechos y deberes políticos).' },
  { id: 'identity', author: 'Gobierno de Guatemala y URNG · texto del acuerdo', title: 'Acuerdo sobre Identidad y Derechos de los Pueblos Indígenas (1995)', url: 'https://es.wikisource.org/wiki/Acuerdo_sobre_Identidad_y_Derechos_de_los_Pueblos_Ind%C3%ADgenas', note: 'Acuerdo político del proceso de paz. El reconocimiento y sus compromisos no demuestran por sí solos su cumplimiento.' },
  { id: 'peace', author: 'UNESCO · Memoria del Mundo', title: 'Acuerdos de Paz de Guatemala, 1996', url: 'https://www.unesco.org/es/memory-world/lac/guatemala-peace-agreements-1996', note: 'Registro documental de la firma del Acuerdo de paz firme y duradera del 29 de diciembre de 1996.' },
  { id: 'ceh', author: 'Comisión para el Esclarecimiento Histórico · COPADEH', title: 'Guatemala: Memoria del Silencio', url: 'https://copadeh.gob.gt/guatemala-memoria-del-silencio/', note: 'Presentación del informe entregado al Estado en 1999 y sus recomendaciones de reparación.' },
  { id: 'sepur', author: 'ONU Mujeres', title: 'Resolución y medidas de reparación en el caso Sepur Zarco (2016)', url: 'https://www.unwomen.org/es/news/stories/2016/3/guatemala-victory-against-sexual-violence-in-armed-conflict', note: 'Documenta la condena y la decisión judicial de reparación; ordenar medidas no equivale a afirmar que todas se ejecutaron.' },
  { id: 'suffrage', author: 'ASIES / Siglo 21', title: 'Breve historia del sufragio guatemalteco', url: 'https://asies.org.gt/inicialmente-el-proceso-electoral-era-muy-excluyente/', note: 'Reportaje histórico sobre el reconocimiento limitado del voto femenino en 1945 y su ampliación en 1965.' },
]

export const peaceDoors: PeaceDoor[] = [
  {
    id: 'dignidad', title: 'Dignidad e igualdad', short: 'El punto de partida de todos los derechos.',
    overview: 'La dignidad no se concede por pertenecer a un grupo: es el punto de partida para reconocer derechos en igualdad.',
    historical: 'En 1985 se promulgó la Constitución Política de Guatemala. Su artículo 4 reconoce la igualdad en dignidad y derechos y establece iguales oportunidades y responsabilidades para hombres y mujeres.',
    historicalSourceIds: ['constitution'],
    evidence: [
      { kind: 'Declaración internacional', text: 'La Declaración Universal de 1948 proclama en sus artículos 1 y 2 la igualdad en dignidad y el disfrute de derechos sin distinción.', sourceIds: ['udhr'] },
      { kind: 'Norma nacional', text: 'El artículo 4 de la Constitución guatemalteca establece la igualdad en dignidad y derechos.', sourceIds: ['constitution'] },
    ],
    connection: 'La estación de Género mostró cómo reconocer derechos legalmente no elimina por sí solo los estereotipos ni las barreras para ejercerlos.',
    relatedStation: { label: 'Volver a Género', path: '/estacion/genero' },
    question: '¿Qué diferencia hay entre afirmar la igualdad y garantizar oportunidades para vivirla?',
  },
  {
    id: 'identidad', title: 'Identidad cultural y no discriminación', short: 'Respetar las voces y las lenguas.',
    overview: 'La identidad cultural y la lengua forman parte de la vida de las personas y comunidades; el respeto no requiere que todas sean iguales.',
    historical: 'El Acuerdo sobre Identidad y Derechos de los Pueblos Indígenas, firmado en 1995 durante el proceso de paz, reconoció a los pueblos Maya, Garífuna y Xinka y señaló la discriminación histórica que habían sufrido.',
    historicalSourceIds: ['identity'],
    evidence: [
      { kind: 'Norma nacional', text: 'El artículo 66 de la Constitución reconoce y promueve formas de vida, costumbres, organización social e idiomas de los grupos indígenas de Guatemala.', sourceIds: ['constitution'] },
      { kind: 'Compromiso de paz', text: 'El Acuerdo de 1995 propuso medidas para combatir la discriminación y promover los idiomas indígenas y su uso en la educación.', sourceIds: ['identity'] },
    ],
    connection: 'El mapa de Multiculturalidad mostró lugares concretos para conocer iniciativas culturales, sin convertirlos en fronteras exclusivas de ningún pueblo.',
    relatedStation: { label: 'Volver a Multiculturalidad', path: '/estacion/multiculturalidad' },
    question: '¿Cómo puede una institución respetar una identidad sin hablar en nombre de la comunidad?',
  },
  {
    id: 'justicia', title: 'Justicia y reparación', short: 'Reconocer el daño y sostener la búsqueda de justicia.',
    overview: 'La memoria y la justicia ayudan a reconocer violaciones de derechos; una reparación ordenada debe distinguirse de una reparación ya realizada.',
    historical: 'La Comisión para el Esclarecimiento Histórico entregó en 1999 Guatemala: Memoria del Silencio. En 2016 un tribunal guatemalteco condenó a exmilitares por crímenes cometidos contra mujeres q’eqchi’ en Sepur Zarco y ordenó medidas de reparación.',
    historicalSourceIds: ['ceh', 'sepur'],
    evidence: [
      { kind: 'Declaración internacional', text: 'El artículo 8 de la Declaración Universal reconoce el derecho a un recurso efectivo ante tribunales competentes.', sourceIds: ['udhr'] },
      { kind: 'Decisión judicial', text: 'La sentencia del caso Sepur Zarco dictó medidas de reparación para sobrevivientes y su comunidad; su emisión no acredita que todas se hayan cumplido.', sourceIds: ['sepur'] },
    ],
    connection: 'El Archivo de la Memoria de la estación de Violencia permite examinar hechos documentados sin responsabilizar a quienes los sufrieron.',
    relatedStation: { label: 'Volver a Violencia', path: '/estacion/violencia' },
    question: '¿Qué significa escuchar a las sobrevivientes y acompañar su búsqueda de justicia con respeto?',
  },
  {
    id: 'participacion', title: 'Participación y derechos ciudadanos', short: 'Tener voz en las decisiones compartidas.',
    overview: 'Participar incluye el derecho a intervenir en asuntos públicos y contar con condiciones reales para hacerlo.',
    historical: 'En Guatemala, la Constitución de 1945 reconoció el voto de mujeres alfabetas, pero excluyó a las no alfabetizadas; la de 1965 amplió formalmente el sufragio a hombres y mujeres mayores de edad.',
    historicalSourceIds: ['suffrage'],
    evidence: [
      { kind: 'Declaración internacional', text: 'El artículo 21 de la Declaración Universal reconoce el derecho a participar en el gobierno y a acceder en igualdad a las funciones públicas.', sourceIds: ['udhr'] },
      { kind: 'Norma nacional', text: 'La Constitución guatemalteca vigente enumera en su artículo 136 derechos y deberes políticos, entre ellos elegir y ser electo.', sourceIds: ['constitution'] },
    ],
    connection: 'Género y Desigualdad mostraron que ampliar un derecho formal no resuelve automáticamente las barreras de educación, recursos y representación.',
    relatedStation: { label: 'Volver a Desigualdad de género', path: '/estacion/desigualdad' },
    question: '¿Quiénes quedan fuera de las decisiones si participar exige recursos que no todas las personas tienen?',
  },
  {
    id: 'paz', title: 'Cultura de paz', short: 'Un compromiso que requiere acciones continuas.',
    overview: 'Una cultura de paz necesita memoria, diálogo, respeto a las diferencias y protección efectiva de los derechos.',
    historical: 'El Gobierno de Guatemala y la URNG firmaron el Acuerdo de paz firme y duradera el 29 de diciembre de 1996, poniendo fin formal al Conflicto Armado Interno. La CEH entregó su informe y recomendaciones en 1999.',
    historicalSourceIds: ['peace', 'ceh'],
    evidence: [
      { kind: 'Compromiso de paz', text: 'Los Acuerdos de Paz reunieron compromisos sociales, políticos y de derechos humanos; su firma no demuestra que todos se hayan cumplido.', sourceIds: ['peace', 'identity'] },
      { kind: 'Declaración internacional', text: 'El preámbulo de la Declaración Universal relaciona la paz con el reconocimiento de la dignidad y los derechos iguales de todas las personas.', sourceIds: ['udhr'] },
    ],
    connection: 'Las cinco estaciones unen estereotipos, violencia, barreras estructurales, diversidad cultural y derechos: ninguna acción aislada sustituye el trabajo colectivo e institucional.',
    relatedStation: { label: 'Ver las cinco estaciones', path: '/museo' },
    question: '¿Qué acción concreta, comunitaria o institucional ayudaría a sostener una convivencia más justa?',
  },
]
