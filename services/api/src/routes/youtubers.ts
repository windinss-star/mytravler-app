import { courses, curatedYouTubers } from '../seed/seed-data.ts';

export function listYoutubers() {
  return curatedYouTubers;
}

export function getYoutuber(youtuberId: string) {
  const youtuber = curatedYouTubers.find((entry) => entry.id === youtuberId);
  if (youtuber == null) {
    return null;
  }

  return {
    ...youtuber,
    courses: courses.filter((course) => course.youtuberId === youtuberId),
  };
}
