import React from 'react';

export function FavoriteYouTubersRail({ youtubers, hrefBuilder }) {
  return React.createElement(
    'section',
    null,
    React.createElement('h3', null, '즐겨찾는 유튜버'),
    React.createElement(
      'ul',
      null,
      ...youtubers.map((youtuber) =>
        React.createElement(
          'li',
          { key: youtuber.id },
          hrefBuilder == null
            ? youtuber.displayName
            : React.createElement('a', { href: hrefBuilder(youtuber) }, youtuber.displayName),
        ),
      ),
    ),
  );
}
