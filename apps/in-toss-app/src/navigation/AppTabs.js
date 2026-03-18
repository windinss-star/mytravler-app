import React from 'react';

import { CountryListScreen } from '../features/countries/CountryListScreen.js';
import { HomeScreen } from '../features/home/HomeScreen.js';
import { MyScreen } from '../features/my/MyScreen.js';
import { YouTuberListScreen } from '../features/youtubers/YouTuberListScreen.js';

function TabButton({ label }) {
  return React.createElement(
    'button',
    {
      type: 'button',
    },
    label,
  );
}

export function AppTabs() {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'nav',
      { 'aria-label': 'Launch tabs' },
      React.createElement(TabButton, { label: '홈' }),
      React.createElement(TabButton, { label: '국가' }),
      React.createElement(TabButton, { label: '유튜버' }),
      React.createElement(TabButton, { label: '마이' }),
    ),
    React.createElement(
      'section',
      null,
      React.createElement(HomeScreen),
      React.createElement(CountryListScreen),
      React.createElement(YouTuberListScreen),
      React.createElement(MyScreen),
    ),
  );
}
