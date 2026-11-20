import type { HistoricalMoment, HistoricalSource } from './historicalTypes'

export const genderSources: HistoricalSource[] = [
  {
    id: 'asies', author: 'ASIES / Siglo 21', title: 'Breve historia del sufragio guatemalteco',
    url: 'https://asies.org.gt/inicialmente-el-proceso-electoral-era-muy-excluyente/',
    note: 'Reportaje histórico reproducido por la Asociación de Investigación y Estudios Sociales; apartados «Vientos revolucionarios» y «El voto universal: 1965».',
  },
  {
    id: 'constitucion1945', author: 'Asamblea Constituyente · Archivo Jurídico UNAM', title: 'Constitución de la República de Guatemala (1945)',
    url: 'https://archivos.juridicas.unam.mx/www/bjv/libros/5/2210/24.pdf',
    note: 'Texto constitucional histórico digitalizado; artículo 9. Archivo en PDF.',
  },
  {
    id: 'constitucion1985', author: 'Asamblea Nacional Constituyente · Justia Guatemala', title: 'Constitución Política de la República de Guatemala (1985)',
    url: 'https://guatemala.justia.com/nacionales/constitucion-de-la-republica-de-guatemala/gdoc/',
    note: 'Texto constitucional; artículo 4 sobre libertad e igualdad y artículo 136 sobre derechos y deberes políticos.',
  },
]

export const genderMoments: HistoricalMoment[] = [
  {
    year: '1944', label: 'Voces organizadas', title: 'Las mujeres impulsan el debate',
    fact: 'Durante 1944, mujeres guatemaltecas organizaron la Unión Femenina Guatemalteca Pro Ciudadanía de la Mujer para promover el reconocimiento del voto femenino.',
    interpretation: 'Este hito muestra que la ampliación de derechos también fue resultado de organización y participación social.',
    question: '¿Por qué importa reconocer a quienes impulsaron estos cambios?', sourceIds: ['asies'], symbol: 'voices',
  },
  {
    year: '1945', label: 'Un derecho limitado', title: 'El voto no llegó a todas',
    fact: 'El artículo 9 de la Constitución de 1945 reconoció como ciudadanas a las mujeres guatemaltecas mayores de 18 años que sabían leer y escribir. Su sufragio era optativo y secreto; las mujeres no alfabetizadas quedaron fuera de ese reconocimiento.',
    interpretation: 'Un avance legal puede coexistir con exclusiones: el requisito de alfabetización restringía quiénes podían participar.',
    question: '¿Qué cambia cuando un derecho depende de saber leer y escribir?', sourceIds: ['asies', 'constitucion1945'], symbol: 'ballot',
  },
  {
    year: '1965', label: 'Más ciudadanía', title: 'Se amplía el sufragio',
    fact: 'La Constitución decretada en 1965 reconoció como ciudadanos con derecho a elegir y ser electos a los guatemaltecos hombres y mujeres mayores de 18 años, sin el requisito de alfabetización para las mujeres.',
    interpretation: 'La ampliación del derecho formal al voto no significa, por sí sola, que todas las personas pudieran ejercerlo en iguales condiciones.',
    question: 'Además de una ley, ¿qué condiciones hacen posible participar?', sourceIds: ['asies'], symbol: 'open',
  },
  {
    year: '1985', label: 'Igualdad ante la ley', title: 'La igualdad como principio',
    fact: 'La Constitución Política promulgada en 1985 establece en su artículo 4 que el hombre y la mujer tienen iguales oportunidades y responsabilidades, cualquiera que sea su estado civil.',
    interpretation: 'El reconocimiento jurídico ofrece una base para exigir igualdad; llevar ese principio a la vida cotidiana requiere acciones continuas.',
    question: '¿Qué estereotipo actual contradice esa igualdad de oportunidades?', sourceIds: ['constitucion1985'], symbol: 'equal',
  },
]
