import React from 'react';

import { getPlace } from '../../../../../services/api/src/routes/places.ts';
import { PlaceMetaByType } from './components/PlaceMetaByType.js';
import { PlaceSummaryKeywords } from './components/PlaceSummaryKeywords.js';

export function PlaceDetailScreen({ placeId }) {
  const place = getPlace(placeId);

  if (place == null) {
    return React.createElement('section', null, React.createElement('p', null, 'Place not found.'));
  }

  return React.createElement(
    'section',
    null,
    React.createElement('p', null, '장소 상세'),
    React.createElement('h2', null, place.name),
    React.createElement('p', null, place.shortDescription),
    React.createElement('p', null, place.address),
    React.createElement(PlaceSummaryKeywords, { tags: place.tags }),
    React.createElement(PlaceMetaByType, { place, snapshot: place.latestSnapshot }),
  );
}
