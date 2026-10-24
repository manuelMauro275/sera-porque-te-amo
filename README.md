# Será porque te amo — reproductor local

## Lenguajes y tecnologías

- HTML5: estructura de la página.
- CSS3: diseño adaptable, vinilo ilustrado y controles.
- JavaScript (ES modules): reproducción, selección de archivos y sincronización de letra.
- Node.js: servidor pequeño para abrir la aplicación en Preview.

No usa frameworks ni paquetes externos de Node.

## Ejecutar

Requiere Node.js 18 o posterior. En la carpeta del proyecto, ejecuta:

```bash
npm run dev
```

Luego abre `http://localhost:3000`.

## Archivos principales

- `index.html`: contenido y controles.
- `src/styles.css`: diseño y estilos móviles.
- `src/app.js`: comportamiento del reproductor y sincronización de letra.
- `server.js`: servidor local.
- `public/manus-routes.json`: declaración de la ruta principal.

El audio se elige desde tu propio dispositivo y no se carga a un servidor. Puedes pegar una letra propia autorizada o cargar un `.txt`. Para marcar la sincronización, comienza cada línea con una marca como `[00:12]`.
