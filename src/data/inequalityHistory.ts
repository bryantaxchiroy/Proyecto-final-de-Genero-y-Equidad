import type { HistoricalMoment, HistoricalSource } from './historicalTypes'

export const inequalitySources: HistoricalSource[] = [
  {
    id: 'identidad', author: 'Acuerdo de paz · texto íntegro', title: 'Acuerdo sobre Identidad y Derechos de los Pueblos Indígenas (1995)',
    url: 'https://es.wikisource.org/wiki/Acuerdo_sobre_Identidad_y_Derechos_de_los_Pueblos_Ind%C3%ADgenas',
    note: 'Texto del acuerdo reproducido en Wikisource; capítulos III.G (reforma educativa) y IV.F (tierra y recursos).',
  },
  {
    id: 'socioeconomico', author: 'Acuerdo de paz · texto íntegro', title: 'Acuerdo sobre aspectos socioeconómicos y situación agraria (1996)',
    url: 'https://es.wikisource.org/wiki/Acuerdo_sobre_aspectos_socioecon%C3%B3micos_y_situaci%C3%B3n_agraria',
    note: 'Texto del acuerdo reproducido en Wikisource; apartados I.B (participación de la mujer) y II.A (educación).',
  },
  {
    id: 'participacion', author: 'Naciones Unidas en Guatemala', title: 'Importancia de la participación política de las mujeres y de los pueblos indígenas',
    url: 'https://guatemala.un.org/es/86876-importancia-de-la-participaci%C3%B3n-pol%C3%ADtica-de-las-mujeres-y-de-los-pueblos-ind%C3%ADgenas-en-los',
    note: 'Intervención de la Coordinación Residente de la ONU en Guatemala, 9 de agosto de 2020.',
  },
  {
    id: 'brechas', author: 'Naciones Unidas en Guatemala', title: 'Digitalicemos la igualdad (2023)',
    url: 'https://guatemala.un.org/es/221747-%E2%80%9Cdigitalicemos-la-igualdad%E2%80%9D',
    note: 'Comunicado del 4 de marzo de 2023 sobre brechas educativas, digitales, laborales y políticas en Guatemala.',
  },
]

export const inequalityMoments: HistoricalMoment[] = [
  {
    year: '1995', label: 'Educación y tierra', title: 'Compromisos para abrir caminos',
    fact: 'El Acuerdo sobre Identidad y Derechos de los Pueblos Indígenas propuso ampliar la educación bilingüe, fortalecer becas y corregir materiales con estereotipos culturales y de género. También incluyó eliminar la discriminación de hecho o legal contra la mujer en el acceso a tierra, vivienda y créditos.',
    interpretation: 'Los compromisos permiten identificar barreras que se reconocían entonces; el texto del acuerdo no demuestra por sí mismo que esas medidas se hayan cumplido.',
    question: '¿Qué barreras aparecen cuando se cruzan idioma, género y acceso a recursos?', sourceIds: ['identidad'], symbol: 'school',
  },
  {
    year: '1996', label: 'Trabajo y participación', title: 'La igualdad entra en los acuerdos',
    fact: 'El Acuerdo sobre aspectos socioeconómicos y situación agraria reconoció la contribución de las mujeres y comprometió al Gobierno a promover igualdad en educación, capacitación, trabajo, participación y acceso a crédito, tierras y recursos productivos.',
    interpretation: 'La paz también planteó cambios sociales y económicos. Reconocer una desigualdad en un acuerdo es un punto de partida, no prueba de que haya desaparecido.',
    question: '¿Qué apoyos hacen posible convertir un derecho en una oportunidad real?', sourceIds: ['socioeconomico'], symbol: 'work',
  },
  {
    year: '2020', label: 'Voces en decisiones', title: 'Participar para transformar',
    fact: 'En una intervención de 2020, Naciones Unidas en Guatemala destacó la importancia de la participación política de mujeres y pueblos indígenas y describió iniciativas de apoyo a la educación, al acceso a la justicia y a la participación política.',
    interpretation: 'La participación no es solo estar presente: implica poder intervenir en las decisiones que afectan a la propia comunidad.',
    question: '¿Quiénes participan cuando se decide cómo distribuir los recursos?', sourceIds: ['participacion'], symbol: 'community',
  },
  {
    year: '2023', label: 'Brechas actuales', title: 'Las oportunidades siguen siendo desiguales',
    fact: 'Naciones Unidas en Guatemala señaló en 2023 brechas de acceso al empleo digno, representación política, educación y tecnología para las mujeres y niñas; también advirtió obstáculos adicionales vinculados con residencia, pertenencia étnica y discapacidad.',
    interpretation: 'Las barreras pueden acumularse. Invertir en formación, conectividad, participación y trabajo digno requiere escuchar a las personas afectadas y sostener las acciones en el tiempo.',
    question: '¿Qué iniciativa abriría más oportunidades en una comunidad concreta?', sourceIds: ['brechas'], symbol: 'technology',
  },
]
