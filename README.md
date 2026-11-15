# Será porque te amo — reproductor sincronizado

## Tecnologías

HTML5 para la página, CSS3 para el diseño adaptable, JavaScript (ES modules) para el reproductor y la sincronización, y Node.js para servir la aplicación. No se usan frameworks ni paquetes externos de Node.

## Ejecutar

Requiere Node.js 18 o posterior. Desde esta carpeta, ejecuta `npm run dev` y abre `http://localhost:3000`.

## Archivos principales

- `index.html`: página, medallón de la letra actual y controles.
- `src/styles.css`: diseño para escritorio y móvil.
- `src/app.js`: reproducción, controles, barra de búsqueda y línea LRC vigente.
- `public/audio/sera-porque-te-amo.mp3`: grabación proporcionada para esta app.
- `public/lyrics/sera-porque-te-amo.lrc`: letra enviada por la persona usuaria con marcas de tiempo.
- `server.js`: servidor local con soporte HTTP Range (`206 Partial Content`) para que la búsqueda salte a la posición solicitada del MP3.

La letra aparece de una línea a la vez. Los tiempos de algunas líneas se aproximaron al subdividir frases reconocidas en segmentos.
