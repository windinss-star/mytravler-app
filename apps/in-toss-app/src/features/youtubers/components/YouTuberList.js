import React from 'react';

export function YouTuberList({ youtubers, hrefBuilder }) {
  return React.createElement(
    'section',
    null,
    React.createElement('h3', null, '유튜버 목록'),
    React.createElement(
      'ul',
      null,
      ...youtubers.map((youtuber) =>
        React.createElement(
          'li',
          { key: youtuber.id },
          hrefBuilder == null
            ? React.createElement('strong', null, youtuber.displayName)
            : React.createElement('a', { href: hrefBuilder(youtuber) }, youtuber.displayName),
          React.createElement('p', null, youtuber.channelName),
          React.createElement('small', null, `구독자 ${youtuber.subscriberCountLabel}`),
        ),
      ),
    ),
  );
}
