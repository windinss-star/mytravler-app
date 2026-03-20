import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { CountryDetailScreen } from '../CountryDetailScreen.js';

const html = renderToStaticMarkup(
  React.createElement(CountryDetailScreen, {
    countryId: 'country-jp',
  }),
);

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
