export type IndicatorKey = 'education' | 'economy' | 'safety' | 'participation' | 'technology'
export type IndicatorValues = Record<IndicatorKey, number>
export type InitiativeId = 'scholarships' | 'transport' | 'training' | 'technology' | 'prevention' | 'leadership'
export type Initiative = {
  id: InitiativeId
  name: string
  description: string
  cost: number
  effects: IndicatorValues
  benefit: string
  limitation: string
}
export type SimulationRound = {
  id: string
  title: string
  story: string
  notice: string
  options: InitiativeId[]
  maxChoices: number
  operationalCost: number
  scenarioEffect: IndicatorValues
  sharedBonus: IndicatorValues
  projectBonus: Partial<Record<InitiativeId, Partial<IndicatorValues>>>
}

// Todas las cantidades son unidades ficticias para aprendizaje, no quetzales,
// estimaciones ni estadísticas sobre Guatemala o políticas públicas reales.
export const indicatorLabels: Record<IndicatorKey, string> = {
  education: 'Educación', economy: 'Oportunidades económicas', safety: 'Seguridad',
  participation: 'Participación', technology: 'Acceso a tecnología',
}
export const indicatorKeys: IndicatorKey[] = ['education', 'economy', 'safety', 'participation', 'technology']
export const initialBudget = 100
export const initialIndicators: IndicatorValues = { education: 25, economy: 25, safety: 25, participation: 25, technology: 25 }
const none: IndicatorValues = { education: 0, economy: 0, safety: 0, participation: 0, technology: 0 }

export const initiatives: Initiative[] = [
  { id: 'scholarships', name: 'Becas educativas', description: 'Apoyos para continuar aprendiendo.', cost: 22,
    effects: { education: 18, economy: 4, safety: 0, participation: 3, technology: 0 },
    benefit: 'Abre una posibilidad de continuidad educativa en esta simulación.', limitation: 'Una beca por sí sola no resuelve traslado, seguridad ni acceso digital.' },
  { id: 'transport', name: 'Transporte seguro', description: 'Trayectos que facilitan llegar a actividades.', cost: 18,
    effects: { education: 7, economy: 7, safety: 15, participation: 3, technology: 0 },
    benefit: 'Puede facilitar movilidad y acceso a espacios educativos y laborales ficticios.', limitation: 'Su continuidad requeriría organización y mantenimiento fuera del simulador.' },
  { id: 'training', name: 'Formación profesional', description: 'Aprendizaje para ampliar opciones de trabajo.', cost: 20,
    effects: { education: 6, economy: 17, safety: 0, participation: 2, technology: 0 },
    benefit: 'Fortalece capacidades y opciones económicas en el modelo educativo.', limitation: 'La formación necesita oportunidades laborales reales para ser aprovechada.' },
  { id: 'technology', name: 'Acceso a tecnología', description: 'Herramientas y espacios para aprender.', cost: 18,
    effects: { education: 8, economy: 5, safety: 0, participation: 0, technology: 20 },
    benefit: 'Aumenta el acceso simulado a herramientas digitales.', limitation: 'Los dispositivos por sí solos no garantizan conectividad ni acompañamiento.' },
  { id: 'prevention', name: 'Prevención de violencia', description: 'Acciones comunitarias de sensibilización.', cost: 21,
    effects: { education: 3, economy: 0, safety: 20, participation: 5, technology: 0 },
    benefit: 'Refuerza el indicador ficticio de seguridad y la participación.', limitation: 'La prevención no sustituye atención profesional ni protección institucional.' },
  { id: 'leadership', name: 'Participación comunitaria', description: 'Espacios para proponer y tomar decisiones.', cost: 16,
    effects: { education: 0, economy: 4, safety: 4, participation: 19, technology: 0 },
    benefit: 'Abre espacios simulados para escuchar distintas voces.', limitation: 'Participar de verdad requiere tiempo, recursos y capacidad real de decidir.' },
]

export const simulationRounds: SimulationRound[] = [
  {
    id: 'needs', title: 'Identificar necesidades', story: 'El equipo de una comunidad guatemalteca ficticia se reúne. Hay caminos por abrir en educación, formación, tecnología y participación.',
    notice: 'Elige hasta dos iniciativas iniciales. También puedes reservar recursos para después.',
    options: ['scholarships', 'training', 'technology', 'leadership'], maxChoices: 2,
    operationalCost: 0, scenarioEffect: none, sharedBonus: none, projectBonus: {},
  },
  {
    id: 'constraints', title: 'Administrar recursos', story: 'Surge una necesidad ficticia de movilidad y prevención. El equipo destina 10 unidades a coordinación operativa antes de invertir de nuevo.',
    notice: 'Al entrar a esta ronda se descuentan 10 unidades y los indicadores simulados de seguridad y economía reciben una presión temporal. Transporte y prevención tienen una bonificación ficticia de seguridad en esta ronda.',
    options: ['transport', 'prevention', 'training', 'technology'], maxChoices: 2,
    operationalCost: 10, scenarioEffect: { education: 0, economy: -4, safety: -6, participation: 0, technology: 0 }, sharedBonus: none,
    projectBonus: { transport: { safety: 4 }, prevention: { safety: 4 } },
  },
  {
    id: 'review', title: 'Evaluar y sostener', story: 'En una mesa de seguimiento ficticia, el equipo revisa lo que falta antes de decidir sus últimas inversiones.',
    notice: 'Las seis iniciativas aún no seleccionadas pueden considerarse. En esta ronda cada nueva iniciativa añade 3 puntos simulados de participación por la coordinación comunitaria.',
    options: ['scholarships', 'transport', 'training', 'technology', 'prevention', 'leadership'], maxChoices: 2,
    operationalCost: 0, scenarioEffect: none, sharedBonus: { education: 0, economy: 0, safety: 0, participation: 3, technology: 0 }, projectBonus: {},
  },
]
