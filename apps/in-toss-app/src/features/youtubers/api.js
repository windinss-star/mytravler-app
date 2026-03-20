import { courses, curatedYouTubers } from '../../../../../services/api/src/seed/seed-data.ts';

function getCourseCountByYoutuber(youtuberId) {
  return courses.filter((course) => course.youtuberId === youtuberId).length;
}

function getYoutuberDisplayName(youtuberId, fallback) {
  const dictionary = {
    'youtuber-czechj': '체코제로',
    'youtuber-janjanbari': '잰잰바리',
  };

  return dictionary[youtuberId] ?? fallback;
}

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

function getDemoCourseFlag(index) {
  const codes = ['JP', 'VN', 'US', 'FR', 'GB'];
  const code = codes[index % codes.length];

  return {
    code,
    flagImageSrc: getFlagImageSrc(code),
  };
}

function getYoutuberKoSummary(youtuberId) {
  const dictionary = {
    'youtuber-pani-bottle': '대한민국 NO 1 여행왕',
    'youtuber-kwaktube': '먹방 여행의 근본',
    'youtuber-wonji': '여행은 현지인처럼!',
    'youtuber-sion': '여미새지만 미워할 수 없는 여행가',
    'youtuber-czechj': '편안한 여행을 원한다면?',
    'youtuber-janjanbari': '곽컴퍼니의 NO 2 실세',
  };

  return dictionary[youtuberId] ?? '다양한 여행 코스를 정리해요';
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
    'course-pani-tokyo-1': '시장 아침 식사와 아사쿠사 도보 동선을 담은 하루 여행',
    'course-kwak-fukuoka-1': '이치란과 공원 산책으로 마무리하는 후쿠오카 먹방 여행',
    'course-wonji-hanoi-1': '커피와 숙소 체크인으로 이어지는 하노이 느린 여행',
    'course-sion-danang-1': '바다 산책 뒤 작업하기 좋은 카페로 이어지는 다낭 여행',
    'course-czechj-tokyo-1': '정원 산책과 로컬 숙소까지 이어지는 도쿄 동네 여행',
    'course-janjan-hanoi-1': '현지 식사와 체크인으로 이어지는 하노이 1박 여행',
  };

  return dictionary[courseId] ?? fallback;
}

function formatTravelTitle(title) {
  if (title.endsWith('여행')) {
    return title;
  }

  if (/(코스|루트|일정)$/.test(title)) {
    return title.replace(/(코스|루트|일정)$/, '여행');
  }

  return `${title} 여행`;
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

function getVisitedCountries(youtuberId) {
  const availableCountryIds = ['country-jp', 'country-vn'];
  const seed = [...youtuberId].reduce((sum, letter) => sum + letter.charCodeAt(0), 0);
  const count = 2 + (seed % 4);

  return Array.from({ length: count }, (_, index) => {
    const countryId = availableCountryIds[(seed + index) % availableCountryIds.length];
    const code = countryId.replace('country-', '').toUpperCase();

    return {
      id: `${countryId}-${index}`,
      code,
      flagImageSrc: getFlagImageSrc(code),
    };
  });
}

export function getYoutubers(sortBy = 'displayName', query = '') {
  const normalizedQuery = query.trim().toLowerCase();
  const youtubers = curatedYouTubers
    .map((youtuber, index) => ({
      ...youtuber,
      displayName: getYoutuberDisplayName(youtuber.id, youtuber.displayName),
      avatarImageSrc: getAvatarImageSrc(youtuber.id),
      subscriberCountLabel: `${(6 - index) * 100 + 20}만`,
      sortScore: (6 - index) * 100 + 20,
      courseCount: getCourseCountByYoutuber(youtuber.id),
      summaryKo: getYoutuberKoSummary(youtuber.id),
      visitedCountries: getVisitedCountries(youtuber.id),
    }))
    .filter((youtuber) => {
      if (normalizedQuery.length === 0) {
        return true;
      }

      return (
        youtuber.displayName.toLowerCase().includes(normalizedQuery) ||
        youtuber.channelName.toLowerCase().includes(normalizedQuery)
      );
    });

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

  const youtuberCourses = courses.filter((course) => course.youtuberId === youtuberId);
  const topTags = ['액티비티', '폐허', '오지', 'X같습니다'];

  const visitedCountries = [...new Set(youtuberCourses.map((course) => course.countryId))]
    .map((countryId) => {
      const code = countryId.replace('country-', '').toUpperCase();
      const nameKo = code === 'JP' ? '일본' : code === 'VN' ? '베트남' : code;

      return {
        id: countryId,
        code,
        nameKo,
        flagImageSrc: getFlagImageSrc(code),
      };
    });

  const baseFeaturedCourses = youtuberCourses.map((course) => ({
    ...course,
    avatarImageSrc: getAvatarImageSrc(youtuberId),
    titleKo: formatTravelTitle(course.title),
    shortDescriptionKo: getCourseKoDescription(course.id, course.shortDescription),
    tagLabels: course.tags.slice(0, 3).map((tag) => getCourseTagKoLabel(tag)),
  }));
  const featuredCourses = Array.from({ length: 5 }, (_, index) => {
    const course = baseFeaturedCourses[index % baseFeaturedCourses.length];
    const stopCount = course.placeItems.length;
    const totalStayMinutes = course.placeItems.reduce((sum, item) => sum + (item.stayMinutes ?? 0), 0);
    const courseFlag = getDemoCourseFlag(index);

    return {
      ...course,
      id: `${course.id}-demo-${index + 1}`,
      stopCount,
      totalStayLabel: formatDuration(totalStayMinutes),
      courseFlag,
    };
  });

  return {
    youtuber: {
      ...youtuber,
      displayName: getYoutuberDisplayName(youtuber.id, youtuber.displayName),
      avatarImageSrc: getAvatarImageSrc(youtuber.id),
      summaryKo: getYoutuberKoSummary(youtuber.id),
    },
    topTags,
    visitedCountries,
    courses: featuredCourses,
  };
}
