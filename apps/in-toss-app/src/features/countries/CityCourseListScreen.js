import React from 'react';

import { getCountryCityDetail } from './api.js';

function formatTravelTitle(title) {
  if (title.endsWith('여행')) {
    return title;
  }

  if (/(코스|루트|여정)$/.test(title)) {
    return title.replace(/(코스|루트|여정)$/, '여행');
  }

  return `${title} 여행`;
}

export function CityCourseListScreen({ countryId, cityId, courseHrefBuilder }) {
  const detail = getCountryCityDetail(countryId, cityId);

  if (detail == null) {
    return React.createElement(
      'section',
      { className: 'country-city-screen' },
      React.createElement('p', null, '도시 정보를 찾을 수 없습니다.'),
    );
  }

  return React.createElement(
    'section',
    { className: 'country-city-screen' },
    React.createElement(
      'a',
      { className: 'country-detail-back', href: `/countries/${detail.country.id}` },
      '← 국가 상세로',
    ),
    React.createElement(
      'header',
      { className: 'country-city-hero' },
      React.createElement(
        'div',
        { className: 'country-city-hero-copy' },
        React.createElement('span', { className: 'country-detail-eyebrow' }, detail.country.nameKo),
        React.createElement('h2', { className: 'country-detail-name-ko' }, detail.city.nameKo),
        React.createElement('div', { className: 'country-detail-name-en' }, detail.city.nameEn),
      ),
      React.createElement(
        'div',
        { className: 'country-city-youtuber-stack' },
        ...detail.relatedYoutubers.slice(0, 3).map((youtuber) =>
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
    React.createElement(
      'section',
      { className: 'country-featured-courses' },
      React.createElement('h3', { className: 'country-section-title' }, '도시 코스'),
      React.createElement(
        'ol',
        { className: 'country-course-list country-city-course-list' },
        ...detail.courses.map((course) =>
          React.createElement(
            'li',
            { key: course.id, className: 'country-course-item' },
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
                courseHrefBuilder == null
                  ? React.createElement(
                      'strong',
                      { className: 'country-course-title' },
                      formatTravelTitle(course.title),
                    )
                  : React.createElement(
                      'a',
                      { href: courseHrefBuilder(course), className: 'country-course-link' },
                      React.createElement(
                        'strong',
                        { className: 'country-course-title' },
                        formatTravelTitle(course.title),
                      ),
                    ),
                React.createElement('p', { className: 'country-course-description' }, course.shortDescriptionKo),
                React.createElement(
                  'div',
                  { className: 'country-course-meta' },
                  React.createElement('span', null, `방문 장소 ${course.stopCount}곳`),
                  React.createElement('span', null, `여행 시간 ${course.totalStayLabel}`),
                ),
                course.tagLabels != null && course.tagLabels.length > 0
                  ? React.createElement(
                      'div',
                      { className: 'country-course-tag-list' },
                      ...course.tagLabels.map((tag) =>
                        React.createElement(
                          'span',
                          { key: `${course.id}-${tag}`, className: 'country-course-tag' },
                          tag,
                        ),
                      ),
                    )
                  : null,
              ),
            ),
          ),
        ),
      ),
    ),
  );
}
