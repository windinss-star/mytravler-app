import React from 'react';

export function FavoriteCountriesRail({ countries }) {
  return React.createElement(
    'section',
    null,
    React.createElement('h3', null, '즐겨찾는 국가'),
    React.createElement(
      'ul',
      null,
      ...countries.map((country) => React.createElement('li', { key: country.id }, country.nameKo)),
    ),
  );
}
