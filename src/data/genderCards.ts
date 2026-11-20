export type Classification = 'stereotype' | 'equality'

export type GenderCard = {
  id: string
  context: string
  text: string
  category: Classification
  explanation: string
}

// Afirmaciones ficticias para reflexionar; no son citas de personas reales.
export const genderCards: GenderCard[] = [
  {
    id: 'engineering', context: 'Profesiones', text: 'La ingeniería es únicamente para hombres.', category: 'stereotype',
    explanation: 'Asociar una profesión con un solo género limita las posibilidades de elegir, formarse y trabajar.',
  },
  {
    id: 'science', context: 'Aprendizaje', text: 'Hombres y mujeres pueden desarrollar habilidades científicas.', category: 'equality',
    explanation: 'Las habilidades se desarrollan con oportunidades, práctica y apoyo; no están definidas por el género.',
  },
  {
    id: 'care', context: 'Cuidado', text: 'El cuidado de los hijos corresponde exclusivamente a las mujeres.', category: 'stereotype',
    explanation: 'El cuidado no es una capacidad exclusiva de las mujeres: las responsabilidades pueden compartirse.',
  },
  {
    id: 'home', context: 'Familia', text: 'Las responsabilidades familiares pueden compartirse.', category: 'equality',
    explanation: 'Compartir tareas y cuidados reconoce la responsabilidad y la participación de todas las personas del hogar.',
  },
  {
    id: 'leaders', context: 'Liderazgo', text: 'Las mujeres no deberían ocupar puestos de liderazgo.', category: 'stereotype',
    explanation: 'La capacidad para liderar no depende del género. Esta idea excluye voces de espacios de decisión.',
  },
  {
    id: 'community', context: 'Comunidad', text: 'Todas las personas pueden participar en decisiones comunitarias.', category: 'equality',
    explanation: 'La participación de distintas voces enriquece las decisiones que afectan a una comunidad.',
  },
  {
    id: 'emotions', context: 'Emociones', text: 'Los hombres no deben expresar sus emociones.', category: 'stereotype',
    explanation: 'Expresar emociones y buscar apoyo son posibilidades humanas, no privilegios de un género.',
  },
  {
    id: 'work', context: 'Oportunidades', text: 'Las capacidades profesionales no dependen del género.', category: 'equality',
    explanation: 'Las oportunidades de formación y empleo deben basarse en capacidades e intereses, sin prejuicios de género.',
  },
  {
    id: 'school', context: 'Educación', text: 'En una escuela, las niñas deberían evitar los talleres de tecnología.', category: 'stereotype',
    explanation: 'Restringir actividades por género puede cerrar caminos de aprendizaje y futuras oportunidades.',
  },
  {
    id: 'choices', context: 'Proyecto de vida', text: 'Cada estudiante puede explorar la carrera que le interese.', category: 'equality',
    explanation: 'Animar a cada persona a explorar sus intereses amplía sus opciones, en lugar de asignarle un destino por género.',
  },
]
