# Huellas de la Desigualdad — Museo Vivo Digital

Museo digital del proyecto final de **Multiculturalidad, Género y Equidad**. Incluye bienvenida, vestíbulo de cinco estaciones, cinco experiencias históricas diferenciadas y cinco videojuegos educativos funcionales.

## Ejecutar

Requiere Node.js y npm.

```bash
npm install
npm run dev
```

Abre la dirección local que muestra Vite. Para generar la versión de despliegue: `npm run build`. La carpeta `dist/` puede publicarse en un alojamiento estático configurado para devolver `index.html` en las rutas del museo.

## Publicar en GitHub Pages

El workflow `.github/workflows/deploy-pages.yml` compila al actualizar `main` (o al ejecutarse manualmente) y publica **solo `dist/`**. En GitHub, selecciona **Settings → Pages → Build and deployment → Source: GitHub Actions**. La URL del museo es `https://bryantaxchiroy.github.io/Proyecto-final-de-Genero-y-Equidad/`.

La compilación utiliza el prefijo `/Proyecto-final-de-Genero-y-Equidad/` para recursos y rutas; `npm run dev` conserva `/` para desarrollo local. El archivo `dist/404.html`, generado junto con el build, permite que GitHub Pages sirva la aplicación al abrir o recargar enlaces internos como `/estacion/genero` y `/sala-final`. Pages responde con estado HTTP 404 en esas rutas directas, pero React Router conserva la URL y muestra su contenido.

Para comprobar las cinco estaciones, la secuencia del recorrido y las referencias de las experiencias documentadas: `npm run check:stations`.

Para verificar las reglas, los bloqueos, la puntuación y los cinco niveles de resultados del juego de Género: `npm run check:gender-game`.

Para verificar las 18 rutas narrativas, estados y resumen del juego de Violencia: `npm run check:protective-game`.

Para verificar presupuesto, indicadores, rondas y estrategias del simulador de Desigualdad: `npm run check:opportunity-game`.

Para verificar piezas, reinicio, progreso, ilustraciones y fuentes de los cuatro rompecabezas: `npm run check:cultural-puzzle`.

Para verificar las cinco zonas, los mecanismos y el desbloqueo del juego de Derechos humanos: `npm run check:rights-route`.

## Arquitectura

