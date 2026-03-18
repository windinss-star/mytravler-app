import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { CountryDetailScreen } from '../CountryDetailScreen.js';

const html = renderToStaticMarkup(
  React.createElement(CountryDetailScreen, {
    countryId: 'country-jp',
  }),
);

assert.match(html, /관련 유튜버/);
assert.match(html, /즐겨찾는 국가/);
assert.match(html, /도시 목록/);
assert.match(html, /대표 코스/);
assert.match(html, /도쿄/);
