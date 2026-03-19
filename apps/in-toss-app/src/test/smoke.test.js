import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { HomeScreen } from '../features/home/HomeScreen.js';

const html = renderToStaticMarkup(React.createElement(HomeScreen));

assert.match(html, /마이트래블/);
assert.match(html, /나라, 도시, 유튜버, 코스를 검색해보세요/);
assert.match(html, /국가 탐색/);
assert.match(html, /유튜버 탐색/);
assert.match(html, /인기 나라 보기/);
assert.match(html, /인기 코스 보기/);
assert.match(html, /home-menu-list/);
assert.match(html, /home-menu-item/);
assert.match(html, /home-menu-copy/);
