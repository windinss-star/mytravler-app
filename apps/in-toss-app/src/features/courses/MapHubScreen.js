import React from 'react';

import { getPreviewCoursesByRegion } from './api.js';
import { HubRouteMap } from './components/HubRouteMap.js';

function buildMapHref({ courseId, countryId, cityId }) {
  const params = new URLSearchParams();
  params.set('course', courseId);

  if (countryId != null) {
    params.set('country', countryId);
  }

  if (cityId != null) {
    params.set('city', cityId);
  }

  return `/map?${params.toString()}`;
}

export function MapHubScreen({ activeCourseId, countryId, cityId }) {
  const courses = getPreviewCoursesByRegion({ countryId, cityId });
  const activeCourse = courses.find((course) => course.id === activeCourseId) ?? courses[0] ?? null;

  if (activeCourse == null) {
    return React.createElement('section', null, React.createElement('p', null, 'No routes available.'));
  }

  return React.createElement(
    'section',
    null,
    React.createElement('p', null, 'Route hub'),
    React.createElement('h2', null, 'Active routes'),
    React.createElement(
      'p',
      null,
      '유튜버별 시작점을 먼저 보고, 시작점을 누르면 해당 유튜버의 여행 코스가 순서대로 펼쳐집니다.',
    ),
    React.createElement('p', null, 'Filter by country'),
    React.createElement(
      'div',
      {
        style: {
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap',
          marginBottom: '10px',
        },
      },
      React.createElement('a', { href: '/map' }, '전체'),
      React.createElement('a', { href: '/map?country=country-jp' }, '일본'),
      React.createElement('a', { href: '/map?country=country-vn' }, '베트남'),
    ),
    React.createElement('p', null, 'Filter by city'),
    React.createElement(
      'div',
      {
        style: {
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap',
          marginBottom: '14px',
        },
      },
      React.createElement('a', { href: '/map?country=country-jp&city=city-tokyo' }, '도쿄'),
      React.createElement('a', { href: '/map?country=country-jp&city=city-fukuoka' }, '후쿠오카'),
      React.createElement('a', { href: '/map?country=country-vn&city=city-hanoi' }, '하노이'),
      React.createElement('a', { href: '/map?country=country-vn&city=city-danang' }, '다낭'),
    ),
    React.createElement('p', null, 'Active course'),
    React.createElement('p', null, 'Selected youtuber'),
    React.createElement('strong', null, activeCourse.youtuber.displayName),
    React.createElement('h3', null, activeCourse.title),
    React.createElement('p', null, activeCourse.shortDescription),
    React.createElement(
      'p',
      null,
      `Stops in this route: ${activeCourse.placeItems.length}`,
    ),
    React.createElement(HubRouteMap, {
      courses,
      activeCourse,
      courseHrefBuilder: (course) =>
        buildMapHref({
          courseId: course.id,
          countryId,
          cityId,
        }),
      placeHrefBuilder: (place) => `/places/${place.id}`,
    }),
    React.createElement('h3', { style: { marginTop: '18px' } }, 'Route details'),
    React.createElement(
      'ol',
      {
        style: {
          display: 'grid',
          gap: '10px',
          marginTop: '10px',
          marginBottom: '18px',
        },
      },
      ...activeCourse.places.map((place, index) =>
        React.createElement(
          'li',
          {
            key: place.id,
            style: {
              border: '1px solid #d9cfbf',
              borderRadius: '14px',
              background: '#fff',
              padding: '12px 14px',
            },
          },
          React.createElement(
            'div',
            { style: { display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'center' } },
            React.createElement(
              'div',
              null,
              React.createElement(
                'strong',
                null,
                `${index + 1}. `,
                React.createElement(
                  'a',
                  { href: `/places/${place.id}` },
                  place.name,
                ),
              ),
              React.createElement(
                'p',
                { style: { margin: '6px 0 0' } },
                place.shortDescription,
              ),
            ),
            React.createElement(
              'small',
              null,
              `${activeCourse.placeItems[index]?.stayMinutes ?? 0} min`,
            ),
          ),
        ),
      ),
    ),
    React.createElement(
      'div',
      {
        style: {
          display: 'grid',
          gap: '16px',
          marginTop: '18px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        },
      },
      ...courses.map((course) =>
        React.createElement(
          'article',
          {
            key: course.id,
            style: {
              border: course.id === activeCourse.id ? '2px solid #172b3a' : '1px solid #d9cfbf',
              borderRadius: '18px',
              padding: '16px',
              background: '#fff',
            },
          },
          React.createElement(
            'a',
            {
              href: buildMapHref({
                courseId: course.id,
                countryId,
                cityId,
              }),
            },
            React.createElement('strong', null, `${course.youtuber.displayName} · ${course.title}`),
          ),
          React.createElement('p', null, course.shortDescription),
          React.createElement(
            'small',
            null,
            course.id === activeCourse.id ? '현재 선택된 코스' : '시작점 선택으로 이 코스 펼치기',
          ),
          React.createElement(
            'div',
            { style: { marginTop: '10px' } },
            React.createElement(
              'a',
              { href: `/courses/${course.id}` },
              '코스 상세 보기',
            ),
          ),
        ),
      ),
    ),
  );
}
