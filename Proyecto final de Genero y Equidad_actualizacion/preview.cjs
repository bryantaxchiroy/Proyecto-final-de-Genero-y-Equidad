const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const dist = path.join(__dirname, 'dist');
const port = 4173;
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
};

http.createServer((request, response) => {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  } catch {
    response.writeHead(400).end('Solicitud incorrecta');
    return;
  }

  const requested = path.resolve(dist, `.${pathname}`);
  if (requested !== dist && !requested.startsWith(dist + path.sep)) {
    response.writeHead(403).end('Acceso denegado');
    return;
  }

  const isAsset = pathname.startsWith('/assets/');
  const file = fs.existsSync(requested) && fs.statSync(requested).isFile()
    ? requested
    : isAsset ? null : path.join(dist, 'index.html');

  if (!file) {
    response.writeHead(404).end('Archivo no encontrado');
    return;
  }

  response.setHeader('Content-Type', types[path.extname(file).toLowerCase()] || 'application/octet-stream');
  fs.createReadStream(file).pipe(response);
}).listen(port, '127.0.0.1', () => {
  console.log(`Museo disponible en http://127.0.0.1:${port}/sala-final`);
  console.log('Pulsa Ctrl+C para detenerlo.');
});
