# Plan — Será porque te amo

## Alcance e implementación

Aplicación web de una página, en español, dedicada al MP3 proporcionado por la persona usuaria. La letra enviada se sincroniza con el tiempo del audio, pero solo se muestra una línea vigente, una a la vez, dentro del medallón visual en el lugar del disco; no aparece un panel separado con la letra completa. Los controles ofrecen reproducir, pausa, búsqueda precisa en la barra, volumen y repetición; la reproducción empieza por acción explícita. La aplicación usa HTML, CSS y JavaScript nativos; Node.js la sirve en el puerto 3000. El servidor responde solicitudes de rango de bytes del MP3 con HTTP 206 y `Content-Range` para que el navegador pueda saltar a puntos del audio. No se necesita base de datos.

## Estructura del proyecto

- `index.html`: encabezado, medallón de letra actual, reproductor y pie.
- `src/styles.css`: diseño adaptable en verde tinta, marfil y oro champagne.
- `src/app.js`: controles, lectura LRC y actualización de una línea sincronizada; la barra actualiza su posición al soltar.
- `public/audio/sera-porque-te-amo.mp3`: audio adjunto.
- `public/lyrics/sera-porque-te-amo.lrc`: letra enviada con tiempos aproximados.
- `public/mark.svg`: icono del sitio.
- `public/manus-routes.json`: manifiesto de la ruta `/`.
- `server.js`: servidor Node con soporte de solicitudes HTTP Range para audio.
- `package.json`: comandos de ejecución.
- `app.config.ts`: identidad del proyecto.

## Dirección visual

Estilos considerados: **jardín nocturno y oro antiguo** (0.081), **marfil de carta manuscrita y olivo** (0.064), **grafito mineral y platino** (0.027). Se elige jardín nocturno y oro antiguo para una atmósfera íntima y elegante sin rosa ni rojo.

- **Movimiento de diseño:** editorial musical romántico contemporáneo, con un medallón tipográfico en vez de un tocadiscos.
- **Principios:** intimidad sin empalago; letra legible en primer plano; controles discretos; contraste cálido y accesible.
- **Color:** verde tinta profundo y matices oliva como base; marfil para lectura; oro champagne reservado para acentos. Sin rosa ni rojo.
- **Disposición:** dos columnas asimétricas en escritorio —medallón de letra a la izquierda y canción/reproductor a la derecha—, apiladas en móvil.
- **Elementos distintivos:** marco circular fino en oro alrededor de la línea; contador pequeño y estrella discreta.
- **Interacción y animación:** solo la frase sincronizada aparece en el medallón y cambia con transición suave; controles claros; respetar `prefers-reduced-motion`.
- **Tipografía:** Cormorant Garamond para letra y título; DM Sans para controles y microtexto.
- **Esencia y voz:** un espacio sereno para vivir esta canción; íntimo, elegante y cálido. «Haz espacio para esta canción.» y «La letra acompaña cada momento.»
- **Logotipo:** monograma “S” dentro de anillos finos, en oro sobre verde tinta.
- **Color de marca:** oro champagne (`#bfae78`).
