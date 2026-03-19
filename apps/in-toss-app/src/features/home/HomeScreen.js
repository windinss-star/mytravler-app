import React from 'react';

function EntryButton({ label, href }) {
  if (href != null) {
    return React.createElement('a', { href }, label);
  }

  return React.createElement(
    'button',
    {
      type: 'button',
    },
    label,
  );
}

export function HomeScreen() {
  return React.createElement(
    'main',
    null,
    React.createElement('h1', null, '여행 유튜버 코스'),
    React.createElement(
      'section',
      null,
      React.createElement(EntryButton, { label: '검색', href: '/search?q=일' }),
      React.createElement(EntryButton, { label: '국가 선택', href: '/countries' }),
      React.createElement(EntryButton, { label: '유튜버 선택', href: '/youtubers' }),
    ),
  );
}
