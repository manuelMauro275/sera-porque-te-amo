# Plan — Será porque te amo

## Alcance e implementación

Crear una experiencia web de una página, en español y adaptable a móvil, dedicada únicamente al archivo de audio proporcionado por la persona usuaria. La canción reproducida será esa grabación integrada en el proyecto; los controles permiten iniciar, pausar, buscar, ajustar volumen y repetir. La letra proporcionada por la persona usuaria se incorpora en formato LRC y las líneas avanzan según sus marcas de tiempo. Los tiempos de algunas líneas se estimaron al subdividir frases reconocidas en segmentos; no se seleccionan otras canciones, no hay autoplay y la persona debe iniciar la reproducción.

La aplicación usa HTML, CSS y JavaScript nativos; Node.js sirve la app en el puerto 3000. El elemento `audio` reproduce el archivo MP3 local al proyecto, mientras JavaScript carga el LRC, selecciona la línea vigente con el avance del audio y desplaza la vista de letra. No se requiere base de datos ni inicio de sesión.

## Estructura del proyecto

- `index.html`: estructura, título de pista, reproductor y panel de letra.
- `src/styles.css`: diseño adaptable, controles y estilos de sincronización.
- `src/app.js`: reproducción del único audio, tiempo, volumen, controles y seguimiento de línea LRC.
- `public/audio/sera-porque-te-amo.mp3`: archivo de audio adjunto proporcionado por la persona usuaria.
- `public/lyrics/sera-porque-te-amo.lrc`: letra proporcionada por la persona usuaria y marcas de tiempo aproximadas.
- `public/manus-routes.json`: manifiesto de la única ruta (`/`).
- `server.js`: servidor Node ligero.
- `package.json`: comandos para ejecutar.
- `app.config.ts`: identidad del proyecto.

## Diseño

Estilos considerados: **editorial de vinilo italiano de los setenta** (0.081), **romanticismo de cine en tonos borgoña** (0.064), **minimalismo de galería en marfil y grafito** (0.027). Se elige el primero para evocar la época y calidez de la canción sin imitar una portada comercial.

- **Movimiento de diseño:** editorial musical italiana de los años setenta, reinterpretada con pulcritud contemporánea.
- **Principios:** cálido sin exceso de adornos; controles claramente utilizables; jerarquía tipográfica expresiva; el disco como motivo visual.
- **Filosofía de color:** fondo tinta-borgoña y crema de papel, con acentos cobre/terracota; evoca una escucha íntima y una carátula de vinilo añeja.
- **Paradigma de disposición:** composición editorial asimétrica en dos zonas —identidad/arte del disco y escucha/letra— que se apila verticalmente en pantallas estrechas.
- **Elementos distintivos:** vinilo ilustrado con CSS y etiqueta central; pequeños filetes de cobre y numeración de pista; halo suave durante la reproducción.
- **Interacción:** pocos controles directos y grandes; la letra sigue el audio; diseño accesible y estados claros.
- **Animación:** giro lento del vinilo únicamente al reproducir; transiciones breves en la línea activa; respetar `prefers-reduced-motion`.
- **Tipografía:** Cormorant Garamond (serif de exhibición) y DM Sans (sans-serif) con familias de reserva.
- **Esencia de marca:** un rincón personal para escuchar este clásico con su letra sincronizada; cercana, elegante y nostálgica.
- **Voz:** cálida y directa. «Haz espacio para esta canción.» y «La letra sigue la música.»
- **Logotipo:** monograma «S» como surco circular de vinilo dentro de una etiqueta.
- **Color de marca:** cobre quemado (`#c87952`).
