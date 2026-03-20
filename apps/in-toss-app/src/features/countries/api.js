import {
  cities,
  countries,
  courses,
  curatedYouTubers,
  places,
} from '../../../../../services/api/src/seed/seed-data.ts';

function getSortScore(youtuberId) {
  const index = curatedYouTubers.findIndex((entry) => entry.id === youtuberId);

  if (index < 0) {
    return 0;
  }

  return (curatedYouTubers.length - index) * 100 + 20;
}

function getFlagImageSrc(code) {
  return `/assets/countries/flag-${code.toLowerCase()}.svg`;
}

function getAvatarImageSrc() {
  return '/assets/common/youtuber-avatar.jpg';
}

function getPlaceKoName(name) {
  const dictionary = {
    'Tsukiji Outer Market': '츠키지 장외시장',
    'Senso-ji': '센소지',
    'Ichiran Main Shop': '이치란 본점',
    'Ohori Park': '오호리 공원',
    'Old Quarter Coffee House': '올드쿼터 커피하우스',
    'Hanoi La Siesta': '하노이 라시에스타',
    'My Khe Beach': '미케 비치',
    'Son Tra Cowork Cafe': '선짜 코워킹 카페',
    'Kiyosumi Garden': '기요스미 정원',
    'Kanda Hostel': '간다 호스텔',
    'Bun Cha Ta': '분짜따',
    'Little Charm Hanoi Hostel': '리틀참 하노이 호스텔',
  };

  return dictionary[name] ?? name;
}

