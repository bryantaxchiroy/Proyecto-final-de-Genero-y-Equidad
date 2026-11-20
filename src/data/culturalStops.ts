export type CulturalSource = { id: string; author: string; title: string; url: string; note: string }
export type CulturalStop = {
  id: 'maya' | 'garifuna' | 'xinka' | 'ladino'
  people: string
  focus: string
  place: string
  department: string
  latitude: number
  longitude: number
  coordinateSource: string
  localContext: string
  history: string
  identityLanguage: string
  expression: string
  rights: string
  reading: string
  question: string
  sourceIds: string[]
}

export const culturalSources: CulturalSource[] = [
  { id: 'agreement', author: 'Acuerdos de Paz (1995)', title: 'Acuerdo sobre Identidad y Derechos de los Pueblos Indígenas', url: 'https://es.wikisource.org/wiki/Acuerdo_sobre_Identidad_y_Derechos_de_los_Pueblos_Ind%C3%ADgenas', note: 'Texto del acuerdo; identidad, idiomas, derechos culturales y lucha contra la discriminación. Sus compromisos no implican cumplimiento automático.' },
  { id: 'maya-local', author: 'Ministerio de Cultura y Deportes', title: 'Festival de murales de identidad cultural K’iche’ en Santa Cruz del Quiché', url: 'https://noticias.mcd.gob.gt/2026/10/16/santa-cruz-del-quiche-promueve-la-cultura-maya-kiche-con-murales/', note: 'Actividad cultural realizada en Santa Cruz del Quiché en octubre de 2026.' },
  { id: 'garifuna-local', author: 'Ministerio de Cultura y Deportes', title: 'Encuentro con representantes de la cultura garífuna en Livingston', url: 'https://noticias.mcd.gob.gt/2026/08/20/fomento-de-las-artes-fortalece-acercamiento-con-representantes-de-la-cultura-garifuna-en-livingston/', note: 'Encuentro en Livingston, Izabal, sobre idioma y expresiones artísticas, agosto de 2026.' },
  { id: 'xinka-local', author: 'Ministerio de Cultura y Deportes', title: 'Taller de idioma Xinka en Pueblo Nuevo Viñas', url: 'https://noticias.mcd.gob.gt/2026/01/28/taller-de-idioma-xinka-fortalece-la-identidad-cultural-en-santa-rosa/', note: 'Taller de aprendizaje del idioma Xinka en Pueblo Nuevo Viñas, Santa Rosa, enero de 2026.' },
  { id: 'ladino-local', author: 'Ministerio de Cultura y Deportes', title: 'Taller sobre los cuatro pueblos en Melchor de Mencos', url: 'https://noticias.mcd.gob.gt/2026/07/06/taller-de-elaboracion-de-munecos-representativos-de-los-cuatro-pueblos-de-guatemala/', note: 'Actividad educativa sobre los pueblos Maya, Garífuna, Xinka y Ladino en Melchor de Mencos, julio de 2026.' },
  { id: 'ine', author: 'Instituto Nacional de Estadística', title: 'Censo 2018: pueblo de pertenencia', url: 'https://redatam2018.ine.gob.gt/bingtm/RpWebStats.exe/Qts?BASE=CPVGT2018&ITEM=INDGENPER5&lang=ESP', note: 'Consulta oficial de pueblo de pertenencia; no se usan cifras del censo en este mapa.' },
]

