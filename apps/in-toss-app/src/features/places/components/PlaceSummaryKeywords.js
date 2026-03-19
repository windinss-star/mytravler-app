import React from 'react';

export function PlaceSummaryKeywords({ tags }) {
  return React.createElement(
    'section',
    null,
    React.createElement('h3', null, '요약 키워드'),
    React.createElement(
      'ul',
      null,
      ...tags.slice(0, 5).map((tag) => React.createElement('li', { key: tag }, tag)),
    ),
  );
}
