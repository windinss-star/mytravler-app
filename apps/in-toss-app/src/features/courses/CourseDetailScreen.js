import React from 'react';

import { getCourse } from '../../../../../services/api/src/routes/courses.ts';
import { CourseSummary } from './components/CourseSummary.js';
import { RouteMap } from './components/RouteMap.js';

export function CourseDetailScreen({ courseId, placeHrefBuilder }) {
  const course = getCourse(courseId);

  if (course == null) {
    return React.createElement('section', null, React.createElement('p', null, 'Course not found.'));
  }

  return React.createElement(
    'section',
    null,
    React.createElement(RouteMap, {
      places: course.places,
      placeHrefBuilder,
    }),
    React.createElement(CourseSummary, {
      course,
      places: course.places,
    }),
    React.createElement('h3', null, '방문 장소'),
    React.createElement(
      'ol',
      null,
      ...course.placeItems.map((item) => {
        const place = course.places.find((entry) => entry.id === item.placeId);
        if (place == null) {
          return null;
        }

        return React.createElement(
          'li',
          { key: place.id },
          placeHrefBuilder == null
            ? React.createElement('strong', null, place.name)
            : React.createElement(
                'a',
                { href: placeHrefBuilder(place) },
                React.createElement('strong', null, place.name),
              ),
          React.createElement('p', null, place.shortDescription),
          item.stayMinutes == null
            ? null
            : React.createElement('small', null, `Stay ${item.stayMinutes} minutes`),
        );
      }),
    ),
  );
}
