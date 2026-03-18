import React from 'react';

export function CourseCardList({ courses }) {
  return React.createElement(
    'section',
    null,
    React.createElement('h3', null, '대표 코스'),
    React.createElement(
      'ul',
      null,
      ...courses.map((course) =>
        React.createElement(
          'li',
          { key: course.id },
          React.createElement('strong', null, course.title),
          React.createElement('p', null, course.shortDescription),
        ),
      ),
    ),
  );
}