// Puntos de referencia para actividades documentadas; NO son áreas de
// distribución cultural. Las coordenadas son de localidades en Wikidata P625.
export const culturalStops: CulturalStop[] = [
  {
    id: 'maya', people: 'Pueblo Maya', focus: 'Una mirada K’iche’', place: 'Santa Cruz del Quiché', department: 'Quiché', latitude: 15.05, longitude: -91.25, coordinateSource: 'https://www.wikidata.org/wiki/Q693140',
    localContext: 'En Santa Cruz del Quiché, creadores locales participaron en un festival de murales sobre la identidad cultural K’iche’. Esta parada muestra una expresión maya, no representa a todas las comunidades mayas.',
    history: 'El Acuerdo de 1995 reconoció la identidad del pueblo Maya y sus diversas expresiones socioculturales, entre ellas la K’iche’.',
    identityLanguage: 'El Acuerdo menciona idiomas de raíz maya común y enumera el K’iche’ entre muchas expresiones lingüísticas; no existe un único idioma maya.',
    expression: 'El festival de murales de Santa Cruz del Quiché reunió a artistas locales para compartir conocimientos, memoria e identidad K’iche’ mediante arte público.',
    rights: 'El Acuerdo de 1995 propuso promover los idiomas indígenas y una educación bilingüe e intercultural, junto con medidas contra la discriminación.',
    reading: 'Un punto del mapa ayuda a conocer una iniciativa concreta; ninguna localidad puede hablar en nombre de todas las comunidades de un pueblo.',
    question: '¿Cómo podemos aprender sobre una comunidad sin reducir toda su diversidad a una sola expresión?', sourceIds: ['agreement', 'maya-local'],
  },
  {
    id: 'garifuna', people: 'Pueblo Garífuna', focus: 'Memoria y expresiones vivas', place: 'Livingston', department: 'Izabal', latitude: 15.83, longitude: -88.75, coordinateSource: 'https://www.wikidata.org/wiki/Q1192713',
    localContext: 'En Livingston, el Ministerio de Cultura documentó un encuentro con representantes de la cultura garífuna. El punto señala ese encuentro, no delimita dónde viven las personas garífunas.',
    history: 'El Acuerdo de Identidad y Derechos de 1995 reconoció la identidad del pueblo Garífuna como parte de la diversidad de Guatemala.',
    identityLanguage: 'El Ministerio de Cultura describe en Livingston un espacio dedicado a la promoción del idioma garífuna y de prácticas culturales.',
    expression: 'En el encuentro se abordaron historia, música, canto y danza como vías de memoria colectiva y transmisión de conocimientos.',
    rights: 'El Acuerdo de 1995 reconoce derechos culturales de los pueblos indígenas y compromisos para superar la discriminación; reconocerlos no equivale a afirmar que ya se cumplieron.',
    reading: 'La cultura es una práctica viva y diversa. Escuchar a sus propias comunidades es más respetuoso que asignarles una imagen única.',
    question: '¿Qué cambia cuando las comunidades participan en cómo se presenta su propia cultura?', sourceIds: ['agreement', 'garifuna-local'],
  },
  {
    id: 'xinka', people: 'Pueblo Xinka', focus: 'La lengua como vínculo', place: 'Pueblo Nuevo Viñas', department: 'Santa Rosa', latitude: 14.23333333, longitude: -90.46666667, coordinateSource: 'https://www.wikidata.org/wiki/Q2402134',
    localContext: 'En Pueblo Nuevo Viñas se realizó un taller de idioma Xinka con actividades participativas. El punto representa esa actividad concreta, no un límite del pueblo Xinka.',
    history: 'El Acuerdo de 1995 reconoció la identidad del pueblo Xinka y propuso medidas para combatir la discriminación contra los pueblos indígenas.',
    identityLanguage: 'El Ministerio de Cultura presenta la enseñanza y el aprendizaje del idioma Xinka como parte de iniciativas de fortalecimiento cultural en Santa Rosa.',
    expression: 'En el taller de Pueblo Nuevo Viñas se utilizaron juegos de lotería, memorias y rompecabezas para practicar vocabulario Xinka.',
    rights: 'El Acuerdo de 1995 propone respetar y promover los idiomas indígenas y ampliar su uso en educación y servicios comunitarios.',
    reading: 'Una lengua forma parte de la identidad cultural, pero no debe usarse para negar la pertenencia de quien está aprendiendo o recuperándola.',
    question: '¿Cómo se puede apoyar el aprendizaje de una lengua sin exigir que todas las personas vivan su identidad igual?', sourceIds: ['agreement', 'xinka-local'],
  },
  {
    id: 'ladino', people: 'Pueblo Ladino', focus: 'Identidad sin etiquetas únicas', place: 'Melchor de Mencos', department: 'Petén', latitude: 17.06666667, longitude: -89.15, coordinateSource: 'https://www.wikidata.org/wiki/Q599455',
    localContext: 'En Melchor de Mencos, un taller del Ministerio de Cultura presentó los cuatro pueblos de Guatemala, incluido el Ladino. Esta parada señala el taller, no atribuye a Petén una identidad exclusiva.',
    history: 'El Acuerdo de 1995 se ocupa del reconocimiento de los pueblos indígenas Maya, Garífuna y Xinka. El Ministerio de Cultura incluye al pueblo Ladino en una actividad educativa sobre los cuatro pueblos de Guatemala.',
    identityLanguage: 'Esta ficha no asigna un idioma único como requisito para pertenecer al pueblo Ladino: el idioma que alguien habla no determina por sí solo su identidad.',
    expression: 'El taller de Melchor de Mencos invitó a jóvenes a explorar relatos, costumbres e indumentaria de los cuatro pueblos; no se presenta una prenda como rasgo universal del pueblo Ladino.',
    rights: 'Distinguir los compromisos específicos con pueblos indígenas del respeto debido a todas las personas evita borrar las diferencias y favorece la convivencia sin discriminación.',
    reading: 'Ninguna identidad puede deducirse de una apariencia o de vivir en una ciudad determinada. Es importante escuchar cómo se identifica cada persona.',
    question: '¿Por qué es importante preguntar y escuchar en lugar de atribuir una identidad desde fuera?', sourceIds: ['agreement', 'ladino-local', 'ine'],
  },
]
