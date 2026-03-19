import React from 'react';

function row(label, value) {
  if (value == null || value === '') {
    return null;
  }

  return React.createElement(
    'li',
    { key: label },
    React.createElement('strong', null, `${label}: `),
    String(value),
  );
}

export function PlaceMetaByType({ place, snapshot }) {
  return React.createElement(
    'section',
    null,
    React.createElement('h3', null, '장소 상세'),
    React.createElement(
      'ul',
      null,
      row('Category', place.category),
      row('Opening hours', snapshot?.openingHours),
      row('Average price', snapshot?.averagePrice),
      row('Currency', snapshot?.currencyCode),
      row('Lodging type', snapshot?.lodgingType),
      row('Lodging rating', snapshot?.lodgingRating),
      row('Captured at', snapshot?.capturedAt),
    ),
  );
}
