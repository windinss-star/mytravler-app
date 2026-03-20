import React from 'react';

import { getCountryDetail } from './api.js';

function CountryStat({ value, label }) {
  return React.createElement(
    'div',
    { className: 'country-stat-card' },
    React.createElement('strong', { className: 'country-stat-value' }, String(value)),
    React.createElement('span', { className: 'country-stat-label' }, label),
  );
}

function CountryDetailMap({ countryId, cities }) {
  if (cities.length === 0) {
    return React.createElement(
      'section',
      { className: 'country-detail-map-section' },
      React.createElement(
        'div',
        { className: 'country-detail-map country-detail-map-empty' },
        '표시할 도시가 없습니다.',
      ),
    );
  }

  const lats = cities.map((city) => city.latitude ?? 0);
  const lngs = cities.map((city) => city.longitude ?? 0);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);
  const latRange = Math.max(maxLat - minLat, 0.1);
  const lngRange = Math.max(maxLng - minLng, 0.1);

  const mapMarkers = cities.map((city) => {
    const x = 18 + (((city.longitude ?? minLng) - minLng) / lngRange) * 64;
    const y = 18 + (1 - (((city.latitude ?? minLat) - minLat) / latRange)) * 64;

    return {
      ...city,
      x,
      y,
    };
  });

  return React.createElement(
    'section',
    { className: 'country-detail-map-section' },
    React.createElement(
      'div',
      { className: 'country-detail-map', role: 'img', 'aria-label': '국가 내 대표 도시 요약 지도' },
      React.createElement(
        'svg',
        {
          className: 'country-detail-map-svg',
          viewBox: '0 0 100 100',
          'aria-hidden': 'true',
        },
        React.createElement('rect', {
          x: '8',
          y: '8',
          width: '84',
          height: '84',
          rx: '26',
          className: 'country-detail-map-surface',
        }),
        ...renderCountryShape(countryId),
        ...mapMarkers.flatMap((city, index) => {
          const nextCity = mapMarkers[index + 1];
          const nodes = [];

          if (nextCity != null) {
            nodes.push(
              React.createElement('line', {
                key: `${city.id}-line`,
                x1: city.x,
                y1: city.y,
                x2: nextCity.x,
                y2: nextCity.y,
                className: 'country-detail-map-line',
              }),
            );
          }

          nodes.push(
            React.createElement('circle', {
              key: `${city.id}-marker`,
              cx: city.x,
              cy: city.y,
              r: '4.5',
              className: 'country-detail-map-marker',
            }),
          );

          nodes.push(
            React.createElement(
              'text',
              {
                key: `${city.id}-label`,
                x: city.x + 6,
                y: city.y - 6,
                className: 'country-detail-map-label',
              },
              city.nameKo,
            ),
          );

          return nodes;
        }),
      ),
    ),
  );
}

function CitySummaryItem({ city, hrefBuilder }) {
  return React.createElement(
    hrefBuilder == null ? 'div' : 'a',
    hrefBuilder == null
      ? { className: 'country-city-item' }
      : { className: 'country-city-item country-city-link', href: hrefBuilder(city) },
    React.createElement(
      'div',
      { className: 'country-city-copy' },
      React.createElement('strong', { className: 'country-city-name-ko' }, city.nameKo),
      React.createElement('span', { className: 'country-city-name-en' }, city.nameEn),
    ),
    React.createElement(
      'div',
      { className: 'country-city-meta' },
      React.createElement('strong', { className: 'country-city-course-count' }, `${city.courseCount}개 코스`),
    ),
  );
}

function FeaturedCourseItem({ course, hrefBuilder }) {
  const titleNode = React.createElement(
    'strong',
    { className: 'country-course-title' },
    formatTravelTitle(course.title),
  );

  return React.createElement(
    'li',
    { className: 'country-course-item' },
    React.createElement(
      'div',
      { className: 'country-course-head' },
      React.createElement('img', {
        className: 'country-course-avatar',
        src: course.avatarImageSrc,
        alt: '',
        loading: 'lazy',
        decoding: 'async',
      }),
      React.createElement(
        'div',
        { className: 'country-course-copy' },
        hrefBuilder == null
          ? titleNode
          : React.createElement('a', { href: hrefBuilder(course), className: 'country-course-link' }, titleNode),
        React.createElement(
          'div',
          { className: 'country-course-meta' },
          React.createElement('span', null, course.cityNameKo),
        ),
        React.createElement('p', { className: 'country-course-description' }, course.shortDescription),
      ),
    ),
  );
}

