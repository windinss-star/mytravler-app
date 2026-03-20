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

await runTest('serves a country detail preview with map summary and city-first sections', async () => {
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
    assert.match(html, /일본/);
    assert.match(html, /Japan/);
    assert.match(html, /대표 도시/);
    assert.match(html, /대표 코스/);
    assert.match(html, /도쿄/);
    assert.match(html, /후쿠오카/);
    assert.match(html, /country-detail-map/);
    assert.match(html, /country-detail-flag-badge/);
    assert.match(html, /\/assets\/countries\/flag-jp\.svg/);
    assert.match(html, /country-city-list/);
    assert.match(html, /country-featured-courses/);
    assert.match(html, /country-detail-youtuber-stack/);
    assert.doesNotMatch(html, /country-related-youtubers/);
    assert.doesNotMatch(html, /country-city-description/);
    assert.doesNotMatch(html, /country-city-lead-course/);
    assert.match(html, /country-course-avatar/);
    assert.match(html, /빠니보틀 도쿄 하루 압축 여행/);
    assert.doesNotMatch(html, /country-section-title">국가 요약 지도/);
    assert.match(html, /\/countries\/country-jp\/cities\/city-tokyo/);
  } finally {
    server.close();
    await once(server, 'close');
  }
});

await runTest('serves a city course list preview from the country detail flow', async () => {
  const server = createPreviewServer();

  server.listen(0, '127.0.0.1');
  await once(server, 'listening');

  const address = server.address();
  if (address == null || typeof address === 'string') {
    throw new Error('Preview server address not available');
  }

  try {
    const response = await fetch(`http://127.0.0.1:${address.port}/countries/country-jp/cities/city-tokyo`);
    const html = await response.text();

    assert.equal(response.status, 200);
    assert.match(html, /도쿄/);
    assert.match(html, /Tokyo/);
    assert.match(html, /도시 코스/);
    assert.match(html, /빠니보틀 도쿄 하루 압축 여행/);
    assert.match(html, /체코제이 도쿄 동네 산책 여행/);
    assert.match(html, /country-city-course-list/);
    assert.match(html, /country-city-youtuber-stack/);
    assert.match(html, /방문 장소 2곳/);
    assert.match(html, /여행 시간 2시간 40분/);
    assert.doesNotMatch(html, /츠키지 장외시장 \(Tsukiji Outer Market\)/);
    assert.doesNotMatch(html, /센소지 \(Senso-ji\)/);
    assert.match(html, /시장 아침 식사와 아사쿠사 도보 동선을 담은 하루 여행/);
    assert.match(html, /country-course-tag-list/);
    assert.match(html, /당일치기/);
    assert.match(html, /시장/);
  } finally {
    server.close();
    await once(server, 'close');
  }
});

await runTest('serves a country selector preview with search and representative youtubers', async () => {
  const server = createPreviewServer();

  server.listen(0, '127.0.0.1');
  await once(server, 'listening');

  const address = server.address();
  if (address == null || typeof address === 'string') {
    throw new Error('Preview server address not available');
  }

  try {
    const response = await fetch(`http://127.0.0.1:${address.port}/countries`);
    const html = await response.text();

    assert.equal(response.status, 200);
    assert.match(html, /국가 선택/);
    assert.match(html, /국가를 검색해보세요/);
    assert.match(html, /Japan/);
    assert.match(html, /Vietnam/);
    assert.match(html, /\/assets\/countries\/flag-vn\.svg/);
    assert.match(html, /\/assets\/countries\/flag-jp\.svg/);
    assert.match(html, /country-youtuber-stack/);
    assert.match(html, /country-youtuber-stack-item/);
    assert.match(html, /\.country-youtuber-stack \{[^}]*padding-left: 28px;/);
    assert.match(html, /\.country-youtuber-stack-item \{[^}]*margin-left: -28px;/);
    const avatarMatches = html.match(/\/assets\/common\/youtuber-avatar\.jpg/g) ?? [];
    assert.ok(avatarMatches.length >= 4);
    assert.match(html, /country-list-item/);
    assert.match(html, /country-flag-badge/);
  } finally {
    server.close();
    await once(server, 'close');
  }
});

