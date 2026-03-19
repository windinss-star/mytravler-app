import React from 'react';

const MENU_ITEMS = [
  {
    id: 'countries',
    label: '국가 탐색',
    description: '나라별 도시와 대표 여행 코스를 살펴보세요',
    href: '/countries',
    icon: '🌐',
    toneClassName: 'sky',
  },
  {
    id: 'youtubers',
    label: '유튜버 탐색',
    description: '취향에 맞는 여행 크리에이터를 찾아보세요',
    href: '/youtubers',
    icon: '📹',
    toneClassName: 'mint',
  },
  {
    id: 'popular-countries',
    label: '인기 나라 보기',
    description: '지금 많이 찾는 여행 국가를 빠르게 둘러보세요',
    href: '/countries',
    icon: '⭐',
    toneClassName: 'amber',
  },
  {
    id: 'popular-courses',
    label: '인기 코스 보기',
    description: '사람들이 많이 보는 여행 동선을 바로 확인해보세요',
    href: '/courses/course-pani-tokyo-1',
    icon: '🧭',
    toneClassName: 'lavender',
  },
];

function MenuItem({ label, description, href, icon, toneClassName }) {
  return React.createElement(
    'a',
    { className: 'home-menu-item', href },
    React.createElement(
      'span',
      { className: 'home-menu-visual' },
      React.createElement('span', { className: 'home-menu-icon-shadow' }),
      React.createElement(
        'span',
        { className: `home-menu-icon ${toneClassName}`, 'aria-hidden': 'true' },
        React.createElement('span', { className: 'home-menu-icon-badge' }),
        React.createElement('span', { className: 'home-menu-icon-core' }),
        React.createElement('span', { className: 'home-menu-icon-gloss' }),
        React.createElement('span', { className: 'home-menu-icon-glyph' }, icon),
      ),
    ),
    React.createElement(
      'span',
      { className: 'home-menu-copy' },
      React.createElement('strong', { className: 'home-menu-title' }, label),
      React.createElement('span', { className: 'home-menu-description' }, description),
    ),
    React.createElement('span', { className: 'home-menu-arrow', 'aria-hidden': 'true' }, '›'),
  );
}

export function HomeScreen() {
  return React.createElement(
    'section',
    { className: 'home-screen' },
    React.createElement(
      'header',
      { className: 'home-header' },
      React.createElement('p', { className: 'home-service-name' }, '마이트래블'),
    ),
    React.createElement(
      'form',
      { className: 'home-search-form', action: '/search', method: 'get' },
      React.createElement(
        'label',
        { className: 'home-search-field' },
        React.createElement('span', { className: 'home-search-icon', 'aria-hidden': 'true' }, '⌕'),
        React.createElement('input', {
          className: 'home-search-input',
          type: 'search',
          name: 'q',
          defaultValue: '',
          placeholder: '나라, 도시, 유튜버, 코스를 검색해보세요',
          'aria-label': '여행 검색',
        }),
      ),
    ),
    React.createElement(
      'div',
      { className: 'home-menu-list' },
      ...MENU_ITEMS.map((item) =>
        React.createElement(MenuItem, {
          key: item.id,
          label: item.label,
          description: item.description,
          href: item.href,
          icon: item.icon,
          toneClassName: item.toneClassName,
        }),
      ),
    ),
  );
}
