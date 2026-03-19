import React from 'react';

export function PolicyLinksCard({ links }) {
  return React.createElement(
    'section',
    null,
    React.createElement('h3', null, '정책 및 안내'),
    React.createElement(
      'ul',
      null,
      ...links.map((link) =>
        React.createElement(
          'li',
          { key: link.id },
          React.createElement('a', { href: link.href }, link.label),
        ),
      ),
    ),
  );
}
