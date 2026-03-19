import React from 'react';

export function CourseSummary({ course, places }) {
  const movementSummary = places.length <= 2 ? 'walking-friendly city route' : 'mixed city movement';

  return React.createElement(
    'section',
    null,
    React.createElement('p', null, '대표 코스'),
    React.createElement('h2', null, course.title),
    React.createElement('p', null, course.shortDescription),
    React.createElement('p', null, 'Trip day: Day 1 of 1'),
    React.createElement('p', null, `Stops: ${places.length}`),
    React.createElement('p', null, `Movement: ${movementSummary}`),
  );
}
