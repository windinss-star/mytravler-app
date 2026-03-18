import React from 'react';

export function CityList({ cities }) {
  return React.createElement(
    'section',
    null,
    React.createElement('h3', null, '도시 목록'),
    React.createElement(
      'ul',
      null,
      ...cities.map((city) => React.createElement('li', { key: city.id }, city.nameKo)),
    ),
  );
}
