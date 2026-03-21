import React from 'react';

import { getPopularCountries } from './api.js';

function PopularCountryListItem({ country, rank }) {
  const stackedYoutubers = country.relatedYoutubers.slice(0, 3);
  const remainingYoutuberCount = Math.max(country.relatedYoutubers.length - stackedYoutubers.length, 0);

  return React.createElement(
    'a',
    {
      className: 'country-list-item popular-country-item',
      href: `/countries/${country.id}`,
    },
    React.createElement(
      'span',
      { className: 'country-flag-badge', 'aria-hidden': 'true' },
      React.createElement('span', { className: 'country-flag-badge-shadow' }),
      React.createElement('span', { className: 'country-flag-badge-surface' }),
      React.createElement('img', {
        className: 'country-flag-badge-image',
        src: country.flagImageSrc,
        alt: '',
        loading: 'lazy',
        decoding: 'async',
      }),
    ),
    React.createElement(
      'span',
      { className: 'country-list-copy' },
      React.createElement(
        'span',
        { className: 'popular-country-rank' },
        `${rank}위 인기 여행지`,
      ),
      React.createElement('strong', { className: 'country-list-name-ko' }, country.nameKo),
      React.createElement('span', { className: 'country-list-name-en' }, country.nameEn),
      React.createElement(
        'span',
        { className: 'popular-country-counts' },
        `대표 도시 ${country.cityCount}곳 · 여행 코스 ${country.courseCount}개`,
      ),
    ),
    React.createElement(
      'span',
      { className: 'country-list-meta' },
      country.relatedYoutubers.length > 0
        ? React.createElement(
            React.Fragment,
            null,
            React.createElement(
              'span',
              { className: 'country-youtuber-stack' },
              ...stackedYoutubers.map((youtuber, index) =>
                React.createElement('img', {
                  key: youtuber.id,
                  className: 'country-youtuber-stack-item',
                  src: '/assets/common/youtuber-avatar.jpg',
                  alt: youtuber.channelName,
                  loading: 'lazy',
                  decoding: 'async',
                  style: { zIndex: stackedYoutubers.length - index },
                }),
              ),
            ),
            remainingYoutuberCount > 0
              ? React.createElement(
                  'span',
                  { className: 'country-youtuber-count' },
                  `+${remainingYoutuberCount}`,
                )
              : null,
          )
        : null,
    ),
  );
}

export function PopularCountryListScreen() {
  const countries = getPopularCountries();

  return React.createElement(
    'section',
    { className: 'popular-country-screen' },
    React.createElement('h2', { className: 'country-selector-title' }, '실시간 인기 여행지'),
    React.createElement(
      'p',
      { className: 'popular-country-description' },
      '지금 가장 많이 보는 국가를 빠르게 둘러보세요.',
    ),
    React.createElement(
      'div',
      { className: 'country-list popular-country-list' },
      ...countries.map((country, index) =>
        React.createElement(PopularCountryListItem, {
          key: country.id,
          country,
          rank: index + 1,
        }),
      ),
    ),
  );
}
