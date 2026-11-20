export type LearningCategory = 'signals' | 'support' | 'safety'
export type Learning = { id: string; category: LearningCategory; text: string }
export type StoryOption = { id: string; text: string; next: string }
type SceneBase = { id: string; title: string; speaker: string; dialogue: string; setting: string; mood: 'thoughtful' | 'worried' | 'hopeful'; learningIds: string[] }
export type DecisionScene = SceneBase & { kind: 'decision'; response?: string; options: StoryOption[] }
export type EndingScene = SceneBase & { kind: 'ending'; response: string; reflection: string }
export type StoryScene = DecisionScene | EndingScene
export type StoryChapter = { id: string; number: string; title: string; subtitle: string; setting: string; person: string; start: string; scenes: Record<string, StoryScene> }

export const protectiveLearnings: Learning[] = [
  { id: 'control', category: 'signals', text: 'Revisar el teléfono y controlar las conversaciones de otra persona son señales de control, no pruebas de afecto.' },
  { id: 'harassment', category: 'signals', text: 'Los comentarios ofensivos y el acoso en espacios educativos merecen atención sin culpar a quien los recibe.' },
  { id: 'psychological', category: 'signals', text: 'La descalificación y el aislamiento pueden formar parte de la violencia psicológica.' },
  { id: 'listen', category: 'support', text: 'Escuchar sin juzgar y preguntar qué apoyo desea la persona respeta su autonomía.' },
  { id: 'privacy', category: 'support', text: 'Proteger la privacidad y no difundir una experiencia sin consentimiento ayuda a cuidar la confianza.' },
  { id: 'pace', category: 'support', text: 'Acompañar sin presionar permite que la persona decida si quiere hablar y cuándo.' },
  { id: 'repair', category: 'support', text: 'Reconocer una respuesta poco útil permite volver a escuchar y ofrecer apoyo de otra manera.' },
  { id: 'safe-intervention', category: 'safety', text: 'Ante el acoso, priorizar la seguridad y buscar apoyo evita confrontaciones que pueden aumentar el riesgo.' },
  { id: 'verified-channels', category: 'safety', text: 'Compartir información institucional comprobada puede ayudar sin prometer resultados ni imponer denuncias.' },
  { id: 'confidentiality', category: 'safety', text: 'No es responsable prometer secreto absoluto: conviene explicar con honestidad los límites de la confidencialidad.' },
]

