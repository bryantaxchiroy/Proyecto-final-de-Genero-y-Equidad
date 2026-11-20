export type StationSlug = 'genero' | 'violencia' | 'desigualdad' | 'multiculturalidad' | 'derechos-humanos'
export type StationTheme = 'teal' | 'purple' | 'gold' | 'clay' | 'sky'

type StationBase = {
  slug: StationSlug
  number: string
  label: string
  title: string
  short: string
  description: string
  game: string
  mechanic: string
  theme: StationTheme
  question: string
  next?: StationSlug
}

export type Station = StationBase & (
  | { stage: 'open'; preview?: never }
  | { stage: 'preview'; preview: { historyTitle: string; historyFormat: string; historyDescription: string } }
)

export const stations: Station[] = [
  {
    slug: 'genero', number: '01', label: 'Género', title: 'Rompiendo estereotipos',
    short: 'Las ideas que heredamos también se pueden transformar.',
    description: 'Una invitación a observar cómo las expectativas sobre los roles de género pueden influir en las oportunidades de las personas.',
    game: 'Clasifica las ideas', mechanic: 'Tarjetas para distinguir estereotipos y afirmaciones que promueven la igualdad.',
    theme: 'teal', stage: 'open', question: '¿Quién nos dijo que ciertas posibilidades no eran para todas las personas?', next: 'violencia',
  },
  {
    slug: 'violencia', number: '02', label: 'Violencia', title: 'Decisiones que protegen',
    short: 'Reconocer es el primer paso para acompañar.',
    description: 'Un espacio de aprendizaje respetuoso para identificar formas de violencia y pensar en maneras seguras de brindar apoyo.',
    game: 'Decisiones que protegen', mechanic: 'Una historia ficticia de decisiones y respuestas de apoyo, sin penalizar a quienes viven violencia.',
    theme: 'purple', stage: 'open', question: '¿Cómo podemos escuchar, creer y acompañar sin juzgar?', next: 'desigualdad',
  },
  {
    slug: 'desigualdad', number: '03', label: 'Desigualdad de género', title: 'Construyendo oportunidades',
    short: 'El futuro cambia cuando abrimos más caminos.',
    description: 'Explora cómo las decisiones colectivas sobre recursos y acceso pueden abrir oportunidades en una comunidad ficticia.',
    game: 'Construyendo oportunidades', mechanic: 'Un simulador educativo de asignación de recursos, sin pretensión de predecir resultados reales.',
    theme: 'gold', stage: 'open', question: '¿Qué oportunidades se abren cuando invertimos en igualdad?', next: 'multiculturalidad',
  },
  {
    slug: 'multiculturalidad', number: '04', label: 'Identidad cultural y multiculturalidad', title: 'Voces de Guatemala',
    short: 'Una invitación a reconocer la diversidad que nos conecta.',
    description: 'Explora cuatro lugares de referencia para conocer expresiones culturales, idiomas y derechos sin convertir la identidad en una frontera.',
    game: 'Fragmentos de identidad', mechanic: 'Cuatro rompecabezas de actividades culturales contextualizadas con fichas educativas y fuentes.',
    theme: 'clay', stage: 'open', question: '¿Cómo podemos encontrarnos sin borrar nuestras diferencias?', next: 'derechos-humanos',
  },
  {
    slug: 'derechos-humanos', number: '05', label: 'Derechos humanos y cultura de paz', title: 'Tejiendo una cultura de paz',
    short: 'La paz se construye con derechos, memoria y diálogo.',
    description: 'Un recorrido por cinco puertas para conectar dignidad, identidad, justicia, participación y paz con la historia de Guatemala.',
    game: 'La ruta de los derechos', mechanic: 'Cinco mecanismos simbólicos conectan dignidad, identidad, justicia, participación y cultura de paz.',
    theme: 'sky', stage: 'open', question: '¿Qué podemos hacer para que la dignidad sea una realidad compartida?',
  },
]
