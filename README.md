# Será porque te amo — fotos y letra sincronizada

## Tecnologías

HTML5 para la página, CSS3 para el diseño adaptable, JavaScript (ES modules) para el reproductor y la sincronización, y Node.js para servir la aplicación. No se usan frameworks ni paquetes externos de Node.

## Ejecutar

Requiere Node.js 18 o posterior. Desde esta carpeta, ejecuta `npm run dev` y abre `http://localhost:3000`.

## Archivos principales

- `index.html`: página, medallón de fotos con letra superpuesta y controles.
- `src/styles.css`: diseño para escritorio y móvil.
- `src/app.js`: reproducción, barra de búsqueda, letra sincronizada y pase de diapositivas.
- `public/audio/sera-porque-te-amo.mp3`: grabación integrada.
- `public/lyrics/sera-porque-te-amo.lrc`: letra proporcionada por la persona usuaria con marcas de tiempo.
- `server.js`: servidor local con soporte HTTP Range para poder saltar dentro del MP3.

Elige **Añadir fotos** para seleccionar varias imágenes en el dispositivo. Se muestran en un pase cada seis segundos mientras se reproduce la canción; puedes avanzar o retroceder manualmente si seleccionas varias. La letra sigue apareciendo sobre las fotos en el mismo medallón. Las imágenes se manejan localmente en el navegador, no se suben al servidor y tendrás que volver a elegirlas al abrir la app en otra sesión.
