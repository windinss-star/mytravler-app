import React from 'react';

import { getYoutuberDetail } from './api.js';

export function YouTuberDetailScreen({ youtuberId }) {
  const detail = getYoutuberDetail(youtuberId);

  if (detail == null) {
    return React.createElement('section', null, React.createElement('p', null, 'YouTuber not found.'));
  }

  return React.createElement(
    'section',
    null,
    React.createElement('h2', null, detail.youtuber.displayName),
    React.createElement('p', null, detail.youtuber.description),
    React.createElement('h3', null, '대표 코스'),
    React.createElement(
      'ul',
      null,
      ...detail.courses.map((course) =>
        React.createElement(
          'li',
          { key: course.id },
          React.createElement('strong', null, course.title),
          React.createElement('p', null, course.shortDescription),
        ),
      ),
    ),
  );
}