await runTest('serves a home preview with dark list menu and service header', async () => {
  const server = createPreviewServer();

  server.listen(0, '127.0.0.1');
  await once(server, 'listening');

  const address = server.address();
  if (address == null || typeof address === 'string') {
    throw new Error('Preview server address not available');
  }

  try {
    const response = await fetch(`http://127.0.0.1:${address.port}/`);
    const html = await response.text();

    assert.equal(response.status, 200);
    assert.match(html, /마이트래블/);
    assert.match(html, /나라, 도시, 유튜버, 코스를 검색해보세요/);
    assert.match(html, /국가 선택/);
    assert.match(html, /유튜버 선택/);
    assert.match(html, /실시간 인기 여행지/);
    assert.match(html, /실시간 인기 코스/);
    assert.match(html, /국가별 대표 도시와 여행 코스를 살펴보세요/);
    assert.match(html, /최애 유튜버를 선택하세요/);
    assert.match(html, /실시간 인기 국가를 살펴보세요/);
    assert.match(html, /실시간 인기 코스를 살펴보세요/);
    assert.match(html, /home-menu-list/);
    assert.match(html, /home-menu-item/);
    assert.match(html, /home-menu-copy/);
    assert.match(html, /\/assets\/home\/country-explore-cutout\.png/);
    assert.match(html, /\/assets\/home\/youtuber-explore-cutout\.png/);
    assert.match(html, /\/assets\/home\/popular-country-cutout\.png/);
    assert.match(html, /\/assets\/home\/popular-course-cutout\.png/);
    assert.match(html, /--bg: #0b0d10/);
    assert.match(html, /\.home-menu-item \{[^}]*min-height: 88px;/);
    assert.match(html, /\.home-menu-image \{[^}]*width: 62px; height: 62px;/);
    assert.match(html, /bottom-nav-item active/);
    assert.match(html, />홈</);
    assert.match(html, />국가</);
    assert.match(html, />유튜버</);
    assert.match(html, />마이</);
  } finally {
    server.close();
    await once(server, 'close');
  }
});

await runTest('serves home icon assets as static files', async () => {
  const server = createPreviewServer();

  server.listen(0, '127.0.0.1');
  await once(server, 'listening');

  const address = server.address();
  if (address == null || typeof address === 'string') {
    throw new Error('Preview server address not available');
  }

  try {
    const response = await fetch(`http://127.0.0.1:${address.port}/assets/home/country-explore-cutout.png`);

    assert.equal(response.status, 200);
    assert.match(response.headers.get('content-type') ?? '', /image\/png/);
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

await runTest('serves a youtuber selector preview with search and visited country badges', async () => {
  const server = createPreviewServer();

  server.listen(0, '127.0.0.1');
  await once(server, 'listening');

  const address = server.address();
  if (address == null || typeof address === 'string') {
    throw new Error('Preview server address not available');
  }

  try {
    const response = await fetch(`http://127.0.0.1:${address.port}/youtubers`);
    const html = await response.text();

    assert.equal(response.status, 200);
    assert.match(html, /유튜버 선택/);
    assert.match(html, /유튜버를 검색해보세요/);
    assert.match(html, /체코제로/);
    assert.match(html, /잰잰바리/);
    assert.match(html, /youtuber-selector-screen/);
    assert.match(html, /youtuber-list-item/);
    assert.match(html, /\/assets\/common\/youtuber-avatar\.jpg/);
    assert.match(html, /대한민국 NO 1 여행왕/);
    assert.match(html, /먹방 여행의 근본/);
    assert.match(html, /여행은 현지인처럼!/);
    assert.match(html, /여미새지만 미워할 수 없는 여행가/);
    assert.match(html, /편안한 여행을 원한다면\?/);
    assert.match(html, /곽컴퍼니의 NO 2 실세/);
    assert.match(html, /youtuber-country-stack/);
    assert.match(html, /youtuber-country-stack-item/);
    assert.match(html, /\.youtuber-country-stack \{[^}]*padding-left: 28px;/);
    assert.match(html, /\.youtuber-country-stack-item \{[^}]*width: 33px; height: 33px; margin-left: -25px;/);
    assert.match(html, /\/assets\/countries\/flag-jp\.svg/);
    assert.match(html, /\/assets\/countries\/flag-vn\.svg/);
    assert.match(html, /\/assets\/youtubers\/kwaktube\.jpg/);
    assert.match(html, /\/assets\/youtubers\/wonji\.jpg/);
    assert.match(html, /\/assets\/youtubers\/nomadsion\.jpg/);
    assert.match(html, /\/assets\/youtubers\/czechj\.jpg/);
    assert.match(html, /\/assets\/youtubers\/janjanbari\.jpg/);
  } finally {
    server.close();
    await once(server, 'close');
  }
});

await runTest('serves a youtuber detail preview with top tags, visited countries, and featured courses', async () => {
  const server = createPreviewServer();

  server.listen(0, '127.0.0.1');
  await once(server, 'listening');

  const address = server.address();
  if (address == null || typeof address === 'string') {
    throw new Error('Preview server address not available');
  }

  try {
    const response = await fetch(`http://127.0.0.1:${address.port}/youtubers/youtuber-pani-bottle`);
    const html = await response.text();

    assert.equal(response.status, 200);
    assert.match(html, /빠니보틀/);
    assert.match(html, /대한민국 NO 1 여행왕/);
    assert.match(html, /youtuber-detail-hero/);
    assert.doesNotMatch(html, /대표 태그/);
    assert.match(html, /액티비티/);
    assert.match(html, /폐허/);
    assert.match(html, /오지/);
    assert.match(html, /X같습니다/);
    assert.match(html, /다녀온 국가/);
    assert.match(html, /일본/);
    assert.match(html, /여행 코스/);
    assert.match(html, /빠니보틀 도쿄 하루 압축 여행/);
    assert.match(html, /class="youtuber-course-flag-badge"/);
    assert.match(html, /class="country-course-tag-list"/);
    assert.match(html, /class="country-course-tag"/);
    assert.doesNotMatch(html, /class="country-course-description"/);
    assert.match(html, /방문 장소 2곳/);
    assert.match(html, /소요 시간 : 2시간 40분/);
    assert.match(html, /\/assets\/countries\/flag-jp\.svg/);
    assert.match(html, /\/assets\/countries\/flag-vn\.svg/);
    assert.match(html, /\/assets\/countries\/flag-us\.svg/);
    assert.match(html, /\/assets\/countries\/flag-fr\.svg/);
    assert.match(html, /\/assets\/countries\/flag-gb\.svg/);
    assert.match(html, /class="youtuber-course-row"><div class="youtuber-course-flag-badge">[\s\S]*?<div class="country-course-copy">/);
    const courseMatches = html.match(/class="country-course-item"/g) ?? [];
    assert.equal(courseMatches.length, 5);
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
    assert.match(html, /정책 및 안내/);
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
    assert.match(html, /arrival badge/i);
    assert.match(html, /stops in this route/i);
    assert.match(html, /route details/i);
    assert.match(html, /Tsukiji Outer Market/);
  } finally {
    server.close();
    await once(server, 'close');
  }
});
