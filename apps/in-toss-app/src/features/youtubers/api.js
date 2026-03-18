import { courses, curatedYouTubers } from '../../../../../services/api/src/seed/seed-data.ts';

function getCourseCountByYoutuber(youtuberId) {
  return courses.filter((course) => course.youtuberId === youtuberId).length;
}

export function getYoutubers(sortBy = 'displayName') {
  const youtubers = curatedYouTubers.map((youtuber, index) => ({
    ...youtuber,
    subscriberCountLabel: `${(6 - index) * 100 + 20}만`,
    sortScore: (6 - index) * 100 + 20,
    courseCount: getCourseCountByYoutuber(youtuber.id),
  }));

  if (sortBy === 'subscriberCount') {
    return youtubers.sort((left, right) => right.sortScore - left.sortScore);
  }

  return youtubers.sort((left, right) => left.displayName.localeCompare(right.displayName, 'ko'));
}

export function getFavoriteYoutubers() {
  return getYoutubers('subscriberCount').slice(0, 2);
}

export function getYoutuberDetail(youtuberId) {
  const youtuber = curatedYouTubers.find((entry) => entry.id === youtuberId);
  if (youtuber == null) {
    return null;
  }

  return {
    youtuber,
    courses: courses.filter((course) => course.youtuberId === youtuberId),
  };
}
