import React from 'react';

import { getPopularCourses } from './api.js';

export function PopularCourseListScreen() {
  const courses = getPopularCourses();

  return React.createElement(
    'section',
    { className: 'popular-course-screen' },
    React.createElement('h2', { className: 'country-selector-title' }, '실시간 인기 코스'),
    React.createElement(
      'p',
      { className: 'popular-country-description' },
      '지금 가장 많이 보는 여행 동선을 빠르게 확인해보세요.',
    ),
    React.createElement(
      'ol',
      { className: 'country-course-list popular-course-list' },
      ...courses.map((course) =>
        React.createElement(
          'li',
          { key: course.id, className: 'country-course-item popular-course-item' },
          React.createElement(
            'a',
            { href: `/courses/${course.id}`, className: 'popular-course-link' },
            React.createElement(
              'div',
              { className: 'country-course-head' },
              React.createElement(
                'div',
                { className: 'youtuber-course-flag-badge' },
                React.createElement('img', {
                  className: 'youtuber-course-flag-image',
                  src: course.flagImageSrc,
                  alt: course.countryId,
                  loading: 'lazy',
                  decoding: 'async',
                }),
              ),
              React.createElement(
                'div',
                { className: 'country-course-copy' },
                React.createElement('strong', { className: 'country-course-title' }, course.title),
                React.createElement('p', { className: 'country-course-description' }, course.shortDescriptionKo),
                React.createElement(
                  'div',
                  { className: 'country-course-meta' },
                  React.createElement('span', null, `방문 장소 ${course.stopCount}곳`),
                  React.createElement('span', null, `여행 시간 ${course.totalStayLabel}`),
                ),
                React.createElement(
                  'div',
                  { className: 'country-course-tag-list' },
                  ...course.tagLabels.map((tag) =>
                    React.createElement(
                      'span',
                      { key: `${course.id}-${tag}`, className: 'country-course-tag' },
                      tag,
                    ),
                  ),
                ),
              ),
              React.createElement('img', {
                className: 'country-course-avatar',
                src: course.avatarImageSrc,
                alt: course.youtuber.displayName,
                loading: 'lazy',
                decoding: 'async',
              }),
            ),
          ),
        ),
      ),
    ),
  );
}