```text
src/
  components/
    Artwork.tsx       Ilustraciones vectoriales y motivos de estaciones
    HistoricalExplorer.tsx  Explorador de hitos con fuentes y navegación
    StationReflection.tsx   Cierre educativo reutilizable
    MemoryArchive.tsx        Archivo interactivo de la estación de Violencia
    memory-archive.css       Carpetas y fichas simbólicas del archivo
    OpportunityObservatory.tsx  Investigaciones temáticas de Desigualdad
    opportunity-observatory.css Comparaciones cualitativas del observatorio
    CulturalMap.tsx        Mapa interactivo y fichas de la estación 04
    cultural-map.css       Estilos y adaptación responsiva del mapa
    PeacePath.tsx          Pasillo de cinco puertas de la estación 05
    peace-path.css         Portales, salas simbólicas y diseño responsivo
    ProjectGallery.tsx     Galería visual contextual en cada estación
    project-gallery.css    Presentación responsiva de fotografías
    StationPreview.tsx    Plantilla de vista preliminar reutilizable
    station-preview.css   Estilos de la plantilla preliminar
    historical.css          Estilos de la exploración y la reflexión
    Layout.tsx        Encabezado, navegación, pie y accesibilidad básica
  data/
    stations.ts       Metadatos y textos introductorios de estaciones
    genderHistory.ts  Hitos y bibliografía de la estación de Género
    violenceHistory.ts    Hitos y fuentes de la estación de Violencia
    inequalityHistory.ts  Hitos y fuentes de Desigualdad de género
    inequalityObservatory.ts Temas y comparaciones del observatorio
    culturalStops.ts     Lugares, contenido cultural y fuentes
    culturalPuzzles.ts   Ilustraciones simbólicas y cuatro niveles
    guatemalaMap.ts      Contorno geográfico y proyección de puntos
    peaceDoors.ts        Derechos, hechos, instrumentos y fuentes por puerta
    rightsChallenges.ts  Reglas simbólicas y aprendizajes de cinco zonas
    projectImages.ts      Selección, descripciones y pies de las imágenes aportadas
    historicalTypes.ts    Tipos compartidos de hitos y fuentes
    genderCards.ts        Tarjetas y explicaciones del juego de Género
    genderResults.ts      Niveles y mensajes de resultados
    protectiveDecisions.ts Capítulos ficticios, escenas y aprendizajes
    opportunitySimulation.ts Iniciativas, indicadores y rondas ficticias
    opportunityReflections.ts Lecturas educativas de estrategias
  games/
    classificationEngine.ts     Estados y reglas de clasificación
    GenderClassificationGame.tsx Interfaz del juego
    gender-game.css             Escenario responsivo del juego
    protectiveDecisionsEngine.ts Lógica de ramificación y estado de partida
    ProtectiveDecisionsGame.tsx Novela visual educativa de la estación 02
    protective-decisions.css   Escenarios y diseño responsivo
    opportunityEngine.ts       Motor de presupuesto e indicadores
    OpportunitySimulator.tsx   Simulador de la estación 03
    opportunity-simulator.css  Escenario e interfaz responsiva
    culturalPuzzleEngine.ts    Mezcla y validación del tablero 3×3
    CulturalPuzzleGame.tsx     Rompecabezas y fichas educativas
    cultural-puzzle.css       Tablero, piezas y diseño responsivo
    rightsRouteEngine.ts      Motor de mecanismos y desbloqueo
    RightsRouteGame.tsx       Recorrido de aventura de la estación 05
    rights-route.css          Escenarios y controles responsivos
  pages/
    Home.tsx          Bienvenida
    Lobby.tsx         Vestíbulo
    StationPage.tsx   Plantilla compartida para las cinco estaciones
    Reflection.tsx    Sala final preliminar
    Project.tsx       Información del proyecto
    NotFound.tsx      Ruta desconocida
  App.tsx             Mapa de rutas
  main.tsx            Entrada de React
  styles.css          Sistema visual y diseño responsivo
  five-stations.css   Vestíbulo de cinco tarjetas e identidades nuevas
scripts/
  generate-guatemala-outline.mjs  Utilidad editorial para regenerar el contorno
```

**Rutas:** `/` → `/museo` → `/estacion/genero` → `/estacion/violencia` → `/estacion/desigualdad` → `/estacion/multiculturalidad` → `/estacion/derechos-humanos` → `/sala-final`. La ruta existente `/estacion/:slug` admite las dos salas nuevas sin modificar las rutas anteriores. La navegación permite regresar al vestíbulo en cualquier momento.

**Sistema visual:** azul noche, turquesa, morado y dorado suave; tipografías Manrope y DM Sans con alternativas del sistema. Las ilustraciones son simbólicas, creadas con SVG y CSS. Hay navegación por teclado, enlace para saltar al contenido, controles con nombres accesibles, puntos de quiebre para pantallas pequeñas y respeto a movimiento reducido.

**Imágenes aportadas al proyecto:** las cinco estaciones incluyen una galería contextual después de su experiencia histórica. Se incorporaron 26 imágenes de `imagenes para el proyecto final de genero y equidad/imagenes para el proyecto final de genero y equidad/`. Las rutas se resuelven desde un único patrón de recursos en `projectImages.ts`, porque la carpeta se reorganizó. `la_cultura_de_paz.jpg` se trasladó de Violencia a Derechos humanos e `identidad_cultural.jpg` de Multiculturalidad a Derechos humanos; las demás conservan su estación. Cada imagen tiene título, descripción educativa, texto alternativo, tipo y una nota que distingue lo visible de lo documentado. Los metadatos admiten autoría, institución, fecha, procedencia, licencia y estado de verificación; esos datos se muestran cuando existen, y los campos sin confirmar aparecen como pendientes. Las fotos no sustituyen las fuentes históricas.

