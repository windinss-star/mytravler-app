import React from 'react';

function EntryButton({ label }) {
  return React.createElement(
    'button',
    {
      type: 'button'
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
      React.createElement(EntryButton, { label: '검색' }),
      React.createElement(EntryButton, { label: '국가 선택' }),
      React.createElement(EntryButton, { label: '유튜버 선택' }),
    ),
  );
}