// Todas las personas, diálogos y situaciones son ficticios. Los finales muestran
// posibilidades educativas, no predicciones ni instrucciones para una víctima.
export const protectiveChapters: StoryChapter[] = [
  {
    id: 'senales', number: '01', title: 'Señales que importan', subtitle: 'Escuchar cuando alguien comparte una inquietud.', setting: 'Un patio universitario, al terminar la jornada', person: 'Alma · estudiante ficticia', start: 'senales-inicio',
    scenes: {
      'senales-inicio': { id: 'senales-inicio', kind: 'decision', title: 'Una conversación entre amistades', speaker: 'Alma', dialogue: '“Mi pareja mira mis mensajes y me pregunta todo el tiempo con quién hablo. Dice que es porque le importo.”', setting: 'Estás hablando con Alma en un lugar tranquilo. Como amistad, ¿cómo responderías?', mood: 'worried', learningIds: [], options: [
        { id: 'escuchar', text: 'Escucharla y preguntarle cómo se siente con esa situación.', next: 'senales-escucha' },
        { id: 'minimizar', text: 'Decir que quizá no es importante y cambiar de tema.', next: 'senales-minimiza' },
        { id: 'imponer', text: 'Decidir por ella y contárselo a otras personas sin preguntarle.', next: 'senales-impone' },
      ] },
      'senales-escucha': { id: 'senales-escucha', kind: 'decision', title: 'Espacio para escuchar', speaker: 'Alma', dialogue: '“Me incomoda, pero no sé si exagero. Gracias por escucharme.”', setting: 'Alma puede hablar sin que su experiencia sea juzgada.', mood: 'thoughtful', response: 'Escuchar ayuda a reconocer el control sin imponer una decisión. Revisar el teléfono de otra persona no es una muestra de afecto.', learningIds: ['control', 'listen'], options: [
        { id: 'red', text: 'Preguntarle si le gustaría pensar en una persona de confianza.', next: 'senales-red' },
        { id: 'ritmo', text: 'Preguntar qué necesita ahora y respetar si prefiere hablar después.', next: 'senales-ritmo' },
      ] },
      'senales-minimiza': { id: 'senales-minimiza', kind: 'decision', title: 'Cuando una respuesta cierra la conversación', speaker: 'Narradora', dialogue: 'Alma guarda silencio. No sabemos qué decidirá después.', setting: 'Puedes cambiar tu forma de acompañarla sin juzgarte por haber respondido así.', mood: 'worried', response: 'Restar importancia a una señal de control puede dificultar que alguien se sienta escuchado. La responsabilidad del control pertenece a quien lo ejerce.', learningIds: ['control', 'repair'], options: [
        { id: 'reconocer', text: 'Reconocer que minimizaste su inquietud y volver a escuchar.', next: 'senales-reparar' },
        { id: 'preguntar', text: 'Preguntar si quiere conversar en otro momento, sin insistir.', next: 'senales-ritmo' },
      ] },
      'senales-impone': { id: 'senales-impone', kind: 'decision', title: 'La autonomía también protege', speaker: 'Narradora', dialogue: 'Alma se preocupa por quién podría enterarse de lo que compartió.', setting: 'Es posible detenerse y ofrecer una forma de apoyo más respetuosa.', mood: 'worried', response: 'Difundir una situación sin consentimiento o decidir por otra persona puede afectar su seguridad y su confianza. No es responsabilidad de Alma reparar lo ocurrido.', learningIds: ['privacy', 'listen'], options: [
        { id: 'corregir', text: 'Respetar su privacidad y preguntarle cómo preferiría recibir apoyo.', next: 'senales-reparar' },
        { id: 'informar', text: 'Ofrecer información institucional verificada solo si desea conocerla.', next: 'senales-red' },
      ] },
      'senales-red': { id: 'senales-red', kind: 'ending', title: 'Una red elegida por ella', speaker: 'Narradora', dialogue: 'Alma considera si quiere hablar con alguien de su confianza. La decisión sigue siendo suya.', setting: 'Una conversación puede abrir posibilidades sin prometer un desenlace.', mood: 'hopeful', response: 'Ofrecer apoyo respetuoso y canales comprobados puede ayudar, sin presionar a denunciar ni sustituir orientación profesional.', reflection: '¿Cómo ofrecerías información útil sin decidir por Alma?', learningIds: ['verified-channels', 'listen'] },
      'senales-ritmo': { id: 'senales-ritmo', kind: 'ending', title: 'Acompañar a su ritmo', speaker: 'Narradora', dialogue: 'Alma sabe que puede retomar la conversación si así lo desea.', setting: 'El apoyo puede mantenerse disponible sin exigir una respuesta inmediata.', mood: 'hopeful', response: 'Respetar sus tiempos y su autonomía evita trasladarle la responsabilidad del comportamiento de control.', reflection: '¿Cómo mantendrías abierta una conversación sin presionarla?', learningIds: ['pace', 'listen'] },
      'senales-reparar': { id: 'senales-reparar', kind: 'ending', title: 'Volver a escuchar', speaker: 'Narradora', dialogue: 'Le dices a Alma que debiste preguntarle antes. Le ofreces escucharla sin juzgar.', setting: 'Reconocer un error puede ayudar a reconstruir la confianza.', mood: 'hopeful', response: 'Corregir la propia respuesta es posible. La violencia sigue siendo responsabilidad de quien la ejerce, nunca de quien busca apoyo.', reflection: '¿Qué cambiarías en tu manera de escuchar después de esta escena?', learningIds: ['repair', 'privacy'] },
    },
  },
  {
    id: 'acoso', number: '02', title: 'No guardar silencio ante el acoso', subtitle: 'Buscar formas seguras de intervenir como testigo.', setting: 'Un pasillo de un centro educativo', person: 'Lucía · compañera ficticia', start: 'acoso-inicio',
    scenes: {
      'acoso-inicio': { id: 'acoso-inicio', kind: 'decision', title: 'Lo que ocurre en el pasillo', speaker: 'Narradora', dialogue: 'Una persona dirige comentarios ofensivos e insistentes a Lucía. Ella se aparta y no parece cómoda.', setting: 'Presencias la situación. Tu papel es actuar con atención a la seguridad y a lo que Lucía prefiera.', mood: 'worried', learningIds: [], options: [
        { id: 'acercarse', text: 'Acercarte a Lucía después y preguntarle si quiere apoyo.', next: 'acoso-pregunta' },
        { id: 'redirigir', text: 'Si es seguro, interrumpir brevemente para ofrecer salir del lugar.', next: 'acoso-redirige' },
        { id: 'confrontar', text: 'Enfrentar de forma agresiva a quien hace los comentarios.', next: 'acoso-riesgo' },
      ] },
      'acoso-pregunta': { id: 'acoso-pregunta', kind: 'decision', title: 'Una pregunta, no una exigencia', speaker: 'Lucía', dialogue: '“Me sentí incómoda. No quiero que todo el mundo lo sepa.”', setting: 'Escuchar lo que Lucía desea ayuda a evitar nuevas exposiciones.', mood: 'thoughtful', response: 'El acoso merece atención; acercarse en privado permite ofrecer apoyo sin quitarle el control de lo que cuenta.', learningIds: ['harassment', 'privacy'], options: [
        { id: 'canal', text: 'Preguntarle si quiere conocer los canales de apoyo del centro.', next: 'acoso-orientacion' },
        { id: 'escucha', text: 'Escuchar y preguntarle cómo preferiría continuar.', next: 'acoso-acompana' },
      ] },
      'acoso-redirige': { id: 'acoso-redirige', kind: 'decision', title: 'Una interrupción breve y segura', speaker: 'Narradora', dialogue: 'La situación se interrumpe sin una confrontación. Lucía decide apartarse.', setting: 'Después de salir del pasillo, puedes ofrecer acompañamiento sin asumir qué quiere hacer.', mood: 'thoughtful', response: 'Intervenir solo cuando es seguro y sin escalar el conflicto puede abrir una salida. La prioridad es el bienestar de la persona afectada.', learningIds: ['harassment', 'safe-intervention'], options: [
        { id: 'consultar', text: 'Preguntar a Lucía si desea conocer un canal institucional.', next: 'acoso-orientacion' },
        { id: 'seguir', text: 'Preguntarle en privado si quiere que permanezcas cerca.', next: 'acoso-acompana' },
      ] },
      'acoso-riesgo': { id: 'acoso-riesgo', kind: 'decision', title: 'Detener la escalada', speaker: 'Narradora', dialogue: 'La tensión aumenta. Lucía queda expuesta ante otras personas.', setting: 'Aún puedes priorizar la seguridad y buscar un modo de apoyo menos riesgoso.', mood: 'worried', response: 'Una confrontación agresiva puede aumentar el riesgo. Como testigo, puedes reconsiderar la acción sin culpar a Lucía por lo sucedido.', learningIds: ['harassment', 'safe-intervention'], options: [
        { id: 'salir', text: 'Alejarte de la confrontación y ofrecer una salida segura.', next: 'acoso-seguridad' },
        { id: 'personal', text: 'Buscar personal responsable del centro sin difundir su historia.', next: 'acoso-orientacion' },
      ] },
      'acoso-orientacion': { id: 'acoso-orientacion', kind: 'ending', title: 'Canales a su alcance', speaker: 'Narradora', dialogue: 'Lucía conoce que existen canales de apoyo y decide si quiere utilizarlos.', setting: 'La información debe comprobarse antes de compartirla.', mood: 'hopeful', response: 'Acompañar no significa decidir por ella. Los canales institucionales pueden orientar, pero el juego no reemplaza su atención.', reflection: '¿Cómo verificarías un canal de apoyo sin presionar a Lucía?', learningIds: ['verified-channels', 'privacy'] },
      'acoso-acompana': { id: 'acoso-acompana', kind: 'ending', title: 'Acompañamiento discreto', speaker: 'Narradora', dialogue: 'Lucía elige hablar en un lugar tranquilo y saber que no está sola.', setting: 'Su decisión sobre qué hacer después merece respeto.', mood: 'hopeful', response: 'Escuchar y respetar la privacidad puede ser una ayuda concreta. No conocemos ni debemos imponer el desenlace.', reflection: '¿Qué significa respetar las decisiones de una persona afectada por acoso?', learningIds: ['listen', 'privacy'] },
      'acoso-seguridad': { id: 'acoso-seguridad', kind: 'ending', title: 'Seguridad antes que confrontación', speaker: 'Narradora', dialogue: 'La tensión disminuye al alejarse. Se abre un momento para consultar qué desea Lucía.', setting: 'Actuar con cuidado es más importante que ganar una discusión.', mood: 'thoughtful', response: 'Evitar una confrontación peligrosa y buscar ayuda apropiada permite atender la situación sin crear más riesgos.', reflection: '¿En qué momento pedirías apoyo a personal responsable del lugar?', learningIds: ['safe-intervention', 'listen'] },
    },
  },
  {
    id: 'redes', number: '03', title: 'Construyendo redes de apoyo', subtitle: 'Compartir información confiable sin presionar.', setting: 'Una conversación privada entre compañeras', person: 'María · compañera ficticia', start: 'redes-inicio',
    scenes: {
      'redes-inicio': { id: 'redes-inicio', kind: 'decision', title: 'Una pregunta difícil', speaker: 'María', dialogue: '“Me descalifican constantemente y me alejan de mis amistades. No sé si lo que vivo importa.”', setting: 'María busca orientación. Como compañera, puedes ofrecer escucha y apoyo respetuoso.', mood: 'worried', learningIds: [], options: [
        { id: 'escucha', text: 'Escuchar sin exigir detalles y preguntarle qué necesita.', next: 'redes-escucha' },
        { id: 'secreto', text: 'Prometer que jamás compartirás nada, pase lo que pase.', next: 'redes-secreto' },
        { id: 'difundir', text: 'Contarlo a un grupo para conseguir consejos sin preguntarle.', next: 'redes-difusion' },
      ] },
      'redes-escucha': { id: 'redes-escucha', kind: 'decision', title: 'Escuchar sin etiquetar', speaker: 'María', dialogue: '“Necesito saber qué opciones tengo, pero quiero pensarlo con calma.”', setting: 'María puede explorar posibilidades a su propio ritmo.', mood: 'thoughtful', response: 'La descalificación y el aislamiento son señales que merecen atención. Escuchar sin exigir detalles respeta su autonomía.', learningIds: ['psychological', 'listen'], options: [
        { id: 'verificados', text: 'Ofrecerle revisar juntas información institucional oficial.', next: 'redes-recursos' },
        { id: 'contacto', text: 'Acordar una forma discreta de retomar la conversación si quiere.', next: 'redes-acompana' },
      ] },
      'redes-secreto': { id: 'redes-secreto', kind: 'decision', title: 'Honestidad y confidencialidad', speaker: 'Narradora', dialogue: 'María pregunta si podrías ayudarla si se encontrara en peligro inmediato.', setting: 'Una promesa absoluta puede ser difícil de cumplir y crear una falsa seguridad.', mood: 'thoughtful', response: 'Respetar la privacidad es importante, pero prometer secreto absoluto sin poder garantizarlo no es responsable. Conviene hablar con honestidad.', learningIds: ['psychological', 'confidentiality'], options: [
        { id: 'aclarar', text: 'Explicar con honestidad los límites de lo que puedes prometer.', next: 'redes-acompana' },
        { id: 'informar', text: 'Ofrecer información verificada y pedir ayuda adecuada si hay peligro inmediato.', next: 'redes-recursos' },
      ] },
      'redes-difusion': { id: 'redes-difusion', kind: 'decision', title: 'La confianza puede cuidarse', speaker: 'Narradora', dialogue: 'María teme que su historia circule sin que ella lo haya elegido.', setting: 'Todavía puedes detener la difusión y reparar tu forma de acompañar.', mood: 'worried', response: 'Difundir experiencias sin permiso puede afectar la privacidad y la seguridad. La responsabilidad de la violencia nunca es de María.', learningIds: ['psychological', 'privacy'], options: [
        { id: 'detener', text: 'Detener la difusión, reconocer el error y escucharla.', next: 'redes-privacidad' },
        { id: 'preguntar', text: 'Preguntarle si quiere revisar información institucional en privado.', next: 'redes-recursos' },
      ] },
      'redes-recursos': { id: 'redes-recursos', kind: 'ending', title: 'Opciones que ella puede considerar', speaker: 'Narradora', dialogue: 'María conoce dónde puede consultar información institucional y decide qué desea hacer.', setting: 'Ninguna decisión de María justifica la violencia que vive.', mood: 'hopeful', response: 'Facilitar una fuente oficial ayuda sin prometer resultados. Si existe peligro inmediato, buscar apoyo profesional local es prioritario.', reflection: '¿Cómo ofrecerías recursos oficiales sin imponer un paso?', learningIds: ['verified-channels', 'pace'] },
      'redes-acompana': { id: 'redes-acompana', kind: 'ending', title: 'Una red sin presiones', speaker: 'Narradora', dialogue: 'María sabe que puede volver a conversar y que su privacidad será respetada dentro de límites honestos.', setting: 'La relación de apoyo puede continuar a su ritmo.', mood: 'hopeful', response: 'Escuchar, acordar cómo comunicarse y ser transparente sobre la confidencialidad puede fortalecer una red de apoyo.', reflection: '¿Cómo respetarías el ritmo y las decisiones de María?', learningIds: ['pace', 'confidentiality'] },
      'redes-privacidad': { id: 'redes-privacidad', kind: 'ending', title: 'Reparar la confianza', speaker: 'Narradora', dialogue: 'Detienes la difusión y le preguntas a María cómo prefiere que la acompañes.', setting: 'El cuidado de su privacidad importa en cada paso.', mood: 'thoughtful', response: 'Reconocer una acción poco útil no cambia la responsabilidad de quien ejerce violencia, pero sí permite ofrecer apoyo más seguro.', reflection: '¿Qué harías diferente antes de compartir información sobre alguien?', learningIds: ['repair', 'privacy'] },
    },
  },
]
