import React from 'react';

export function CourseCardList({ courses, hrefBuilder }) {
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
          hrefBuilder == null
            ? React.createElement('strong', null, course.title)
            : React.createElement(
                'a',
                { href: hrefBuilder(course) },
                React.createElement('strong', null, course.title),
              ),
          React.createElement('p', null, course.shortDescription),
        ),
      ),
    ),
  );
}
