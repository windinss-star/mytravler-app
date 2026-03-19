import React from 'react';

function buildHref(result) {
  if (result.entityType === 'country') {
    return `/countries/${result.id}`;
  }

  if (result.entityType === 'youtuber') {
    return `/youtubers/${result.id}`;
  }

  if (result.entityType === 'course') {
    return `/courses/${result.id}`;
  }

  if (result.entityType === 'place') {
    return `/places/${result.id}`;
  }

  if (result.entityType === 'city') {
    return '/countries';
  }

  return '/';
}

export function SearchResultsList({ results }) {
  return React.createElement(
    'section',
    null,
    React.createElement('h3', null, '검색 결과'),
    React.createElement(
      'ul',
      null,
      ...results.map((result) =>
        React.createElement(
          'li',
          { key: `${result.entityType}-${result.id}` },
          React.createElement('a', { href: buildHref(result) }, result.label),
          React.createElement('small', null, ` ${result.entityType}`),
          result.subtitle == null ? null : React.createElement('p', null, result.subtitle),
        ),
      ),
    ),
  );
}
