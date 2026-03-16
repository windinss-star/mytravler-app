import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { HomeScreen } from '../features/home/HomeScreen.js';

const html = renderToStaticMarkup(React.createElement(HomeScreen));

assert.match(html, /검색/);
assert.match(html, /국가 선택/);
assert.match(html, /유튜버 선택/);
