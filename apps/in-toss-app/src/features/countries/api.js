import {
  cities,
  countries,
  courses,
  curatedYouTubers,
} from '../../../../../services/api/src/seed/seed-data.ts';

export function getCountries() {
  return [...countries].sort((left, right) => left.nameKo.localeCompare(right.nameKo, 'ko'));
}

export function getCountryDetail(countryId) {
  const country = countries.find((entry) => entry.id === countryId);
  if (country == null) {
    return null;
  }

  const countryCities = cities.filter((city) => city.countryId === countryId);
  const countryCourses = courses.filter((course) => course.countryId === countryId);
  const youtuberIds = new Set(countryCourses.map((course) => course.youtuberId));
  const relatedYoutubers = curatedYouTubers.filter((youtuber) => youtuberIds.has(youtuber.id));

  return {
    country,
    favoriteCountries: [country],
    cities: countryCities,
    relatedYoutubers,
    courses: countryCourses,
  };
}
