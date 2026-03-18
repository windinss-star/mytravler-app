import React from 'react';

import { getCountryDetail } from './api.js';
import { CityList } from './components/CityList.js';
import { CountryYouTuberFilter } from './components/CountryYouTuberFilter.js';
import { CourseCardList } from './components/CourseCardList.js';
import { FavoriteCountriesRail } from './components/FavoriteCountriesRail.js';

export function CountryDetailScreen({ countryId }) {
  const detail = getCountryDetail(countryId);

  if (detail == null) {
    return React.createElement('section', null, React.createElement('p', null, 'Country not found.'));
  }

  return React.createElement(
    'section',
    null,
    React.createElement('h2', null, detail.country.nameKo),
    React.createElement(CountryYouTuberFilter, { youtubers: detail.relatedYoutubers }),
    React.createElement(FavoriteCountriesRail, { countries: detail.favoriteCountries }),
    React.createElement(CityList, { cities: detail.cities }),
    React.createElement(CourseCardList, { courses: detail.courses }),
  );
}
