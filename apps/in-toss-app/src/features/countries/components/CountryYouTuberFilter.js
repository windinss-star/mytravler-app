import React from 'react';

export function CountryYouTuberFilter({ youtubers, hrefBuilder }) {
  return React.createElement(
    'section',
    null,
    React.createElement('h3', null, '관련 유튜버'),
    React.createElement(
      'div',
      null,
      ...youtubers.map((youtuber) =>
        React.createElement(
          hrefBuilder == null ? 'button' : 'a',
          hrefBuilder == null
            ? {
                key: youtuber.id,
                type: 'button',
              }
            : {
                key: youtuber.id,
                href: hrefBuilder(youtuber),
              },
          youtuber.displayName,
        ),
      ),
    ),
  );
}
