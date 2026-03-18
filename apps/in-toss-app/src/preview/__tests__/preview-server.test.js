import assert from 'node:assert/strict';
import { once } from 'node:events';

import { createPreviewServer } from '../server.js';

async function runTest(name, fn) {
  try {
    await fn();
    console.log(`PASS ${name}`);
  } catch (error) {
    console.error(`FAIL ${name}`);
    throw error;
  }
}

await runTest('serves a browsable preview with countries and youtubers', async () => {
  const server = createPreviewServer();

  server.listen(0, '127.0.0.1');
  await once(server, 'listening');

  const address = server.address();
  if (address == null || typeof address === 'string') {
    throw new Error('Preview server address not available');
  }

  try {
    const response = await fetch(`http://127.0.0.1:${address.port}/countries/country-jp`);
    const html = await response.text();

    assert.equal(response.status, 200);
    assert.match(html, /여행 유튜버 코스/);
    assert.match(html, /국가/);
    assert.match(html, /유튜버/);
    assert.match(html, /도쿄/);
    assert.match(html, /빠니보틀/);
  } finally {
    server.close();
    await once(server, 'close');
  }
});
