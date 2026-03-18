import http from 'node:http';
import { fileURLToPath } from 'node:url';

import { renderPreviewPage } from './renderPage.js';

export function createPreviewServer() {
  return http.createServer((request, response) => {
    const url = new URL(request.url ?? '/', 'http://localhost');

    if (request.method !== 'GET') {
      response.writeHead(405, { 'content-type': 'text/plain; charset=utf-8' });
      response.end('Method not allowed');
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
