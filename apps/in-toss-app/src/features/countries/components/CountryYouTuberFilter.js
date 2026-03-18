import React from 'react';

export function CountryYouTuberFilter({ youtubers }) {
  return React.createElement(
    'section',
    null,
    React.createElement('h3', null, '관련 유튜버'),
    React.createElement(
      'div',
      null,
      ...youtubers.map((youtuber) =>
        React.createElement(
          'button',
          {
            key: youtuber.id,
            type: 'button',
          },
          youtuber.displayName,
        ),
      ),
    ),
  );
}
