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

await runTest('serves a course detail preview with route summary', async () => {
  const server = createPreviewServer();

  server.listen(0, '127.0.0.1');
  await once(server, 'listening');

  const address = server.address();
  if (address == null || typeof address === 'string') {
    throw new Error('Preview server address not available');
  }

  try {
    const response = await fetch(`http://127.0.0.1:${address.port}/courses/course-pani-tokyo-1`);
    const html = await response.text();

    assert.equal(response.status, 200);
    assert.match(html, /대표 코스/);
    assert.match(html, /방문 장소/);
    assert.match(html, /Tsukiji Outer Market/);
  } finally {
    server.close();
    await once(server, 'close');
  }
});

await runTest('serves a place detail preview with snapshot metadata', async () => {
  const server = createPreviewServer();

  server.listen(0, '127.0.0.1');
  await once(server, 'listening');

  const address = server.address();
  if (address == null || typeof address === 'string') {
    throw new Error('Preview server address not available');
  }

  try {
    const response = await fetch(`http://127.0.0.1:${address.port}/places/place-tokyo-1`);
    const html = await response.text();

    assert.equal(response.status, 200);
    assert.match(html, /장소 상세/);
    assert.match(html, /Seafood breakfast market stop/);
    assert.match(html, /opening hours/i);
  } finally {
    server.close();
    await once(server, 'close');
  }
});
