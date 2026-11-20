import type { CulturalStop } from './culturalStops'
import { projectImages, type ProjectImage } from './projectImages'

export type CulturalPuzzle = {
  id: CulturalStop['id']
  stopId: CulturalStop['id']
  title: string
  illustrationContext: string
  artDescription: string
  svg: string
  photo: ProjectImage
}

function photoFor(id: CulturalStop['id']): ProjectImage {
  const photo = projectImages.multiculturalidad.find(image => image.puzzleId === id)
  if (!photo) throw new Error(`Falta la fotografía del nivel ${id}`)
  return photo
}

// Ilustraciones originales y simbólicas de actividades documentadas en
// culturalStops.ts: no son fotografías, tejidos, glifos ni símbolos propios
// de un pueblo. Su contenido no se ofrece como representación universal.
const scene = (sky: string, ground: string, drawing: string) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><defs><linearGradient id="c" x2="1" y2="1"><stop stop-color="${sky}"/><stop offset="1" stop-color="#263d42"/></linearGradient></defs><rect width="600" height="600" fill="url(#c)"/><circle cx="487" cy="95" r="59" fill="#efd4a7" opacity=".8"/><path d="M0 375 115 268l93 82 100-109 124 105 87-71 81 78v247H0Z" fill="#47645d" opacity=".6"/><path d="M0 485Q163 435 297 474T600 464v136H0Z" fill="${ground}"/><g stroke="#f2e1be" stroke-opacity=".32" stroke-width="3" fill="none"><path d="M24 170Q107 98 180 162"/><path d="M379 203Q465 147 561 205"/></g>${drawing}<path d="M0 536Q149 513 298 545T600 523v77H0Z" fill="#223a3b" opacity=".7"/><rect x="21" y="21" width="558" height="558" rx="18" fill="none" stroke="#f0d7ac" stroke-opacity=".7" stroke-width="5"/></svg>`

export const culturalPuzzles: CulturalPuzzle[] = [
  {
    id: 'maya', stopId: 'maya', title: 'Mirar sin asumir',
    illustrationContext: 'Ilustración simbólica de un festival de murales de identidad cultural K’iche’ documentado en Santa Cruz del Quiché; no reproduce un mural real.',
    artDescription: 'Muro con paneles abstractos de colores y dos figuras trabajando en una actividad artística comunitaria.',
    svg: scene('#92746d', '#51625a', `<path d="M80 420V180h437v240Z" fill="#d8bc98" stroke="#f0dbb7" stroke-width="6"/><rect x="105" y="204" width="94" height="185" fill="#ba725e"/><path d="m109 339 88-101v113" fill="#efc596"/><rect x="211" y="204" width="94" height="185" fill="#557f76"/><circle cx="258" cy="290" r="33" fill="#f0d6a8"/><rect x="317" y="204" width="94" height="185" fill="#7b6381"/><path d="m334 353 62-116" stroke="#e6c5a2" stroke-width="16"/><rect x="423" y="204" width="69" height="185" fill="#9c8661"/><path d="M70 429h470" stroke="#e5c99c" stroke-width="12"/><g fill="#e5b991"><circle cx="153" cy="443" r="21"/><circle cx="453" cy="445" r="22"/></g><path d="M115 544q-1-80 38-80t38 80M412 544q3-78 41-78t39 78" fill="#42575b"/><path d="M195 468 219 415m258 53-15-58" stroke="#c8a985" stroke-width="9" stroke-linecap="round"/>`),
    photo: photoFor('maya'),
  },
  {
    id: 'garifuna', stopId: 'garifuna', title: 'Escuchar y compartir',
    illustrationContext: 'Ilustración simbólica de un encuentro con representantes culturales garífunas documentado en Livingston, Izabal; no retrata a participantes reales.',
    artDescription: 'Espacio comunitario con personas conversando y ondas abstractas que aluden a la música y el canto abordados en el encuentro.',
    svg: scene('#497783', '#386462', `<path d="M67 438V202q0-69 67-69h330q69 0 69 69v236Z" fill="#79938a" stroke="#dbd4ad" stroke-width="7"/><path d="M94 435V209q0-41 42-41h327q43 0 43 41v226Z" fill="#3c6670"/><path d="M92 413h416" stroke="#eed4a8" stroke-width="13"/><ellipse cx="302" cy="462" rx="143" ry="35" fill="#c09c79"/><path d="M162 544q-9-91 35-106h36q46 14 39 106M348 544q-8-91 36-106h39q44 15 38 106" fill="#78657b"/><circle cx="214" cy="421" r="28" fill="#d9ae8b"/><circle cx="405" cy="421" r="28" fill="#ad806d"/><path d="M246 276q64-61 127 0M217 301q87-91 171 0M267 333q33-28 68 0" stroke="#e9d3ae" stroke-width="7" fill="none" stroke-linecap="round"/><circle cx="188" cy="267" r="9" fill="#f2dcb6"/><circle cx="414" cy="270" r="9" fill="#f2dcb6"/>`),
    photo: photoFor('garifuna'),
  },
  {
    id: 'xinka', stopId: 'xinka', title: 'Preguntar por la identidad',
    illustrationContext: 'Ilustración simbólica de un taller de aprendizaje del idioma Xinka documentado en Pueblo Nuevo Viñas, Santa Rosa; no incluye palabras o signos lingüísticos inventados.',
    artDescription: 'Aula con tablero de formas abstractas, tarjetas de aprendizaje sin palabras y dos figuras conversando.',
    svg: scene('#9b775d', '#666b55', `<rect x="98" y="143" width="406" height="238" rx="10" fill="#c9b797" stroke="#f1dcba" stroke-width="8"/><rect x="122" y="168" width="358" height="187" rx="4" fill="#3c6866"/><path d="M153 210h127m-127 27h81m117-33h90m-90 27h66" stroke="#c5dbcb" stroke-width="9" stroke-linecap="round" opacity=".7"/><circle cx="326" cy="300" r="19" fill="#efd6a2"/><path d="M147 404h309" stroke="#e7d1a7" stroke-width="13"/><path d="M131 541q-5-101 33-106h33q34 12 32 106M378 541q-5-101 33-106h32q36 12 33 106" fill="#685a70"/><circle cx="178" cy="425" r="27" fill="#d8ad89"/><circle cx="426" cy="425" r="27" fill="#aa7e69"/><g fill="#e6d3ab" stroke="#ad9679" stroke-width="3"><rect x="247" y="451" width="39" height="54" rx="3" transform="rotate(-11 247 451)"/><rect x="311" y="445" width="39" height="54" rx="3" transform="rotate(10 311 445)"/></g>`),
    photo: photoFor('xinka'),
  },
  {
    id: 'ladino', stopId: 'ladino', title: 'Identidades sin etiquetas',
    illustrationContext: 'Ilustración simbólica de un taller educativo sobre los cuatro pueblos realizado en Melchor de Mencos, Petén; no muestra vestimenta atribuida a ningún pueblo.',
    artDescription: 'Mesa de trabajo con cuatro láminas abstractas de colores y figuras compartiendo una actividad educativa.',
    svg: scene('#6f7871', '#556458', `<path d="M75 290V165h454v125Z" fill="#a7a187" stroke="#ead8b3" stroke-width="5"/><path d="M106 260h390m-370-63h344" stroke="#d7c3a7" stroke-width="7" opacity=".5"/><path d="M75 465q186-103 451 0l-25 78H100Z" fill="#bd9f81" stroke="#f1d5ac" stroke-width="7"/><g stroke="#f0ddb9" stroke-width="4"><rect x="128" y="380" width="71" height="91" rx="6" fill="#a36d69" transform="rotate(-10 128 380)"/><rect x="216" y="362" width="71" height="91" rx="6" fill="#657f84" transform="rotate(7 216 362)"/><rect x="307" y="369" width="71" height="91" rx="6" fill="#9b8764" transform="rotate(-5 307 369)"/><rect x="395" y="390" width="71" height="91" rx="6" fill="#756b85" transform="rotate(12 395 390)"/></g><circle cx="141" cy="341" r="26" fill="#d4a681"/><circle cx="463" cy="342" r="26" fill="#bb8d76"/><path d="M92 485q-8-113 49-116 60 4 54 116M408 484q-1-115 54-116 57 5 50 116" fill="#425a5c"/>`),
    photo: photoFor('ladino'),
  },
]
