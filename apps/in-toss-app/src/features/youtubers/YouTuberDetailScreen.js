import React from 'react';

import { getYoutuberDetail } from './api.js';

export function YouTuberDetailScreen({ youtuberId, courseHrefBuilder }) {
  const detail = getYoutuberDetail(youtuberId);

  if (detail == null) {
    return React.createElement(
      'section',
      { className: 'youtuber-detail-screen' },
      React.createElement('p', null, '유튜버 정보를 찾을 수 없습니다.'),
    );
  }

  return React.createElement(
    'section',
    { className: 'youtuber-detail-screen' },
    React.createElement(
      'header',
      { className: 'youtuber-detail-hero' },
      React.createElement('img', {
        className: 'youtuber-detail-avatar',
        src: detail.youtuber.avatarImageSrc,
        alt: detail.youtuber.displayName,
        loading: 'lazy',
        decoding: 'async',
      }),
      React.createElement(
        'div',
        { className: 'youtuber-detail-hero-copy' },
        React.createElement('h2', { className: 'youtuber-detail-name' }, detail.youtuber.displayName),
        React.createElement('p', { className: 'youtuber-detail-summary' }, detail.youtuber.summaryKo),
      ),
    ),
    React.createElement(
      'section',
      { className: 'youtuber-detail-section' },
      React.createElement(
        'div',
        { className: 'youtuber-detail-tag-list' },
        ...detail.topTags.map((tag) =>
          React.createElement(
            'span',
            { key: `${detail.youtuber.id}-${tag}`, className: 'youtuber-detail-tag' },
            tag,
          ),
        ),
      ),
    ),
    React.createElement(
      'section',
      { className: 'youtuber-detail-section' },
      React.createElement('h3', { className: 'country-section-title' }, '다녀온 국가'),
      React.createElement(
        'div',
        { className: 'youtuber-detail-country-list' },
        ...detail.visitedCountries.map((country) =>
          React.createElement(
            'div',
            { key: country.id, className: 'youtuber-detail-country-item' },
            React.createElement('img', {
              className: 'youtuber-detail-country-flag',
              src: country.flagImageSrc,
              alt: country.nameKo,
              loading: 'lazy',
              decoding: 'async',
            }),
            React.createElement('span', { className: 'youtuber-detail-country-name' }, country.nameKo),
          ),
        ),
      ),
    ),
    React.createElement(
      'section',
      { className: 'country-featured-courses' },
      React.createElement('h3', { className: 'country-section-title' }, '여행 코스'),
      React.createElement(
        'ol',
        { className: 'country-course-list' },
        ...detail.courses.map((course) =>
          React.createElement(
            'li',
            { key: course.id, className: 'country-course-item' },
            React.createElement(
              'div',
              { className: 'youtuber-course-row' },
              React.createElement(
                'div',
                { className: 'youtuber-course-flag-badge' },
                React.createElement('img', {
                  className: 'youtuber-course-flag-image',
                  src: course.courseFlag.flagImageSrc,
                  alt: course.courseFlag.code,
                  loading: 'lazy',
                  decoding: 'async',
                }),
              ),
              React.createElement(
                'div',
                { className: 'country-course-copy' },
                courseHrefBuilder == null
                  ? React.createElement('strong', { className: 'country-course-title' }, course.titleKo)
                  : React.createElement(
                      'a',
                      { href: courseHrefBuilder(course), className: 'country-course-link' },
                      React.createElement('strong', { className: 'country-course-title' }, course.titleKo),
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
                React.createElement(
                  'div',
                  { className: 'country-course-meta' },
                  React.createElement('span', null, `방문 장소 ${course.stopCount}곳`),
                  React.createElement('span', null, `소요 시간 : ${course.totalStayLabel}`),
                ),
              ),
            ),
          ),
        ),
      ),
    ),
  );
}
