import React from 'react';

export function RecentViewsCard({ recentCountries, recentCourses, favoriteYoutubers }) {
  return React.createElement(
    'section',
    null,
    React.createElement('h3', null, '최근 본 코스'),
    React.createElement(
      'ul',
      null,
      ...recentCourses.map((course) =>
        React.createElement('li', { key: course.id }, course.title),
      ),
    ),
    React.createElement('h3', null, '최근 본 국가'),
    React.createElement(
      'ul',
      null,
      ...recentCountries.map((country) =>
        React.createElement('li', { key: country.id }, country.nameKo),
      ),
    ),
    React.createElement('h3', null, '즐겨찾는 유튜버'),
    React.createElement(
      'ul',
      null,
      ...favoriteYoutubers.map((youtuber) =>
        React.createElement('li', { key: youtuber.id }, youtuber.displayName),
      ),
    ),
  );
}
