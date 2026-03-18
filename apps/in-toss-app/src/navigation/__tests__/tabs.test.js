import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { AppTabs } from '../AppTabs.js';

const html = renderToStaticMarkup(React.createElement(AppTabs));

assert.match(html, /홈/);
assert.match(html, /국가/);
assert.match(html, /유튜버/);
assert.match(html, /마이/);
