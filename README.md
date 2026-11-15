# Será porque te amo — reproductor sincronizado

## Tecnologías

HTML5 para la página, CSS3 para el diseño adaptable, JavaScript (ES modules) para el reproductor y la sincronización, y Node.js para servir la aplicación. No se usan frameworks ni paquetes externos de Node.

## Ejecutar

Requiere Node.js 18 o posterior. Desde esta carpeta, ejecuta `npm run dev` y abre `http://localhost:3000`.

## Archivos principales

- `index.html`: página y controles.
- `src/styles.css`: diseño para escritorio y móvil.
- `src/app.js`: audio, controles y letra activa sincronizada.
- `public/audio/sera-porque-te-amo.mp3`: grabación proporcionada para esta app.
- `public/lyrics/sera-porque-te-amo.lrc`: letra enviada por la persona usuaria con marcas de tiempo.
- `server.js`: servidor local.

La letra se muestra y desplaza al compás de la pista. Los tiempos de algunas líneas son aproximados porque una frase se subdividió a partir de marcas de tiempo por segmentos.
