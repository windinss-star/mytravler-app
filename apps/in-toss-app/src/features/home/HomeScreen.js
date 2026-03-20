import React from 'react';

const MENU_ITEMS = [
  {
    id: 'countries',
    label: '국가 선택',
    description: '국가별 대표 도시와 여행 코스를 살펴보세요',
    href: '/countries',
    imageSrc: '/assets/home/country-explore-cutout.png',
    imageAlt: '비행기와 위치 핀이 함께 있는 여행 아이콘',
  },
  {
    id: 'youtubers',
    label: '유튜버 선택',
    description: '최애 유튜버를 선택하세요',
    href: '/youtubers',
    imageSrc: '/assets/home/youtuber-explore-cutout.png',
    imageAlt: '모자와 캐리어가 있는 여행 준비 아이콘',
  },
  {
    id: 'popular-countries',
    label: '실시간 인기 여행지',
    description: '실시간 인기 국가를 살펴보세요',
    href: '/countries',
    imageSrc: '/assets/home/popular-country-cutout.png',
    imageAlt: '세계 랜드마크가 있는 지구본 아이콘',
  },
  {
    id: 'popular-courses',
    label: '실시간 인기 코스',
    description: '실시간 인기 코스를 살펴보세요',
    href: '/courses/course-pani-tokyo-1',
    imageSrc: '/assets/home/popular-course-cutout.png',
    imageAlt: '여행 경로가 표시된 지도 아이콘',
  },
];

function MenuItem({ label, description, href, imageSrc, imageAlt }) {
  return React.createElement(
    'a',
    { className: 'home-menu-item', href },
    React.createElement(
      'span',
      { className: 'home-menu-visual' },
      React.createElement('span', { className: 'home-menu-visual-frame' }),
      React.createElement('span', { className: 'home-menu-image-shadow' }),
      React.createElement('img', {
        className: 'home-menu-image',
        src: imageSrc,
        alt: imageAlt,
        loading: 'lazy',
        decoding: 'async',
      }),
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
          imageSrc: item.imageSrc,
          imageAlt: item.imageAlt,
        }),
      ),
    ),
  );
}
