export type GenderResultLevel = {
  name: string
  title: string
  message: string
  minPercent: number
}

// Umbrales equivalentes a 10, 8–9, 6–7, 4–5 y 0–3 aciertos con 10 tarjetas.
export const genderResultLevels: GenderResultLevel[] = [
  {
    minPercent: 100, name: 'Excelente', title: '¡Eres un agente de cambio!',
    message: 'Reconoces cómo los estereotipos pueden limitar las oportunidades. Sigue promoviendo la igualdad y cuestionando las ideas que restringen las capacidades de las personas.',
  },
  {
    minPercent: 80, name: 'Muy bien', title: '¡Vas por buen camino!',
    message: 'Identificas la mayoría de los estereotipos. Cada reflexión contribuye a construir una sociedad más equitativa.',
  },
  {
    minPercent: 60, name: 'Buen avance', title: '¡Estás aprendiendo!',
    message: 'Ya reconoces varias ideas que generan desigualdad. Sigue cuestionando los prejuicios cotidianos.',
  },
  {
    minPercent: 40, name: 'Sigue explorando', title: '¡Cada descubrimiento cuenta!',
    message: 'Algunos estereotipos pueden parecer normales porque los hemos escuchado durante años. Aprender a identificarlos es el primer paso.',
  },
  {
    minPercent: 0, name: 'Una oportunidad para aprender', title: '¡El aprendizaje comienza con una pregunta!',
    message: 'Te invitamos a revisar las explicaciones y descubrir cómo los roles tradicionales pueden influir en nuestras decisiones.',
  },
]

export function getGenderResult(correct: number, total: number) {
  const ratio = total > 0 ? Math.max(0, Math.min(correct, total)) / total : 0
  const level = genderResultLevels.find(item => ratio >= item.minPercent / 100)!
  return { ...level, percent: Math.round(ratio * 100) }
}
