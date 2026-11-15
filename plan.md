# Plan — Será porque te amo

## Alcance e implementación

Aplicación web de una página, en español, dedicada al MP3 proporcionado por la persona usuaria. La letra enviada se sincroniza con el tiempo del audio, pero solo se muestra una línea vigente, una a la vez, dentro de la zona visual antes ocupada por el disco; no aparece un panel separado con la letra completa. Los controles ofrecen reproducir, pausa, búsqueda, volumen y repetición; la reproducción empieza por acción explícita. La app usa HTML, CSS y JavaScript nativos, y Node.js la sirve en el puerto 3000. El recurso de audio, archivo LRC y estilos son estáticos; no se necesita base de datos.

## Estructura del proyecto

- `index.html`: encabezado, medallón para la línea actual, reproductor y pie.
- `src/styles.css`: diseño adaptable con verde tinta, marfil y oro champagne; estados de letra y controles.
- `src/app.js`: controles, lectura de marcas LRC y actualización de la única línea vigente.
- `public/audio/sera-porque-te-amo.mp3`: audio adjunto.
- `public/lyrics/sera-porque-te-amo.lrc`: letra enviada por la persona usuaria y marcas aproximadas.
- `public/mark.svg`: icono del sitio.
- `public/manus-routes.json`: manifiesto de la ruta `/`.
- `server.js`, `package.json`: servidor Node y comandos.
- `app.config.ts`: identidad del proyecto.

## Dirección visual

Estilos considerados: **jardín nocturno y oro antiguo** (0.081), **marfil de carta manuscrita y olivo** (0.064), **grafito mineral y platino** (0.027). Se elige jardín nocturno y oro antiguo para una atmósfera íntima y elegante sin rosa ni rojo.

- **Movimiento de diseño:** editorial musical romántico contemporáneo, con un medallón tipográfico en vez de un tocadiscos.
- **Principios:** intimidad sin empalago; letra legible en primer plano; controles discretos; contraste cálido y accesible.
- **Color:** verde tinta profundo y matices oliva como base; marfil para lectura; oro champagne reservado para acentos y detalles. Sin rosa ni rojo.
- **Disposición:** dos columnas asimétricas en escritorio: letra en un medallón circular a la izquierda, canción y reproductor a la derecha; en móvil, medallón arriba y reproductor debajo.
- **Elementos distintivos:** marco circular fino en oro alrededor de la línea; numerador de líneas pequeño; acento de estrella discreta.
- **Interacción y animación:** únicamente la frase sincronizada aparece en el medallón y cambia con una transición suave; controles grandes y claros; respetar `prefers-reduced-motion`.
- **Tipografía:** Cormorant Garamond para letra y título; DM Sans para controles y microtexto.
- **Esencia y voz:** un espacio sereno para vivir esta canción, íntimo, elegante y cálido. Ejemplos: «Haz espacio para esta canción.» y «La letra acompaña cada momento.»
- **Logotipo:** monograma “S” dentro de anillos finos, en oro sobre verde tinta.
- **Color de marca:** oro champagne (`#bfae78`).
