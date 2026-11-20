import type { PeaceDoor } from './peaceDoors'

export type ChallengeId = PeaceDoor['id']
export type RightsChallenge = {
  id: ChallengeId
  zone: string
  title: string
  instruction: string
  learning: string
  token: string
  icon: 'bridge' | 'network' | 'balance' | 'plaza' | 'path'
}

// Relaciona los mecanismos simbólicos con los contenidos documentados en
// peaceDoors.ts. Ninguna secuencia modela un procedimiento jurídico real.
export const rightsChallenges: RightsChallenge[] = [
  { id: 'dignidad', zone: 'El puente de la igualdad', title: 'Conecta el puente', instruction: 'Une cada idea con una forma de vivirla. El plano propone tres conexiones educativas para sostener el puente.', learning: 'Dignidad, igualdad y no discriminación se refuerzan mutuamente; reconocerlas requiere acciones cotidianas e institucionales.', token: 'Dignidad e igualdad', icon: 'bridge' },
  { id: 'identidad', zone: 'Las voces del territorio', title: 'Enciende una red de derechos', instruction: 'Selecciona dos nodos para activar cada vínculo sugerido. Esta red de conceptos no es un mapa de pueblos ni de territorios.', learning: 'Escuchar las identidades y los idiomas de las comunidades forma parte de reconocer sus derechos culturales y participación.', token: 'Respeto a la diversidad', icon: 'network' },
  { id: 'justicia', zone: 'La balanza de la justicia', title: 'Construye una secuencia simbólica', instruction: 'Selecciona las etapas en el orden pedagógico propuesto. No es un procedimiento judicial obligatorio ni garantiza resultados reales.', learning: 'Documentar hechos, acceder a justicia, reparar y trabajar para que no se repitan las violaciones son tareas distintas y sostenidas.', token: 'Justicia y reparación', icon: 'balance' },
  { id: 'participacion', zone: 'La plaza de la participación', title: 'Abre espacios para todas las voces', instruction: 'Conecta cada actor con diálogo y toma de decisiones. Un espacio compartido no pertenece a un único grupo.', learning: 'Participar necesita espacios donde distintas voces puedan dialogar e incidir; excluir una voz limita la representación.', token: 'Participación inclusiva', icon: 'plaza' },
  { id: 'paz', zone: 'El sendero de la paz', title: 'Ilumina el camino común', instruction: 'Activa los cuatro principios reunidos en las etapas anteriores. Cuando estén presentes, abre el sendero hacia la paz.', learning: 'Una cultura de paz exige dignidad, diversidad, justicia y participación, además de compromisos y acciones continuas.', token: 'Cultura de paz', icon: 'path' },
]

export const bridgeLinks = [
  { from: 'dignidad', to: 'reconocimiento', fromLabel: 'Dignidad', toLabel: 'Reconocer a todas las personas' },
  { from: 'igualdad', to: 'oportunidades', fromLabel: 'Igualdad', toLabel: 'Abrir oportunidades' },
  { from: 'no-discriminacion', to: 'sin-exclusion', fromLabel: 'No discriminación', toLabel: 'Evitar exclusiones' },
] as const

export const voiceNodes = [
  { id: 'identidad', label: 'Identidad' }, { id: 'idiomas', label: 'Idiomas' },
  { id: 'derechos', label: 'Derechos culturales' }, { id: 'participacion', label: 'Participación' },
] as const

export const voiceLinks = [
  { a: 'identidad', b: 'idiomas' }, { a: 'idiomas', b: 'derechos' },
  { a: 'derechos', b: 'participacion' }, { a: 'participacion', b: 'identidad' },
] as const

export const justiceSteps = [
  { id: 'hechos', label: 'Reconocer los hechos' }, { id: 'acceso', label: 'Acceso a la justicia' },
  { id: 'reparacion', label: 'Reparación' }, { id: 'no-repeticion', label: 'No repetición' },
] as const

export const plazaActors = [
  { id: 'estudiantes', label: 'Estudiantes' }, { id: 'mujeres', label: 'Organizaciones de mujeres' },
  { id: 'comunidades', label: 'Comunidades culturales' }, { id: 'instituciones', label: 'Instituciones' },
] as const

export const plazaSpaces = [
  { id: 'dialogo', label: 'Espacio de diálogo' }, { id: 'decisiones', label: 'Toma de decisiones' },
] as const

export const peaceTokens = rightsChallenges.slice(0, 4).map(challenge => ({ id: challenge.id, label: challenge.token }))
