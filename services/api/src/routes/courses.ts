import { courses, places } from '../seed/seed-data.ts';

export function getCourse(courseId: string) {
  const course = courses.find((entry) => entry.id === courseId);
  if (course == null) {
    return null;
  }

  const coursePlaces = course.placeItems
    .map((item) => places.find((place) => place.id === item.placeId))
    .filter((place) => place != null);

  return {
    ...course,
    places: coursePlaces,
  };
}
