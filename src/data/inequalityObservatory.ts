export type ObservatoryLens = {
  year: string
  headline: string
  detail: string
}

export type ObservatoryCategory = {
  id: 'educacion' | 'trabajo' | 'participacion' | 'recursos'
  name: string
  tag: string
  summary: string
  commitment: ObservatoryLens
  observation: ObservatoryLens
  evidenceYears: string[]
  interpretation: string
  question: string
}

// Comparaciones cualitativas de fuentes existentes: no son datos medidos ni
// muestran si los compromisos de los Acuerdos de Paz llegaron a cumplirse.
export const inequalityCategories: ObservatoryCategory[] = [
  {
    id: 'educacion', name: 'Educación', tag: 'Aprender',
    summary: 'Una oportunidad educativa también depende del idioma, el territorio y el acceso a apoyos.',
    commitment: { year: '1995', headline: 'Educación bilingüe y becas', detail: 'El Acuerdo sobre Identidad y Derechos de los Pueblos Indígenas propuso ampliar la educación bilingüe, fortalecer becas y revisar materiales con estereotipos.' },
    observation: { year: '2023', headline: 'Brechas en el acceso educativo', detail: 'Naciones Unidas en Guatemala señaló barreras relacionadas con residencia, pertenencia étnica, discapacidad y acceso a tecnología.' },
    evidenceYears: ['1995', '2023'],
    interpretation: 'Una medida propuesta no equivale a un resultado alcanzado. Comparar ambos textos permite pensar qué apoyos deben mantenerse para aprender en igualdad.',
    question: '¿Qué cambiaría en una escuela si todas las personas pudieran aprender en condiciones adecuadas a su idioma y contexto?',
  },
  {
    id: 'trabajo', name: 'Trabajo y oportunidades económicas', tag: 'Construir',
    summary: 'El reconocimiento del trabajo de las mujeres se relaciona con formación, acceso a recursos y empleo digno.',
    commitment: { year: '1996', headline: 'Igualdad en trabajo y recursos', detail: 'El Acuerdo socioeconómico comprometió al Gobierno a promover capacitación, trabajo y acceso de las mujeres a crédito, tierras y recursos productivos.' },
    observation: { year: '2023', headline: 'Persisten barreras laborales', detail: 'Naciones Unidas en Guatemala advirtió que las mujeres seguían enfrentando brechas en empleo digno y remuneración igualitaria.' },
    evidenceYears: ['1996', '2023'],
    interpretation: 'La distancia entre una aspiración escrita y las barreras descritas después invita a examinar condiciones concretas, sin atribuir resultados no medidos a un acuerdo.',
    question: '¿Qué condiciones facilitarían oportunidades de trabajo digno en una comunidad?',
  },
  {
    id: 'participacion', name: 'Participación y representación', tag: 'Decidir',
    summary: 'Participar significa poder intervenir en las decisiones que afectan a la propia comunidad.',
    commitment: { year: '1996', headline: 'Espacios de decisión en igualdad', detail: 'El Acuerdo socioeconómico incluyó compromisos para garantizar la organización y participación de las mujeres en niveles de decisión.' },
    observation: { year: '2020', headline: 'La participación sigue en la agenda', detail: 'Naciones Unidas en Guatemala destacó la participación política de las mujeres y los pueblos indígenas y describió iniciativas de apoyo.' },
    evidenceYears: ['1996', '2020', '2023'],
    interpretation: 'La participación formal y la posibilidad real de influir no son lo mismo. Preguntar quién puede decidir ayuda a reconocer barreras aún presentes.',
    question: '¿Quiénes deberían tener voz cuando se decide sobre necesidades de una comunidad?',
  },
  {
    id: 'recursos', name: 'Tecnología y recursos', tag: 'Acceder',
    summary: 'Las oportunidades dependen tanto de recursos materiales como del acceso a herramientas para aprender y participar.',
    commitment: { year: '1995', headline: 'Tierra, vivienda y crédito', detail: 'El acuerdo de 1995 incluyó el compromiso de eliminar la discriminación contra las mujeres en el acceso a tierra, vivienda y créditos.' },
    observation: { year: '2023', headline: 'Conectividad y dispositivos', detail: 'Naciones Unidas en Guatemala describió obstáculos de acceso a internet y dispositivos para niñas y mujeres pobres, indígenas y rurales.' },
    evidenceYears: ['1995', '2023'],
    interpretation: 'Los recursos necesarios cambian con el tiempo. Comparar barreras distintas ayuda a pensar soluciones situadas sin convertir estos textos en estadísticas.',
    question: '¿Qué recursos se necesitan hoy para que más personas puedan estudiar, trabajar y participar?',
  },
]
