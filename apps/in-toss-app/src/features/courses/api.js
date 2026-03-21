import {
  courses as courseSeeds,
  curatedYouTubers,
} from '../../../../../services/api/src/seed/seed-data.ts';
import { getCourse } from '../../../../../services/api/src/routes/courses.ts';

function getAvatarImageSrc(youtuberId) {
  const dictionary = {
    'youtuber-pani-bottle': '/assets/common/youtuber-avatar.jpg',
    'youtuber-kwaktube': '/assets/youtubers/kwaktube.jpg',
    'youtuber-wonji': '/assets/youtubers/wonji.jpg',
    'youtuber-sion': '/assets/youtubers/nomadsion.jpg',
    'youtuber-czechj': '/assets/youtubers/czechj.jpg',
    'youtuber-janjanbari': '/assets/youtubers/janjanbari.jpg',
  };

  return dictionary[youtuberId] ?? '/assets/common/youtuber-avatar.jpg';
}

function getFlagImageSrc(code) {
  return `/assets/countries/flag-${code.toLowerCase()}.svg`;
}

function getCourseTagKoLabel(tag) {
  const dictionary = {
    'day-trip': '당일치기',
    market: '시장',
    food: '맛집',
    night: '야간',
    'slow-travel': '느린 여행',
    lodging: '숙소',
    beach: '해변',
    'remote-work': '워케이션',
    walking: '도보',
    neighborhood: '동네 산책',
    budget: '가성비',
    overnight: '1박',
  };

  return dictionary[tag] ?? tag;
}

function getCourseKoDescription(courseId, fallback) {
  const dictionary = {
    'course-pani-tokyo-1': '시장 아침 동선과 아사쿠사 산책을 한 번에 담은 도쿄 여행',
    'course-kwak-fukuoka-1': '먹방과 야경 산책을 같이 즐기는 후쿠오카 여행',
    'course-wonji-hanoi-1': '커피와 숙소 체크인을 여유롭게 잇는 하노이 여행',
    'course-sion-danang-1': '해변 산책과 작업하기 좋은 카페를 잇는 다낭 여행',
    'course-czechj-tokyo-1': '도보 산책과 동네 감성을 천천히 담는 도쿄 여행',
    'course-janjan-hanoi-1': '가볍게 먹고 체크인까지 이어지는 하노이 1박 여행',
  };

  return dictionary[courseId] ?? fallback;
}

function formatDuration(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) {
    return `${mins}분`;
  }

  if (mins === 0) {
    return `${hours}시간`;
  }

  return `${hours}시간 ${mins}분`;
}

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

export function getPopularCourses(limit = 5) {
  return courseSeeds
    .map((course) => {
      const fullCourse = getCourse(course.id);
      const youtuber = curatedYouTubers.find((entry) => entry.id === course.youtuberId);

      if (fullCourse == null || youtuber == null) {
        return null;
      }

      const totalStayMinutes = course.placeItems.reduce(
        (sum, item) => sum + (item.stayMinutes ?? 0),
        0,
      );

      return {
        ...fullCourse,
        youtuber,
        avatarImageSrc: getAvatarImageSrc(youtuber.id),
        flagImageSrc: getFlagImageSrc(course.countryId.replace('country-', '')),
        shortDescriptionKo: getCourseKoDescription(course.id, course.shortDescription),
        tagLabels: course.tags.slice(0, 3).map((tag) => getCourseTagKoLabel(tag)),
        stopCount: course.placeItems.length,
        totalStayLabel: formatDuration(totalStayMinutes),
        popularityScore: (course.isFeatured ? 1000 : 0) + totalStayMinutes + course.placeItems.length * 30,
      };
    })
    .filter((course) => course != null)
    .sort((left, right) => right.popularityScore - left.popularityScore)
    .slice(0, limit);
}
