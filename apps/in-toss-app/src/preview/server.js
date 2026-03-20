import http from 'node:http';
import { createReadStream, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { renderPreviewPage } from './renderPage.js';

const previewDir = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.resolve(previewDir, '../../assets');

function getContentType(filePath) {
  const extension = path.extname(filePath).toLowerCase();

  if (extension === '.jpg' || extension === '.jpeg') {
    return 'image/jpeg';
  }

  if (extension === '.png') {
    return 'image/png';
  }

  if (extension === '.webp') {
    return 'image/webp';
  }

  if (extension === '.svg') {
    return 'image/svg+xml';
  }

  return 'application/octet-stream';
}

export function createPreviewServer() {
  return http.createServer((request, response) => {
    const url = new URL(request.url ?? '/', 'http://localhost');

    if (request.method !== 'GET') {
      response.writeHead(405, { 'content-type': 'text/plain; charset=utf-8' });
      response.end('Method not allowed');
      return;
    }

    if (url.pathname.startsWith('/assets/')) {
      const assetPath = path.resolve(assetsDir, `.${url.pathname.replace('/assets', '')}`);

      if (!assetPath.startsWith(assetsDir) || !existsSync(assetPath)) {
        response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
        response.end('Not found');
        return;
      }

      response.writeHead(200, { 'content-type': getContentType(assetPath) });
      createReadStream(assetPath).pipe(response);
      return;
    }

    const html = renderPreviewPage(url.pathname, url.searchParams);

    response.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    response.end(html);
  });
}

const isEntrypoint = process.argv[1] != null && process.argv[1] === fileURLToPath(import.meta.url);

if (isEntrypoint) {
  const port = Number(process.env.PORT ?? '4310');
  const server = createPreviewServer();

  server.listen(port, '127.0.0.1', () => {
    console.log(`Preview server running at http://127.0.0.1:${port}`);
  });
}