export function CountryDetailScreen({ countryId, courseHrefBuilder, cityHrefBuilder }) {
  const detail = getCountryDetail(countryId);
  const resolvedCityHrefBuilder =
    typeof cityHrefBuilder === 'function'
      ? cityHrefBuilder
      : (city) => `/countries/${countryId}/cities/${city.id}`;

  if (detail == null) {
    return React.createElement(
      'section',
      { className: 'country-detail-screen' },
      React.createElement('p', null, '국가 정보를 찾을 수 없습니다.'),
    );
  }

  const youtuberPreview = detail.relatedYoutubers.slice(0, 3);

  return React.createElement(
    'section',
    { className: 'country-detail-screen' },
    React.createElement(
      'a',
      { className: 'country-detail-back', href: '/countries' },
      '← 국가 선택으로',
    ),
    React.createElement(
      'header',
      { className: 'country-detail-hero' },
      React.createElement(
        'div',
        { className: 'country-detail-flag-badge', 'aria-hidden': 'true' },
        React.createElement('span', { className: 'country-detail-flag-shadow' }),
        React.createElement('span', { className: 'country-detail-flag-surface' }),
        React.createElement('img', {
          className: 'country-detail-flag-image',
          src: detail.flagImageSrc,
          alt: '',
          loading: 'lazy',
          decoding: 'async',
        }),
      ),
      React.createElement(
        'div',
        { className: 'country-detail-hero-copy' },
        React.createElement('span', { className: 'country-detail-eyebrow' }, '국가 상세'),
        React.createElement('h2', { className: 'country-detail-name-ko' }, detail.country.nameKo),
        React.createElement('div', { className: 'country-detail-name-en' }, detail.country.nameEn),
      ),
      React.createElement(
        'div',
        { className: 'country-detail-youtubers' },
        React.createElement('span', { className: 'country-detail-youtubers-label' }, '관련 유튜버'),
        React.createElement(
          'div',
          { className: 'country-detail-youtuber-stack' },
          ...youtuberPreview.map((youtuber) =>
            React.createElement('img', {
              key: youtuber.id,
              className: 'country-detail-youtuber-avatar',
              src: youtuber.avatarImageSrc,
              alt: youtuber.channelName,
              loading: 'lazy',
              decoding: 'async',
            }),
          ),
        ),
      ),
    ),
    React.createElement(
      'section',
      { className: 'country-detail-stats' },
      React.createElement(CountryStat, { value: detail.countryStats.cityCount, label: '대표 도시' }),
      React.createElement(CountryStat, { value: detail.countryStats.courseCount, label: '대표 코스' }),
      React.createElement(CountryStat, { value: detail.countryStats.youtuberCount, label: '방문 유튜버' }),
    ),
    React.createElement(CountryDetailMap, {
      countryId: detail.country.id,
      cities: detail.citySummaries,
    }),
    React.createElement(
      'section',
      { className: 'country-city-list' },
      React.createElement('h3', { className: 'country-section-title' }, '대표 도시'),
      React.createElement(
        'div',
        { className: 'country-city-list-grid' },
        ...detail.citySummaries.map((city) =>
          React.createElement(CitySummaryItem, {
            key: city.id,
            city,
            hrefBuilder: resolvedCityHrefBuilder,
          }),
        ),
      ),
    ),
    React.createElement(
      'section',
      { className: 'country-featured-courses' },
      React.createElement('h3', { className: 'country-section-title' }, '대표 코스'),
      React.createElement(
        'ol',
        { className: 'country-course-list' },
        ...detail.featuredCourses.map((course) =>
          React.createElement(FeaturedCourseItem, {
            key: course.id,
            course,
            hrefBuilder: courseHrefBuilder,
          }),
        ),
      ),
    ),
  );
}

function formatTravelTitle(title) {
  if (title.endsWith('여행')) {
    return title;
  }

  if (/(코스|루트|여정)$/.test(title)) {
    return title.replace(/(코스|루트|여정)$/, '여행');
  }

  return `${title} 여행`;
}

function renderCountryShape(countryId) {
  if (countryId === 'country-vn') {
    return [
      React.createElement('path', {
        key: 'vn-main',
        d: 'M51 12 C58 15, 59 22, 56 28 C53 34, 53 39, 56 45 C58 50, 57 57, 52 63 C47 69, 46 75, 47 82 C47 86, 44 89, 40 88 C37 86, 36 81, 38 75 C40 68, 39 61, 34 54 C30 48, 30 40, 34 34 C39 28, 42 22, 43 17 C44 13, 47 11, 51 12 Z',
        className: 'country-detail-map-shape',
      }),
    ];
  }

  if (countryId === 'country-jp') {
    return [
      React.createElement('path', {
        key: 'jp-main',
        d: 'M58 17 C62 20, 63 25, 60 29 C57 33, 56 37, 57 41 C58 45, 56 49, 52 53 C49 56, 48 60, 49 64 C50 68, 48 72, 44 75 C41 78, 40 82, 41 86',
        className: 'country-detail-map-shape-line',
      }),
      React.createElement('path', {
        key: 'jp-hokkaido',
        d: 'M60 16 C66 16, 69 20, 68 25 C63 27, 58 25, 56 21 C56 18, 58 16, 60 16 Z',
        className: 'country-detail-map-shape',
      }),
      React.createElement('path', {
        key: 'jp-kyushu',
        d: 'M41 74 C45 74, 48 77, 48 81 C45 84, 40 84, 37 81 C37 77, 39 75, 41 74 Z',
        className: 'country-detail-map-shape',
      }),
    ];
  }

  return [
    React.createElement('path', {
      key: 'default',
      d: 'M24 76 C18 63, 22 34, 34 24 C46 14, 67 16, 75 29 C82 41, 80 61, 68 74 C58 84, 35 86, 24 76 Z',
      className: 'country-detail-map-shape',
    }),
  ];
}
