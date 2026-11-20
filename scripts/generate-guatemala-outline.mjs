// Utilidad editorial: imprime una ruta SVG simplificada de geoBoundaries gbOpen
// GTM ADM0 (fuente OpenStreetMap/Wambacher, licencia ODbL 1.0). No se ejecuta
// en el navegador ni durante la compilación. Ver atribución en README.
const url = 'https://media.githubusercontent.com/media/wmgeolab/geoBoundaries/9469f09/releaseData/gbOpen/GTM/ADM0/geoBoundaries-GTM-ADM0_simplified.geojson'
const response = await fetch(url)
if (!response.ok) throw new Error(`No se pudo consultar la geometría: ${response.status}`)
const collection = await response.json()
const geometry = collection.features[0].geometry
const rings = geometry.type === 'Polygon' ? geometry.coordinates : geometry.coordinates.flat()
const all = rings.flat()
const lonMin = Math.min(...all.map(point => point[0]))
const lonMax = Math.max(...all.map(point => point[0]))
const latMin = Math.min(...all.map(point => point[1]))
const latMax = Math.max(...all.map(point => point[1]))
const scale = Math.min(520 / (lonMax - lonMin), 520 / (latMax - latMin))
const offsetX = (600 - (lonMax - lonMin) * scale) / 2
const offsetY = (600 - (latMax - latMin) * scale) / 2
const project = ([lon, lat]) => [Math.round((offsetX + (lon - lonMin) * scale) * 10) / 10, Math.round((offsetY + (latMax - lat) * scale) * 10) / 10]

function distanceSquared(point, start, end) {
  const dx = end[0] - start[0], dy = end[1] - start[1]
  const t = dx === 0 && dy === 0 ? 0 : Math.max(0, Math.min(1, ((point[0] - start[0]) * dx + (point[1] - start[1]) * dy) / (dx * dx + dy * dy)))
  return (point[0] - start[0] - t * dx) ** 2 + (point[1] - start[1] - t * dy) ** 2
}

function simplify(points, toleranceSquared) {
  if (points.length <= 2) return points
  let farthest = 0, index = 0
  for (let i = 1; i < points.length - 1; i++) {
    const distance = distanceSquared(points[i], points[0], points.at(-1))
    if (distance > farthest) { farthest = distance; index = i }
  }
  if (farthest <= toleranceSquared) return [points[0], points.at(-1)]
  return [...simplify(points.slice(0, index + 1), toleranceSquared).slice(0, -1), ...simplify(points.slice(index), toleranceSquared)]
}

const path = rings.map(ring => {
  const points = simplify(ring.map(project), 2.8 ** 2)
  return `M${points.map(point => point.join(' ')).join('L')}Z`
}).join('')
console.log(JSON.stringify({ geometry: geometry.type, bounds: [lonMin, latMin, lonMax, latMax], rings: rings.length, path }))
for (const [place, longitude, latitude] of [
  ['Santa Cruz del Quiché', -91.25, 15.05],
  ['Livingston', -88.75, 15.83],
  ['Pueblo Nuevo Viñas', -90.46666667, 14.23333333],
  ['Melchor de Mencos', -89.15, 17.06666667],
]) {
  let inside = false
  const border = rings[0]
  for (let i = 0, j = border.length - 1; i < border.length; j = i++) {
    const [xi, yi] = border[i], [xj, yj] = border[j]
    if ((yi > latitude) !== (yj > latitude) && longitude < (xj - xi) * (latitude - yi) / (yj - yi) + xi) inside = !inside
  }
  console.log(`${place}: ${project([longitude, latitude]).join(', ')} · dentro del contorno: ${inside}`)
}