function getCourseKoDescription(courseId, fallback) {
  const dictionary = {
    'course-pani-tokyo-1': '시장 아침 식사와 아사쿠사 도보 동선을 담은 하루 여행',
    'course-kwak-fukuoka-1': '라멘과 공원 산책으로 마무리하는 후쿠오카 먹방 여행',
    'course-wonji-hanoi-1': '커피와 숙소 체크인으로 이어지는 하노이 느린 여행',
    'course-sion-danang-1': '해변 산책 뒤 작업하기 좋은 카페로 이어지는 다낭 여행',
    'course-czechj-tokyo-1': '정원 산책과 도심 숙소까지 이어지는 도쿄 동네 여행',
    'course-janjan-hanoi-1': '점심 식사와 체크인으로 이어지는 하노이 1박 여행',
  };

  return dictionary[courseId] ?? fallback;
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

function getRepresentativeYoutubers(countryId) {
  const countryCourses = courses.filter((course) => course.countryId === countryId);
  const uniqueIds = [...new Set(countryCourses.map((course) => course.youtuberId))];
  const youtubers = uniqueIds
    .map((youtuberId) => curatedYouTubers.find((entry) => entry.id === youtuberId))
    .filter(Boolean)
    .sort((left, right) => getSortScore(right.id) - getSortScore(left.id));

  return youtubers;
}

export function getCountries(query = '') {
  const normalizedQuery = query.trim().toLowerCase();

  return countries
    .map((country) => {
      const relatedYoutubers = getRepresentativeYoutubers(country.id);
      const representativeYoutuber = relatedYoutubers[0] ?? null;

      return {
        ...country,
        flagImageSrc: getFlagImageSrc(country.code),
        avatarImageSrc: getAvatarImageSrc(),
        relatedYoutubers,
        representativeYoutuber,
        additionalYoutuberCount: Math.max(relatedYoutubers.length - 1, 0),
      };
    })
    .filter((country) => {
      if (normalizedQuery.length === 0) {
        return true;
      }

      return (
        country.nameKo.toLowerCase().includes(normalizedQuery) ||
        country.nameEn.toLowerCase().includes(normalizedQuery)
      );
    })
    .sort((left, right) => left.nameKo.localeCompare(right.nameKo, 'ko'));
}

export function getCountryDetail(countryId) {
  const country = countries.find((entry) => entry.id === countryId);
  if (country == null) {
    return null;
  }

  const countryCities = cities.filter((city) => city.countryId === countryId);
  const countryCourses = courses.filter((course) => course.countryId === countryId);
  const youtuberIds = new Set(countryCourses.map((course) => course.youtuberId));
  const relatedYoutubers = curatedYouTubers
    .filter((youtuber) => youtuberIds.has(youtuber.id))
    .sort((left, right) => getSortScore(right.id) - getSortScore(left.id))
    .map((youtuber) => ({
      ...youtuber,
      avatarImageSrc: getAvatarImageSrc(),
    }));

  const citySummaries = countryCities
    .map((city) => {
      const cityCourses = countryCourses.filter((course) => course.cityId === city.id);
      const leadCourse = cityCourses[0] ?? null;

      return {
        ...city,
        courseCount: cityCourses.length,
        leadCourseTitle: leadCourse?.title ?? '',
        leadCourseDescription: leadCourse?.shortDescription ?? '',
      };
    })
    .sort((left, right) => {
      if (right.courseCount !== left.courseCount) {
        return right.courseCount - left.courseCount;
      }

      return left.nameKo.localeCompare(right.nameKo, 'ko');
    });

  const featuredCourses = countryCourses.map((course) => {
    const youtuber = relatedYoutubers.find((entry) => entry.id === course.youtuberId);
    const city = countryCities.find((entry) => entry.id === course.cityId);

    return {
      ...course,
      youtuberDisplayName: youtuber?.displayName ?? youtuber?.channelName ?? '',
      cityNameKo: city?.nameKo ?? '',
      cityNameEn: city?.nameEn ?? '',
      avatarImageSrc: getAvatarImageSrc(),
    };
  });

  return {
    country,
    countryStats: {
      cityCount: countryCities.length,
      courseCount: countryCourses.length,
      youtuberCount: relatedYoutubers.length,
    },
    flagImageSrc: getFlagImageSrc(country.code),
    relatedYoutubers,
    citySummaries,
    featuredCourses,
  };
}

export function getCountryCityDetail(countryId, cityId) {
  const country = countries.find((entry) => entry.id === countryId);
  const city = cities.find((entry) => entry.id === cityId && entry.countryId === countryId);

  if (country == null || city == null) {
    return null;
  }

  const cityCourses = courses
    .filter((course) => course.countryId === countryId && course.cityId === cityId)
    .map((course) => {
      const youtuber = curatedYouTubers.find((entry) => entry.id === course.youtuberId);
      const routePlaces = course.placeItems
        .slice()
        .sort((left, right) => left.order - right.order)
        .map((item) => {
          const place = places.find((entry) => entry.id === item.placeId);
          const englishName = place?.name ?? item.placeId;

          return {
            placeId: item.placeId,
            order: item.order,
            nameKo: getPlaceKoName(englishName),
            nameEn: englishName,
            stayMinutes: item.stayMinutes ?? 0,
          };
        });
      const totalStayMinutes = routePlaces.reduce((sum, place) => sum + place.stayMinutes, 0);

      return {
        ...course,
        avatarImageSrc: getAvatarImageSrc(),
        youtuberDisplayName: youtuber?.displayName ?? youtuber?.channelName ?? '',
        shortDescriptionKo: getCourseKoDescription(course.id, course.shortDescription),
        tagLabels: course.tags.map((tag) => getCourseTagKoLabel(tag)),
        stopCount: routePlaces.length,
        totalStayMinutes,
        totalStayLabel: formatDuration(totalStayMinutes),
        routePlaces,
      };
    });

  const relatedYoutuberIds = new Set(cityCourses.map((course) => course.youtuberId));
  const relatedYoutubers = curatedYouTubers
    .filter((entry) => relatedYoutuberIds.has(entry.id))
    .sort((left, right) => getSortScore(right.id) - getSortScore(left.id))
    .map((entry) => ({
      ...entry,
      avatarImageSrc: getAvatarImageSrc(),
    }));

  return {
    country,
    city,
    relatedYoutubers,
    courses: cityCourses,
  };
}
