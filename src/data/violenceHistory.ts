import type { HistoricalMoment, HistoricalSource } from './historicalTypes'

export const violenceSources: HistoricalSource[] = [
  {
    id: 'sepur', author: 'ONU Mujeres', title: 'El caso Sepur Zarco: las mujeres guatemaltecas que exigieron justicia',
    url: 'https://www.unwomen.org/es/news/stories/2018/10/feature-sepur-zarco-case',
    note: 'Cronología del conflicto y documentación del caso Sepur Zarco; incluye relatos de sobrevivientes en la fuente externa.',
  },
  {
    id: 'paz', author: 'UNESCO', title: 'Acuerdos de Paz de Guatemala, 1996',
    url: 'https://www.unesco.org/es/memory-world/lac/guatemala-peace-agreements-1996',
    note: 'Registro del patrimonio documental: firma del Acuerdo de paz firme y duradera el 29 de diciembre de 1996.',
  },
  {
    id: 'ceh', author: 'Comisión para el Esclarecimiento Histórico · PNUD', title: 'Guatemala: Memoria del Silencio — conclusiones y recomendaciones',
    url: 'https://www.undp.org/es/guatemala/publicaciones/guatemala-memoria-del-silencio',
    note: 'Presentación del informe de la CEH con acceso a sus conclusiones y recomendaciones en PDF.',
  },
  {
    id: 'ceh-fecha', author: 'COPADEH', title: 'Guatemala Memoria del Silencio',
    url: 'https://copadeh.gob.gt/guatemala-memoria-del-silencio/',
    note: 'Fecha de entrega del informe de la CEH al Estado de Guatemala: 25 de febrero de 1999.',
  },
  {
    id: 'sentencia', author: 'ONU Mujeres', title: 'Resolución histórica en Guatemala: caso Sepur Zarco',
    url: 'https://www.unwomen.org/es/news/stories/2016/3/guatemala-victory-against-sexual-violence-in-armed-conflict',
    note: 'Explica la condena del 26 de febrero de 2016 y la decisión de reparaciones del 2 de marzo.',
  },
]

export const violenceMoments: HistoricalMoment[] = [
  {
    year: '1982', label: 'Sepur Zarco', title: 'Violencia contra mujeres q’eqchi’',
    fact: 'En 1982 el ejército instaló un puesto en Sepur Zarco. ONU Mujeres documenta que mujeres indígenas q’eqchi’ de esa zona sufrieron violencia sexual y esclavitud, mientras sus comunidades padecieron desapariciones y otras violaciones de derechos humanos.',
    interpretation: 'La violencia contra las mujeres durante el conflicto también afectó la vida y los vínculos de las comunidades indígenas; nunca fue responsabilidad de quienes la sufrieron.',
    question: '¿Por qué es importante escuchar a las sobrevivientes sin responsabilizarlas?', sourceIds: ['sepur'], symbol: 'memory',
  },
  {
    year: '1996', label: 'Firma de paz', title: 'Termina el conflicto armado',
    fact: 'El 29 de diciembre de 1996 el Gobierno de Guatemala y la URNG firmaron el Acuerdo de paz firme y duradera, que puso fin al conflicto armado interno desarrollado entre 1960 y 1996.',
    interpretation: 'El fin formal de la guerra abrió una etapa de compromisos de paz, memoria y derechos; no borró las consecuencias de la violencia para las personas y comunidades.',
    question: '¿Qué necesita una comunidad además del fin de la guerra para construir paz?', sourceIds: ['paz'], symbol: 'peace',
  },
  {
    year: '1999', label: 'Memoria histórica', title: 'El informe de la CEH',
    fact: 'El 25 de febrero de 1999 la Comisión para el Esclarecimiento Histórico entregó al Estado el informe Guatemala: Memoria del Silencio. Sus conclusiones examinan violaciones de derechos humanos, hechos de violencia y el proceso de paz.',
    interpretation: 'Documentar el pasado ayuda a reconocer los daños y a orientar la búsqueda de justicia, reparación y garantías de no repetición.',
    question: '¿Qué perdemos como sociedad si dejamos de estudiar lo ocurrido?', sourceIds: ['ceh-fecha', 'ceh'], symbol: 'open',
  },
  {
    year: '2016', label: 'Justicia y reparación', title: 'Una sentencia por Sepur Zarco',
    fact: 'El 26 de febrero de 2016 un tribunal guatemalteco condenó a dos exmilitares por crímenes cometidos contra mujeres indígenas q’eqchi’ durante el conflicto. El 2 de marzo dictó medidas de reparación para sobrevivientes y su comunidad.',
    interpretation: 'La sentencia reconoció que la justicia también debe atender consecuencias comunitarias. El derecho a la reparación requiere acciones sostenidas para hacerse efectivo.',
    question: '¿Cómo se puede acompañar la memoria y la búsqueda de justicia con respeto?', sourceIds: ['sentencia'], symbol: 'shield',
  },
]

// Contexto breve para las fichas educativas del archivo; conserva los hechos originales.
export const violenceArchiveContexts: Record<string, string> = {
  '1982': 'Durante el Conflicto Armado Interno, las comunidades indígenas fueron afectadas por la violencia. El caso de Sepur Zarco permite conocer lo ocurrido a mujeres q’eqchi’ sin recrear sus testimonios.',
  '1996': 'Tras décadas de enfrentamiento, el Gobierno y la URNG suscribieron un acuerdo que puso fin formal al conflicto armado. La firma abrió una nueva etapa para el país.',
  '1999': 'La Comisión para el Esclarecimiento Histórico investigó el enfrentamiento armado y presentó conclusiones y recomendaciones sobre sus causas, hechos de violencia y consecuencias.',
  '2016': 'Décadas después de los hechos de Sepur Zarco, un tribunal guatemalteco examinó los crímenes cometidos contra mujeres q’eqchi’ y dictó medidas de reparación.',
}
