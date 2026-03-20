import React from 'react';

import { getCountries } from './api.js';

function CountryListItem({ country }) {
  const stackedYoutubers = country.relatedYoutubers.slice(0, 3);
  const remainingYoutuberCount = Math.max(country.relatedYoutubers.length - stackedYoutubers.length, 0);

  return React.createElement(
    'a',
    {
      className: 'country-list-item',
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
      React.createElement('strong', { className: 'country-list-name-ko' }, country.nameKo),
      React.createElement('span', { className: 'country-list-name-en' }, country.nameEn),
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

export function CountryListScreen({ query = '' }) {
  const countries = getCountries(query);

  return React.createElement(
    'section',
    { className: 'country-selector-screen' },
    React.createElement('h2', { className: 'country-selector-title' }, '국가 선택'),
    React.createElement(
      'form',
      { className: 'country-search-form', action: '/countries', method: 'get' },
      React.createElement(
        'label',
        { className: 'country-search-field' },
        React.createElement('span', { className: 'country-search-icon', 'aria-hidden': 'true' }, '⌕'),
        React.createElement('input', {
          className: 'country-search-input',
          type: 'search',
          name: 'q',
          defaultValue: query,
          placeholder: '국가를 검색해보세요',
          'aria-label': '국가 검색',
        }),
      ),
    ),
    React.createElement(
      'div',
      { className: 'country-list' },
      ...countries.map((country) =>
        React.createElement(CountryListItem, {
          key: country.id,
          country,
        }),
      ),
    ),
  );
}
