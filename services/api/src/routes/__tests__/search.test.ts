import assert from 'node:assert/strict';
import { once } from 'node:events';

import { createAppServer } from '../../server.ts';

async function runTest(name: string, fn: () => Promise<void>) {
  try {
    await fn();
    console.log(`PASS ${name}`);
  } catch (error) {
    console.error(`FAIL ${name}`);
    throw error;
  }
}

await runTest('returns country, city, youtuber, and place hits in one response', async () => {
  const server = createAppServer();

  server.listen(0, '127.0.0.1');
  await once(server, 'listening');

  const address = server.address();
  if (address == null || typeof address === 'string') {
    throw new Error('Server address not available');
  }

  try {
    const response = await fetch(`http://127.0.0.1:${address.port}/search?q=일`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.ok(
      body.results.some((result: { entityType: string }) => result.entityType === 'country'),
    );
    assert.ok(body.results.some((result: { entityType: string }) => result.entityType === 'city'));
    assert.ok(
      body.results.some((result: { entityType: string }) => result.entityType === 'youtuber'),
    );
    assert.ok(body.results.some((result: { entityType: string }) => result.entityType === 'place'));
  } finally {
    server.close();
    await once(server, 'close');
  }
});