Una imagen destacada aparece en cada estación; las demás se montan en el DOM solo al abrir el panel desplegable y se cargan de forma diferida. Los marcos reservan proporción antes de cargar para evitar desplazamientos. El visor modal muestra la imagen completa sin recorte, ofrece controles anterior/siguiente, flechas del teclado, Escape y cierre, y devuelve el foco a la miniatura original. En móvil se adapta al ancho disponible. Los originales no se modificaron. **Sigue pendiente generar copias comprimidas** de archivos pesados como `pueblo_xinka.jpeg` (aprox. 5,64 MB), `rompiendo_estereotipos.png` (4,19 MB) y `trabajo_y_oportunidades.jpg` (3,69 MB); el panel cerrado evita solicitar esas imágenes hasta abrirlo, pero no reduce su peso al descargarlas. `1982_sepur_zarco.avif` se conserva sin publicar porque no pudo previsualizarse ni describirse con precisión. También está pendiente confirmar autoría, procedencia y licencia antes de publicar el museo fuera del proyecto.

## Fase 2: narrativas históricas de las tres estaciones

La ruta `/estacion/genero` incluye **Las oportunidades a través del tiempo**: cuatro momentos seleccionables (1944, 1945, 1965 y 1985), navegación con botones anterior/siguiente, hechos documentados separados de lecturas educativas, preguntas de reflexión y enlaces a sus fuentes. Después se conserva el espacio del minijuego y se añade una reflexión que conecta la historia del sufragio con los estereotipos y las oportunidades actuales. El contenido y la presentación están separados para reutilizar el explorador en otras estaciones tras la revisión.

`/estacion/violencia` incorpora **Archivo de la Memoria: historias que no deben olvidarse**: cuatro expedientes seleccionables sobre Sepur Zarco durante el conflicto (1982), la firma del acuerdo de paz (1996), la entrega de *Guatemala: Memoria del Silencio* (1999) y la sentencia de Sepur Zarco (2016). Cada expediente presenta contexto, hecho documentado, lectura educativa, pregunta y fuentes directas: ONU Mujeres, UNESCO, Comisión para el Esclarecimiento Histórico/PNUD y COPADEH. Se puede abrir cualquier carpeta o avanzar y retroceder; un indicador local distingue los expedientes ya explorados. Las fichas están etiquetadas como representaciones gráficas educativas, sin imágenes explícitas, documentos originales ficticios ni testimonios recreados.

`/estacion/desigualdad` incorpora **Observatorio de Oportunidades: las brechas que debemos comprender**. Cuatro áreas seleccionables —Educación, Trabajo y oportunidades económicas, Participación y representación, Tecnología y recursos— reorganizan los hitos documentados: compromisos sobre educación, tierra y recursos (1995), participación y trabajo (1996), intervención de la ONU sobre participación política (2020) y comunicado de la ONU sobre brechas actuales (2023). Cada área muestra una comparación cualitativa seleccionable entre un compromiso de paz y una observación posterior. El diagrama no representa cifras ni verifica por sí mismo el cumplimiento de acuerdos; las fichas ofrecen los hechos, lecturas y preguntas originales con sus fuentes (textos de los acuerdos y Naciones Unidas en Guatemala). Un indicador local distingue las áreas exploradas.

Género conserva `HistoricalExplorer`, Violencia usa `MemoryArchive` y Desigualdad usa `OpportunityObservatory`. Las tres estaciones mantienen `StationReflection`, fuentes visibles y hechos separados de lecturas educativas. Las preguntas y cierres son reflexiones del museo, no citas históricas. Las interacciones son táctiles y accesibles por teclado y se respeta la preferencia de movimiento reducido.

## Estación 04: Guatemala, un territorio, múltiples identidades

