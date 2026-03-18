import { cities, countries, courses, curatedYouTubers, places } from '../seed/seed-data.ts';

function matchesQuery(value: string | undefined, query: string) {
  return value?.toLowerCase().includes(query) ?? false;
}

export function searchCatalog(rawQuery: string) {
  const query = rawQuery.trim().toLowerCase();
  if (query.length === 0) {
    return [];
  }

  const countryResults = countries
    .filter(
      (country) =>
        matchesQuery(country.nameKo, query) ||
        matchesQuery(country.nameEn, query) ||
        matchesQuery(country.code, query),
    )
    .map((country) => ({
      entityType: 'country',
      id: country.id,
      label: country.nameKo,
      subtitle: country.nameEn,
    }));

  const cityResults = cities
    .filter((city) => {
      const country = countries.find((entry) => entry.id === city.countryId);
      return (
        matchesQuery(city.nameKo, query) ||
        matchesQuery(city.nameEn, query) ||
        matchesQuery(country?.nameKo, query) ||
        matchesQuery(country?.nameEn, query)
      );
    })
    .map((city) => ({
      entityType: 'city',
      id: city.id,
      label: city.nameKo,
      subtitle: city.nameEn,
    }));

  const youtuberResults = curatedYouTubers
    .filter(
      (youtuber) =>
        matchesQuery(youtuber.channelName, query) ||
        matchesQuery(youtuber.displayName, query) ||
        youtuber.tags.some((tag) => matchesQuery(tag, query)),
    )
    .map((youtuber) => ({
      entityType: 'youtuber',
      id: youtuber.id,
      label: youtuber.displayName,
      subtitle: youtuber.channelName,
    }));

  const placeResults = places
    .filter((place) => {
      const city = cities.find((entry) => entry.id === place.cityId);
      const country = countries.find((entry) => entry.id === place.countryId);
      return (
        matchesQuery(place.name, query) ||
        matchesQuery(place.shortDescription, query) ||
        matchesQuery(place.address, query) ||
        place.tags.some((tag) => matchesQuery(tag, query)) ||
        matchesQuery(city?.nameKo, query) ||
        matchesQuery(city?.nameEn, query) ||
        matchesQuery(country?.nameKo, query) ||
        matchesQuery(country?.nameEn, query)
      );
    })
    .map((place) => ({
      entityType: 'place',
      id: place.id,
      label: place.name,
      subtitle: place.shortDescription,
    }));

  const courseResults = courses
    .filter(
      (course) =>
        matchesQuery(course.title, query) ||
        matchesQuery(course.shortDescription, query) ||
        course.tags.some((tag) => matchesQuery(tag, query)),
    )
    .map((course) => ({
      entityType: 'course',
      id: course.id,
      label: course.title,
      subtitle: course.shortDescription,
    }));

  return [
    ...countryResults,
    ...cityResults,
    ...youtuberResults,
    ...placeResults,
    ...courseResults,
  ];
}
