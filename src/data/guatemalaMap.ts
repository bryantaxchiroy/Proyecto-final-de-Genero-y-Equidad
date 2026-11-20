// Contorno ADM0 simplificado de Guatemala: geoBoundaries gbOpen GTM ADM0,
// fuente OpenStreetMap/Wambacher (2017), licencia ODbL 1.0. Simplificación
// Douglas–Peucker de 2.8 unidades y proyección equirectangular 600 × 600.
// https://www.geoboundaries.org/api/current/gbOpen/GTM/ADM0/
// Reproducible con: node scripts/generate-guatemala-outline.mjs
export const guatemalaOutline = 'M270.9 40.1L202.9 40.2L203 112.1L145.3 112.2L156.8 123.8L167.4 122.5L167.3 130.4L185.7 143.7L193 156.6L202.9 161.6L205.8 156.7L204.7 161.6L209.8 162.1L211.3 166.9L226.4 169.9L237.8 179L245 190L243.8 197.5L249.1 198L246.5 205.5L251.6 207.6L248.4 210.7L259.2 210.1L267.7 212.9L267 217.8L279.2 219L281.5 225.4L276.5 225.7L280.2 228.6L270.9 240.5L274.6 250.8L270.5 259.6L274.5 259.1L272.2 262.4L108.1 262.4L47 366L66.2 390.5L54.6 401L56.3 413.5L50.5 421.1L55.3 442.2L44.9 459L84.2 489.4L89.7 489.2L87 491.2L91.4 494.4L94.8 492.9L92.2 495L100.7 502.3L158.5 531.7L190.7 537.6L253.3 537.5L315.7 560L314.6 547.9L326 534.6L347.3 519.4L362.4 522.8L363.9 511.6L371.4 503.2L389.5 498.8L386.9 489.3L380.9 487.2L383.3 473.7L388.9 478.4L406.3 469.3L411.2 473.1L411.1 467.1L426 452.3L436.1 453.7L439.7 436.1L427.4 414.3L434.5 408.4L436.9 390.6L459.7 381.9L497.5 355.6L540.1 320.4L542.6 313.5L555.1 307L504.9 276.3L521.4 290.8L512.1 290.4L507.4 310.1L501.8 310.4L504 303.4L491.4 295.4L484.6 297.1L470.6 311.9L457.5 314.5L458.6 334.5L446.2 345L423.4 346.2L417.7 354.3L413.6 351.8L415.5 344.8L411.3 339.4L403.9 341.4L408.7 334.6L422.4 333L427.8 326.4L447.5 324.3L465.6 305.8L475.8 298.9L484.8 300.3L488.7 293.9L478.3 288L471.5 289.5L467.6 284.7L434.1 282.8L427.8 286L437.1 137.8L436.5 40.1L270.9 40.1ZM412.1 347.2L412.1 347.2ZM179.4 431.9L186.4 442.6L183.7 446.1L180.2 440.8L173.2 442.2L169.1 449.2L171.1 442.3L165.4 436L179.4 431.9ZM251.8 466.6L256.4 464.9L260.7 472.9L251.8 466.6Z'

export const guatemalaBounds = { west: -92.22642863135775, south: 13.74006210000002, east: -88.22704087626283, north: 17.8165947 }

export function projectGuatemalaPoint(longitude: number, latitude: number) {
  const scale = Math.min(520 / (guatemalaBounds.east - guatemalaBounds.west), 520 / (guatemalaBounds.north - guatemalaBounds.south))
  const offsetX = (600 - (guatemalaBounds.east - guatemalaBounds.west) * scale) / 2
  const offsetY = (600 - (guatemalaBounds.north - guatemalaBounds.south) * scale) / 2
  return { x: offsetX + (longitude - guatemalaBounds.west) * scale, y: offsetY + (guatemalaBounds.north - latitude) * scale }
}
