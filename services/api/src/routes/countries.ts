import { cities, countries, courses } from '../seed/seed-data.ts';

export function listCountries() {
  return countries;
}

export function getCountry(countryId: string) {
  return countries.find((country) => country.id === countryId) ?? null;
}

export function getCountryCourses(countryId: string, cityId: string) {
  const city = cities.find((entry) => entry.id === cityId && entry.countryId === countryId);
  if (city == null) {
    return null;
  }

  return courses.filter((course) => course.countryId === countryId && course.cityId === cityId);
}
