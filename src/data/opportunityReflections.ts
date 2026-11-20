import { indicatorKeys, indicatorLabels, initialIndicators, type IndicatorValues, type Initiative, type InitiativeId } from './opportunitySimulation'

export function describeStrategy(indicators: IndicatorValues, selectedIds: InitiativeId[], initiatives: Initiative[]) {
  if (selectedIds.length === 0) return {
    title: 'Reservar recursos también abre preguntas.',
    benefit: 'Conservaste recursos para pensar en necesidades futuras de la comunidad ficticia.',
    limitation: 'Sin iniciativas, las barreras simuladas no reciben apoyos adicionales. En un contexto real habría que escuchar a la comunidad antes de decidir.',
  }

  const changes = indicatorKeys.map(key => ({ key, change: indicators[key] - initialIndicators[key] }))
  const most = [...changes].sort((a, b) => b.change - a.change)[0]
  const least = [...changes].sort((a, b) => a.change - b.change)[0]
  const selected = initiatives.filter(item => selectedIds.includes(item.id))

  return {
    title: `Tu estrategia dio más espacio a ${indicatorLabels[most.key].toLowerCase()}.`,
    benefit: selected.slice(0, 2).map(item => item.benefit).join(' '),
    limitation: `En este modelo, ${indicatorLabels[least.key].toLowerCase()} quedó con el menor cambio. ${selected[0].limitation}`,
  }
}
