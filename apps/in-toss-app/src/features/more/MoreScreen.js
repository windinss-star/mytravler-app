import React from 'react';

const MORE_MENU_ITEMS = [
  {
    id: 'my',
    title: '마이',
    description: '최근 본 여행 기록과 알림 설정을 확인해보세요.',
    href: '/my',
  },
  {
    id: 'popular-countries',
    title: '실시간 인기 여행지',
    description: '지금 가장 많이 보는 국가를 빠르게 둘러보세요.',
    href: '/popular-countries',
  },
  {
    id: 'popular-courses',
    title: '실시간 인기 코스',
    description: '지금 가장 많이 보는 여행 동선을 확인해보세요.',
    href: '/popular-courses',
  },
];

export function MoreScreen() {
  return React.createElement(
    'section',
    { className: 'more-screen' },
    React.createElement('h2', { className: 'country-selector-title' }, '더보기'),
    React.createElement(
      'div',
      { className: 'more-menu-list' },
      ...MORE_MENU_ITEMS.map((item) =>
        React.createElement(
          'a',
          { key: item.id, href: item.href, className: 'more-menu-item' },
          React.createElement(
            'span',
            { className: 'more-menu-copy' },
            React.createElement('strong', { className: 'home-menu-title' }, item.title),
            React.createElement('span', { className: 'home-menu-description' }, item.description),
          ),
          React.createElement('span', { className: 'home-menu-arrow', 'aria-hidden': 'true' }, '›'),
        ),
      ),
    ),
  );
}