`/estacion/multiculturalidad` permite abrir cuatro fichas desde el mapa o desde una lista accesible: Pueblo Maya (enfoque K’iche’, **Santa Cruz del Quiché**), Garífuna (**Livingston**), Xinka (**Pueblo Nuevo Viñas**) y Ladino (**Melchor de Mencos**). Cada punto remite a una actividad cultural local documentada por el Ministerio de Cultura y Deportes. El Acuerdo sobre Identidad y Derechos de los Pueblos Indígenas (1995) da contexto a los derechos de los pueblos Maya, Garífuna y Xinka; para la ficha Ladina se distingue expresamente ese alcance del acuerdo y se enlaza la actividad del MCD y la consulta de pueblo de pertenencia del INE. Las fichas muestran contexto, idioma cuando corresponde, expresiones concretas, derechos, lectura educativa, pregunta y enlaces a las fuentes. El estado «explorada» dura solo durante la visita.

**Cartografía y atribución:** el contorno de Guatemala procede de [geoBoundaries gbOpen GTM ADM0](https://www.geoboundaries.org/api/current/gbOpen/GTM/ADM0/) (fuente [© OpenStreetMap contributors](https://www.openstreetmap.org/copyright), licencia ODbL 1.0). Se simplificó para SVG y se proyectó en un lienzo de 600 × 600; `node scripts/generate-guatemala-outline.mjs` permite consultar y regenerar los datos de la fuente. Las coordenadas de las cuatro localidades proceden de las propiedades P625 de Wikidata, enlazadas desde cada ficha. Las marcas son **referencias aproximadas a lugares de actividades documentadas**, no fronteras culturales, mapas demográficos ni una lista exhaustiva de comunidades. Las localidades costeras o fronterizas pueden aparecer sobre el borde del contorno simplificado.

El videojuego **Fragmentos de identidad** se integra después del mapa; la navegación continúa hacia Derechos humanos y cultura de paz.

## Estación 05: Caminos hacia la Paz

`/estacion/derechos-humanos` ofrece cinco puertas simbólicas: **Dignidad e igualdad**, **Identidad cultural y no discriminación**, **Justicia y reparación**, **Participación y derechos ciudadanos** y **Cultura de paz**. Cualquier puerta puede abrirse con teclado o tacto; hay controles para volver al pasillo, ir a la puerta anterior o siguiente y regresar al vestíbulo. Un indicador local distingue las puertas exploradas. La reflexión final conecta las cinco estaciones y conduce a la sala de cierre.

Las fichas separan hechos históricos, declaraciones internacionales, normas nacionales, compromisos de paz y decisiones judiciales. Citan la [Declaración Universal de Derechos Humanos (1948)](https://www.un.org/es/about-us/universal-declaration-of-human-rights), la [Constitución de Guatemala (1985)](https://guatemala.justia.com/nacionales/constitucion-de-la-republica-de-guatemala/gdoc/), el [Acuerdo sobre Identidad y Derechos de los Pueblos Indígenas (1995)](https://es.wikisource.org/wiki/Acuerdo_sobre_Identidad_y_Derechos_de_los_Pueblos_Ind%C3%ADgenas), los [Acuerdos de Paz de 1996](https://www.unesco.org/es/memory-world/lac/guatemala-peace-agreements-1996), el [informe de la CEH](https://copadeh.gob.gt/guatemala-memoria-del-silencio/), la [sentencia Sepur Zarco descrita por ONU Mujeres](https://www.unwomen.org/es/news/stories/2016/3/guatemala-victory-against-sexual-violence-in-armed-conflict) y el [reportaje histórico del sufragio reproducido por ASIES](https://asies.org.gt/inicialmente-el-proceso-electoral-era-muy-excluyente/). Los acuerdos y las reparaciones ordenadas no se presentan como medidas ya cumplidas. Los portales son ilustraciones simbólicas, no réplicas de documentos o espacios históricos.

El videojuego **La ruta de los derechos** se integra después de las cinco puertas. La visita y los resultados no se almacenan fuera de la estación.

## Fase 3: Rompiendo estereotipos

En `/estacion/genero`, después de la exploración histórica, el visitante puede clasificar diez afirmaciones ficticias entre estereotipo e igualdad. El juego ofrece arrastre en dispositivos compatibles y botones para teclado y pantallas táctiles; no hay límite de tiempo. Cada respuesta presenta una explicación antes de avanzar. La pantalla final muestra aciertos, porcentaje, una reflexión que enlaza con la estación de Violencia y opciones para volver o repetir. No se almacenan resultados personales.

Los resultados muestran una barra de aciertos y uno de cinco mensajes educativos según la puntuación: 100% (Excelente), 80–99% (Muy bien), 60–79% (Buen avance), 40–59% (Sigue explorando) y menos de 40% (Una oportunidad para aprender). Los umbrales se calculan con el porcentaje exacto de aciertos, incluso si cambia la cantidad de tarjetas; el porcentaje mostrado se redondea. El nivel describe solo la partida, nunca a la persona.

## Fase 3: Decisiones que protegen

En `/estacion/violencia`, después del Archivo de la Memoria, el visitante puede iniciar **tres capítulos ficticios contemporáneos**: «Señales que importan» (control y escucha entre amistades), «No guardar silencio ante el acoso» (intervención segura como testigo) y «Construyendo redes de apoyo» (violencia psicológica, privacidad y recursos). Cada capítulo tiene una escena inicial con tres decisiones, tres escenas de respuesta diferentes con dos decisiones cada una y tres cierres educativos: **seis rutas de decisiones por capítulo**. Es posible volver a elegir, regresar al menú y repetir capítulos. Las decisiones modifican escenas, diálogos y aprendizajes descubiertos; no hay puntuación moral ni se atribuye responsabilidad de la violencia a las víctimas.

El cierre muestra señales reconocidas, estrategias de apoyo y alternativas seguras encontradas en las rutas exploradas. El historial de decisiones solo existe durante la partida; «Salir del juego» borra el estado local. La introducción distingue la ficción de los hechos documentados del conflicto armado. No se solicitan experiencias personales ni se guarda información sensible. El juego incluye una advertencia de contenido y acceso al [portal oficial del Ministerio Público de Guatemala](https://www.mp.gob.gt/) y a su [mapa de cobertura](https://www.mp.gob.gt/mapa-de-cobertura/), sin números de contacto inventados ni pretensión de sustituir atención profesional. No existe backend ni directorio de servicios dentro del juego.

## Fase 3: Construyendo oportunidades

En `/estacion/desigualdad`, después del Observatorio, el visitante asigna **100 unidades ficticias** durante tres rondas a seis iniciativas: becas, transporte seguro, formación profesional, tecnología, prevención y participación comunitaria. Puede seleccionar hasta dos por ronda, quitar las de la ronda actual y guardar recursos para más tarde. La primera ronda presenta necesidades iniciales; la segunda incorpora transporte y prevención, descuenta un costo operativo simulado de 10 unidades y aplica una presión ficticia a economía y seguridad; la tercera permite últimas inversiones no repetidas con un bono educativo de coordinación en participación. Las opciones y los efectos cambian entre rondas. El presupuesto nunca baja de cero.

Cinco indicadores simulados se actualizan con cada inversión y un escenario vectorial responde a escuela, taller, espacio digital, movilidad y encuentro comunitario. Los índices de 0–100 **no son datos reales, predicciones ni quetzales**. El resultado desglosa gasto en proyectos y costo operativo, presupuesto restante, inversiones por ronda, evolución de indicadores desde la línea base ficticia y ventajas y límites de la estrategia elegida. No hay una combinación única correcta. `npm run check:opportunity-game` recorre cientos de estrategias y valida el cálculo determinista y el reinicio.

## Fase 3: Fragmentos de identidad

En `/estacion/multiculturalidad` hay cuatro rompecabezas 3 × 3 vinculados, en orden, con las fichas **Maya (enfoque K’iche’)**, **Garífuna**, **Xinka** y **Ladino** del Mapa Cultural. Se usan las fotos aportadas `pueblo_maya.jpeg`, `pueblo_garifuna.jpg`, `pueblo_xinka.jpeg` y `pueblo_ladino.jpg`, vinculadas desde `projectImages.ts`. **La identidad de las personas, los lugares, las fechas y la procedencia de esas fotografías no se han verificado.** Los nombres de los archivos no prueban que registren las actividades locales citadas; las fichas separan explícitamente el contexto de las fotos de los hechos documentados y conservan las fuentes de `culturalStops.ts`.

Cada nivel mezcla nueve piezas con Fisher–Yates y evita iniciar con la imagen ya resuelta. El tablero espera la proporción natural de la foto antes de mostrar las piezas; sus nueve partes reconstruyen la imagen completa sin estirarla ni recortarla. El visitante puede arrastrar piezas o seleccionar una pieza y luego una casilla con teclado, ratón o tacto; la imagen de referencia es opcional. Los nombres accesibles indican la ubicación de los fragmentos sin depender de arrastrar. Solo se colocan piezas en su posición correcta; el error recibe una sugerencia respetuosa. El tablero, el progreso local y la ficha desbloqueada se actualizan tras cada acción. Se puede reiniciar un nivel y repetir el recorrido completo sin tiempo ni calificación. Si falla una foto, se usa la ilustración SVG original de ese nivel como respaldo. `npm run check:cultural-puzzle` verifica 200 mezclas, la vinculación de las cuatro fotografías y la finalización de los cuatro niveles.

## Fase 3: La ruta de los derechos

En `/estacion/derechos-humanos`, después de las puertas históricas, un mapa **simbólico, no geográfico** conecta cinco desafíos secuenciales: (1) unir conceptos y acciones para iluminar un puente; (2) activar conexiones de una red de identidad, idiomas, derechos culturales y participación; (3) ordenar una secuencia pedagógica sobre hechos, acceso a justicia, reparación y no repetición; (4) conectar cuatro actores con dos espacios compartidos de diálogo y decisión; y (5) iluminar el sendero final con cuatro principios obtenidos en las etapas anteriores. La secuencia de justicia es **una simplificación educativa, no un procedimiento legal obligatorio**; los vínculos propuestos tampoco pretenden ser las únicas relaciones válidas fuera del juego.

Cada zona desbloquea la siguiente únicamente al completar su mecanismo, muestra una reflexión contextual y enlaza las fuentes históricas de la puerta correspondiente de `peaceDoors.ts`. El progreso es local a la partida, sin puntuación moral ni almacenamiento personal. Al completar las cinco zonas aparece un resumen de derechos y aprendizajes, con opciones para repetir y pasar a la sala final. Los recursos son SVG y CSS originales; se usan botones táctiles y de teclado y se respeta la preferencia de movimiento reducido. `npm run check:rights-route` valida mezcla, conexiones, bloqueos, final y reinicio.

## Ampliación a cinco estaciones · Etapa 1

El vestíbulo presenta cinco tarjetas en una cuadrícula equilibrada (tres arriba, dos abajo; una columna en móvil). Las estaciones 04 **Identidad cultural y multiculturalidad** y 05 **Derechos humanos y cultura de paz** tienen identidad cromática propia. El recorrido enlaza la estación 03 con 04, 04 con 05 y 05 con la sala final.

## Pendiente de próximas fases

La sala final y un directorio institucional amplio recibirán contenido en las fases siguientes. Los estados de los cinco juegos solo duran mientras permanece abierta cada estación; no se conservan como progreso del museo. No se recopilan datos personales ni sensibles.

Esta separación permite que integrantes del equipo trabajen en contenido (`data/`), experiencias (`pages/` o futuros componentes de juegos) y presentación (`components/`, `styles.css`) sin mezclar responsabilidades.
