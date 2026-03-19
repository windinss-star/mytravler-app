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
    assert.match(html, /route map/i);
    assert.match(html, /route legend/i);
    assert.match(html, /trip day/i);
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

await runTest('serves a search preview with mixed entity results', async () => {
  const server = createPreviewServer();

  server.listen(0, '127.0.0.1');
  await once(server, 'listening');

  const address = server.address();
  if (address == null || typeof address === 'string') {
    throw new Error('Preview server address not available');
  }

  try {
    const response = await fetch(`http://127.0.0.1:${address.port}/search?q=%EC%9D%BC`);
    const html = await response.text();

    assert.equal(response.status, 200);
    assert.match(html, /검색 결과/);
    assert.match(html, /Japan/);
    assert.match(html, /Pani Bottle/);
    assert.match(html, /Tsukiji Outer Market/);
  } finally {
    server.close();
    await once(server, 'close');
  }
});

await runTest('serves a my preview with recents, notifications, and policy links', async () => {
  const server = createPreviewServer();

  server.listen(0, '127.0.0.1');
  await once(server, 'listening');

  const address = server.address();
  if (address == null || typeof address === 'string') {
    throw new Error('Preview server address not available');
  }

  try {
    const response = await fetch(`http://127.0.0.1:${address.port}/my`);
    const html = await response.text();

    assert.equal(response.status, 200);
    assert.match(html, /최근 본 코스/);
    assert.match(html, /알림 설정/);
    assert.match(html, /서비스 약관/);
    assert.match(html, /빠니보틀/);
  } finally {
    server.close();
    await once(server, 'close');
  }
});

await runTest('serves a map hub preview with multiple course routes', async () => {
  const server = createPreviewServer();

  server.listen(0, '127.0.0.1');
  await once(server, 'listening');

  const address = server.address();
  if (address == null || typeof address === 'string') {
    throw new Error('Preview server address not available');
  }

  try {
    const response = await fetch(`http://127.0.0.1:${address.port}/map`);
    const html = await response.text();

    assert.equal(response.status, 200);
    assert.match(html, /route hub/i);
    assert.match(html, /active routes/i);
    assert.match(html, /active course/i);
    assert.match(html, /selected youtuber/i);
    assert.match(html, /filter by country/i);
    assert.match(html, /other routes in region/i);
    assert.match(html, /regional blocks/i);
    assert.match(html, /youtuber start badges/i);
    assert.match(html, /arrival badge/i);
    assert.match(html, /stops in this route/i);
    assert.match(html, /route details/i);
    assert.match(html, /Tsukiji Outer Market/);
    assert.doesNotMatch(html, /remaining time/i);
    assert.doesNotMatch(html, /youtuber start markers/i);
    assert.match(html, /빠니보틀 도쿄 하루 압축 코스/);
    assert.match(html, /곽튜브 후쿠오카 야식 코스/);
  } finally {
    server.close();
    await once(server, 'close');
  }
});
