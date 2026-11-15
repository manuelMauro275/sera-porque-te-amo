import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));
const port = Number(process.env.PORT || 3000);
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.mp3': 'audio/mpeg',
  '.lrc': 'text/plain; charset=utf-8',
};

const server = createServer(async (request, response) => {
  const pathname = new URL(request.url || '/', 'http://localhost').pathname;
  const relativePath = pathname === '/manus-routes.json'
    ? 'public/manus-routes.json'
    : pathname === '/' ? 'index.html' : pathname.slice(1);
  const safePath = normalize(relativePath).replace(/^\.\.(\/|\\|$)/, '');
  try {
    const body = await readFile(join(root, safePath));
    const fileType = extname(safePath);
    const headers = {
      'Content-Type': mime[fileType] || 'application/octet-stream',
      'Cache-Control': 'no-store',
      'Content-Length': body.length,
    };
    if (fileType === '.mp3') {
      headers['Accept-Ranges'] = 'bytes';
      const range = request.headers.range?.match(/^bytes=(\d*)-(\d*)$/);
      if (request.headers.range && !range) {
        response.writeHead(416, { ...headers, 'Content-Range': `bytes */${body.length}` });
        response.end();
        return;
      }
      if (range) {
        const size = body.length;
        const suffixLength = range[1] === '' ? Number(range[2]) : 0;
        const start = range[1] === '' ? Math.max(0, size - suffixLength) : Number(range[1]);
        const end = range[1] === '' || range[2] === '' ? size - 1 : Math.min(Number(range[2]), size - 1);
        if (start >= size || start > end || suffixLength === 0 && range[1] === '') {
          response.writeHead(416, { ...headers, 'Content-Range': `bytes */${size}` });
          response.end();
          return;
        }
        const chunk = body.subarray(start, end + 1);
        response.writeHead(206, {
          ...headers,
          'Content-Length': chunk.length,
          'Content-Range': `bytes ${start}-${end}/${size}`,
        });
        response.end(chunk);
        return;
      }
    }
    response.writeHead(200, headers);
    response.end(body);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('No encontrado');
  }
});

server.listen(port, '0.0.0.0', () => console.log(`Escucha lista en el puerto ${port}`));
