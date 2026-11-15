# Plan — Será porque te amo

## Alcance e implementación

Aplicación web de una página, en español, dedicada al MP3 proporcionado por la persona usuaria. La persona selecciona varias fotos desde su dispositivo para un pase de diapositivas circular; mientras la canción suena, las fotos cambian cada seis segundos y una línea de la letra se superpone en el mismo medallón. La letra avanza según el audio, no se muestra un panel separado con la letra completa y no se empieza a reproducir sin una acción explícita. El usuario puede avanzar o retroceder fotos manualmente. Los archivos de imagen se usan como URL temporales locales del navegador, no se suben ni guardan de manera persistente. Los controles de audio permiten reproducir, pausa, búsqueda, volumen y repetición. El servidor Node responde solicitudes de rango del MP3 con HTTP 206 y `Content-Range`; no se necesita base de datos.

## Estructura del proyecto

- `index.html`: encabezado, medallón de fotos y letra, controles de fotos y reproductor.
- `src/styles.css`: diseño adaptable en verde tinta, marfil y oro champagne; superposición legible sobre fotografía.
- `src/app.js`: reproducción, solicitudes de búsqueda, sincronización de letra y ciclo temporal de imágenes.
- `public/audio/sera-porque-te-amo.mp3`: audio adjunto.
- `public/lyrics/sera-porque-te-amo.lrc`: letra enviada con tiempos aproximados.
- `public/mark.svg`: icono del sitio.
- `public/manus-routes.json`: manifiesto de la ruta `/`.
- `server.js`: servidor Node con soporte de HTTP Range.
- `package.json`: comandos de ejecución.
- `app.config.ts`: identidad del proyecto.

## Dirección visual

Estilos considerados: **jardín nocturno y oro antiguo** (0.081), **marfil de carta manuscrita y olivo** (0.064), **grafito mineral y platino** (0.027). Se elige jardín nocturno y oro antiguo para una atmósfera íntima y elegante sin rosa ni rojo.

- **Movimiento de diseño:** editorial musical romántico contemporáneo, con un medallón circular que enmarca fotos y letra en vez de un tocadiscos.
- **Principios:** intimidad sin empalago; recuerdo fotográfico y línea cantada integrados; letra legible; controles discretos.
- **Color:** verde tinta y oliva como base; marfil para lectura; oro champagne para bordes y acentos. Sin rosa ni rojo.
- **Disposición:** medallón fotográfico a la izquierda y pista/reproductor a la derecha en escritorio; pila vertical en móvil.
- **Elementos distintivos:** marco circular fino en oro, tarjeta oscura translúcida para la letra y contador mínimo.
- **Interacción y animación:** fotos locales cruzan lentamente mientras suena la pista; la frase vigente cambia con una transición suave; controles manuales discretos; respetar `prefers-reduced-motion`.
- **Tipografía:** Cormorant Garamond para letra y título; DM Sans para controles y microtexto.
- **Esencia y voz:** un espacio sereno para recordar a alguien especial junto a esta canción; íntimo, elegante y cálido.
- **Logotipo:** monograma “S” dentro de anillos finos, en oro sobre verde tinta.
- **Color de marca:** oro champagne (`#bfae78`).
