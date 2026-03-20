import React from 'react';

import { getYoutubers } from './api.js';

export function YouTuberListScreen({ query = '', hrefBuilder }) {
  const youtubers = getYoutubers('subscriberCount', query);

  return React.createElement(
    'section',
    { className: 'youtuber-selector-screen' },
    React.createElement('h2', { className: 'country-selector-title' }, '유튜버 선택'),
    React.createElement(
      'form',
      { className: 'country-search-form', action: '/youtubers', method: 'get' },
      React.createElement(
        'label',
        { className: 'country-search-field' },
        React.createElement('span', { className: 'country-search-icon', 'aria-hidden': 'true' }, '⌕'),
        React.createElement('input', {
          className: 'country-search-input',
          type: 'search',
          name: 'q',
          defaultValue: query,
          placeholder: '유튜버를 검색해보세요',
        }),
      ),
    ),
    React.createElement(
      'div',
      { className: 'country-list' },
      ...youtubers.map((youtuber) =>
        React.createElement(
          hrefBuilder == null ? 'article' : 'a',
          {
            key: youtuber.id,
            className: 'youtuber-list-item',
            href: hrefBuilder == null ? undefined : hrefBuilder(youtuber),
          },
          React.createElement('img', {
            className: 'youtuber-list-avatar',
            src: youtuber.avatarImageSrc,
            alt: youtuber.displayName,
            loading: 'lazy',
            decoding: 'async',
          }),
          React.createElement(
            'div',
            { className: 'youtuber-list-copy' },
            React.createElement('strong', { className: 'youtuber-list-name' }, youtuber.displayName),
            React.createElement('p', { className: 'youtuber-list-summary' }, youtuber.summaryKo),
          ),
          React.createElement(
            'div',
            { className: 'youtuber-country-stack' },
            ...youtuber.visitedCountries.map((country) =>
              React.createElement('img', {
                key: `${youtuber.id}-${country.id}`,
                className: 'youtuber-country-stack-item',
                src: country.flagImageSrc,
                alt: country.code,
                loading: 'lazy',
                decoding: 'async',
              }),
            ),
          ),
        ),
      ),
    ),
  );
}
