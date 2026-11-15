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
    response.writeHead(200, { 'Content-Type': mime[extname(safePath)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    response.end(body);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('No encontrado');
  }
});

server.listen(port, '0.0.0.0', () => console.log(`Escucha lista en el puerto ${port}`));
