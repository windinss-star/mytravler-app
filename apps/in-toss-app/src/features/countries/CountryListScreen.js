import React from 'react';
import { getCountries } from './api.js';

export function CountryListScreen() {
  const countries = getCountries();

  return React.createElement(
    'section',
    null,
    React.createElement('h2', null, '국가'),
    React.createElement('p', null, 'Loading country list...'),
    React.createElement(
      'ul',
      null,
      ...countries.map((country) => React.createElement('li', { key: country.id }, country.nameKo)),
    ),
    React.createElement('small', null, 'API hook: seed-backed /countries'),
  );
}
