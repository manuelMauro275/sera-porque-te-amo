# Plan — Será porque te amo

## Alcance e implementación

Crear una aplicación web de una sola página, en español y adaptable a móvil, para escuchar “Será porque te amo” cuando la persona usuaria aporte un archivo de audio local autorizado. No se incluirá el audio comercial ni se reproducirá automáticamente desde una fuente externa. La persona podrá pegar su propia letra o cargar un archivo de texto con contenido que tenga derecho a usar. Las líneas con marcas de tiempo ` [mm:ss] ` podrán sincronizarse con la reproducción; el texto sin marcas se mostrará como letra legible sin sincronización automática. Los medios y letras se procesarán en el navegador y no se subirán a un servidor. La aplicación no traerá incorporada la letra protegida.

La implementación usará HTML, CSS y JavaScript nativos, sin dependencias externas, con un servidor Node mínimo para Preview en el puerto configurado de 3000. El elemento de audio del navegador se encargará de decodificar y reproducir el archivo local; JavaScript gestionará controles, tiempo, progreso y la línea activa. No se requiere base de datos ni inicio de sesión.

## Estructura del proyecto

- `index.html`: estructura semántica, controles, zona de letra y selección de archivos.
- `src/styles.css`: sistema visual responsivo, reproductor, animaciones y estados accesibles.
- `src/app.js`: carga local de audio y letra, controles y sincronización por marcas de tiempo.
- `server.js`: servidor local sencillo para Preview, sin persistencia ni carga remota de archivos.
- `public/manus-routes.json`: manifiesto de rutas de la única página (`/`).
- `package.json`: comandos de ejecución, sin dependencias de runtime.
- `app.config.ts`: metadatos de marca del proyecto.

## Diseño

Estilos considerados: **editorial de vinilo italiano de los setenta** (0.081), **romanticismo de cine en tonos borgoña** (0.064), **minimalismo de galería en marfil y grafito** (0.027). Se elige el primero para evocar la época y calidez de la canción sin imitar una portada comercial.

- **Movimiento de diseño:** editorial musical italiana de los años setenta, reinterpretada con pulcritud contemporánea.
- **Principios:** cálido sin exceso de adornos; controles claramente utilizables; jerarquía tipográfica expresiva; el disco como motivo visual, no como decoración invasiva.
- **Filosofía de color:** fondo tinta-borgoña y crema de papel, con acentos cobre/terracota; evoca una escucha íntima y una carátula de vinilo añeja.
- **Paradigma de disposición:** composición editorial asimétrica en dos zonas —identidad/arte del disco y escucha/letra— que se apila verticalmente en pantallas estrechas.
- **Elementos distintivos:** vinilo ilustrado con CSS y etiqueta central; pequeños filetes de cobre y numeración de pista; halo suave que acompaña el estado de reproducción.
- **Interacción:** pocos controles directos y grandes; selección de archivos transparente, posibilidad de editar la letra, estados accesibles y guía clara cuando aún no se ha cargado contenido.
- **Animación:** giro lento del vinilo únicamente al reproducir; transiciones breves de opacidad y posición en controles y línea activa; respetar `prefers-reduced-motion`.
- **Tipografía:** Cormorant Garamond (serif de exhibición) para título y letra, combinada con DM Sans (sans-serif) para controles y microtexto, con familias de reserva seguras.
- **Esencia de marca:** un rincón personal para escuchar un clásico y acompañarlo con la letra propia; cercana, elegante y nostálgica.
- **Voz:** cálida, directa y sin grandilocuencia. Ejemplos: «Haz espacio para esta canción.» y «Tu música y tu letra se quedan en este dispositivo.»
- **Logotipo:** monograma «S» trazado como surco circular de vinilo, dentro de una etiqueta circular.
- **Color de marca:** cobre quemado (`#c87952`).
