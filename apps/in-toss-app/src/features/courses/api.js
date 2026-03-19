import {
  courses as courseSeeds,
  curatedYouTubers,
} from '../../../../../services/api/src/seed/seed-data.ts';
import { getCourse } from '../../../../../services/api/src/routes/courses.ts';

export function getPreviewCourses(limit = 4) {
  return courseSeeds
    .slice(0, limit)
    .map((course) => {
      const fullCourse = getCourse(course.id);
      const youtuber = curatedYouTubers.find((entry) => entry.id === course.youtuberId);

      if (fullCourse == null || youtuber == null) {
        return null;
      }

      return {
        ...fullCourse,
        youtuber,
      };
    })
    .filter((course) => course != null);
}

export function getPreviewCoursesByRegion({ countryId, cityId } = {}) {
  return getPreviewCourses().filter((course) => {
    if (countryId != null && course.countryId !== countryId) {
      return false;
    }

    if (cityId != null && course.cityId !== cityId) {
      return false;
    }

    return true;
  });
}
