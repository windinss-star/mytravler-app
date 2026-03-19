import React from 'react';

const CITY_LABELS = {
  'city-tokyo': 'Tokyo zone',
  'city-fukuoka': 'Fukuoka zone',
  'city-hanoi': 'Hanoi zone',
  'city-danang': 'Danang zone',
};

function createNormalizer(points) {
  if (points.length === 0) {
    return (point) => ({
      ...point,
      x: 200,
      y: 130,
    });
  }

  const latitudes = points.map((point) => point.location.lat);
  const longitudes = points.map((point) => point.location.lng);
  const minLat = Math.min(...latitudes);
  const maxLat = Math.max(...latitudes);
  const minLng = Math.min(...longitudes);
  const maxLng = Math.max(...longitudes);
  const latRange = Math.max(maxLat - minLat, 0.01);
  const lngRange = Math.max(maxLng - minLng, 0.01);

  return (point) => ({
    ...point,
    x: 40 + ((point.location.lng - minLng) / lngRange) * 320,
    y: 40 + ((maxLat - point.location.lat) / latRange) * 180,
  });
}

function markerColor(index, isActive) {
  const palette = ['#f4f4f2', '#d7d7d4', '#b8b9bd', '#8f9198'];
  const fill = palette[index % palette.length];

  return {
    fill: isActive ? '#ffffff' : fill,
    stroke: isActive ? '#ffffff' : '#2b2c2f',
  };
}

function getInitials(label) {
  return label
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

function toPolyline(points) {
  return points.map((point) => `${point.x},${point.y}`).join(' ');
}

function buildRegionBlocks(courses, normalizePoint) {
  return Object.values(
    courses.reduce((regions, course) => {
      const cityId = course.cityId ?? 'unknown';
      const normalizedPoints = course.places.map((place) => normalizePoint(place));

      if (normalizedPoints.length === 0) {
        return regions;
      }

      const existing = regions[cityId] ?? {
        id: cityId,
        label: CITY_LABELS[cityId] ?? cityId,
        xs: [],
        ys: [],
      };

      normalizedPoints.forEach((point) => {
        existing.xs.push(point.x);
        existing.ys.push(point.y);
      });

      regions[cityId] = existing;
      return regions;
    }, {}),
  ).map((region) => {
    const minX = Math.min(...region.xs);
    const maxX = Math.max(...region.xs);
    const minY = Math.min(...region.ys);
    const maxY = Math.max(...region.ys);
    const paddingX = 18;
    const paddingY = 14;

    return {
      id: region.id,
      label: region.label,
      x: Math.max(minX - paddingX, 14),
      y: Math.max(minY - paddingY, 14),
      width: Math.max(maxX - minX + paddingX * 2, 68),
      height: Math.max(maxY - minY + paddingY * 2, 42),
    };
  });
}

export function HubRouteMap({ courses, activeCourse, courseHrefBuilder, placeHrefBuilder }) {
  const allPlaces = courses.flatMap((course) => course.places);
  const normalizePoint = createNormalizer(allPlaces);
  const regionBlocks = buildRegionBlocks(courses, normalizePoint);

  const startMarkers = courses.map((course, index) =>
    normalizePoint({
      id: course.id,
      label: course.youtuber.displayName,
      location: course.places[0]?.location ?? { lat: 0, lng: 0 },
      href: courseHrefBuilder(course),
      courseIndex: index,
    }),
  );

  const activePoints = (activeCourse?.places ?? []).map((place) => normalizePoint(place));
  const activePolyline = toPolyline(activePoints);
  const backgroundRoutes = courses
    .filter((course) => course.id !== activeCourse?.id)
    .map((course) => ({
      id: course.id,
      polyline: toPolyline(course.places.map((place) => normalizePoint(place))),
    }))
    .filter((course) => course.polyline.length > 0);

  return React.createElement(
    'section',
    null,
    React.createElement('h3', null, 'Route hub map'),
    React.createElement(
      'svg',
      {
        viewBox: '0 0 400 260',
        width: '100%',
        height: '360',
        role: 'img',
        'aria-label': 'Map hub route overview',
        style: {
          display: 'block',
          border: '1px solid #2d2d2d',
          borderRadius: '18px',
          background: 'linear-gradient(180deg, #0f0f10 0%, #161617 100%)',
        },
      },
      React.createElement('rect', {
        x: '0',
        y: '0',
        width: '400',
        height: '260',
        fill: '#111112',
      }),
      React.createElement('path', {
        d: 'M18 12 L130 20 L176 54 L188 108 L161 152 L176 214 L149 246 L38 252 L11 225 L16 140 L6 76 Z',
        fill: '#343436',
        stroke: '#55565a',
        strokeWidth: '1.2',
      }),
      React.createElement('path', {
        d: 'M252 24 L333 18 L385 56 L392 126 L366 202 L334 238 L276 244 L232 210 L226 140 L239 74 Z',
        fill: '#2e2f31',
        stroke: '#4b4c50',
        strokeWidth: '1.1',
      }),
      React.createElement('path', {
        d: 'M120 182 L146 176 L161 188 L154 210 L126 214 L110 201 Z',
        fill: '#3a3b3e',
        stroke: '#57585c',
        strokeWidth: '1',
      }),
      React.createElement('path', {
        d: 'M286 176 L314 169 L330 182 L322 204 L294 209 L278 195 Z',
        fill: '#393a3d',
        stroke: '#54555a',
        strokeWidth: '1',
      }),
      ...regionBlocks.flatMap((region) => [
        React.createElement('rect', {
          key: `${region.id}-block`,
          x: region.x,
          y: region.y,
          width: region.width,
          height: region.height,
          rx: '18',
          fill: 'rgba(255,255,255,0.02)',
          stroke: '#6b6d73',
          strokeOpacity: '0.45',
          strokeWidth: '1',
          strokeDasharray: '6 4',
        }),
        React.createElement(
          'text',
          {
            key: `${region.id}-label`,
            x: region.x + 12,
            y: region.y - 4,
            fontSize: '10',
            fill: '#8f9298',
            fontWeight: '600',
          },
          region.label,
        ),
      ]),
      ...backgroundRoutes.map((course) =>
        React.createElement('polyline', {
          key: `${course.id}-background`,
          points: course.polyline,
          fill: 'none',
          stroke: '#8b8d92',
          strokeOpacity: '0.28',
          strokeWidth: '2',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        }),
      ),
      activePolyline.length > 0
        ? React.createElement('polyline', {
            points: activePolyline,
            fill: 'none',
            stroke: '#f1f1ef',
            strokeWidth: '3.5',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
          })
        : null,
      ...activePoints.flatMap((point, index) => {
        const place = activeCourse?.places[index];
        if (place == null) {
          return [];
        }

        return [
          React.createElement(
            'a',
            { key: place.id, href: placeHrefBuilder(place) },
            React.createElement(
              'g',
              null,
              React.createElement('circle', {
                cx: point.x,
                cy: point.y,
                r: '12',
                fill: '#f4f4f2',
                stroke: '#111112',
                strokeWidth: '2',
              }),
              React.createElement(
                'text',
                {
                  x: point.x,
                  y: point.y + 4,
                  textAnchor: 'middle',
                  fontSize: '10',
                  fill: '#111112',
                  fontWeight: '700',
                },
                index + 1,
              ),
            ),
          ),
        ];
      }),
      ...startMarkers.map((point) => {
        const isActive = point.id === activeCourse?.id;
        const colors = markerColor(point.courseIndex, isActive);
        const badgeFill = isActive ? '#ffd400' : '#ffdd57';
        const badgeStroke = isActive ? '#ffe990' : '#f3c500';
        const initials = getInitials(point.label);

        return React.createElement(
          'a',
          { key: point.id, href: point.href },
          React.createElement(
            'g',
            null,
            React.createElement('rect', {
              x: point.x - (isActive ? 14 : 11),
              y: point.y - (isActive ? 14 : 11),
              width: isActive ? '28' : '22',
              height: isActive ? '28' : '22',
              rx: '8',
              fill: badgeFill,
              stroke: badgeStroke,
              strokeWidth: isActive ? '2.5' : '2',
            }),
            React.createElement(
              'text',
              {
                x: point.x,
                y: point.y + 3,
                textAnchor: 'middle',
                fontSize: isActive ? '7' : '6',
                fill: '#111112',
                fontWeight: '600',
              },
              initials,
            ),
            React.createElement(
              'text',
              {
                x: point.x + 18,
                y: point.y + 4,
                fontSize: '10',
                fill: isActive ? '#ffffff' : '#b5b7bc',
                fontWeight: '600',
              },
              point.label,
            ),
          ),
        );
      }),
      React.createElement(
        'g',
        null,
        React.createElement('rect', {
          x: '214',
          y: '16',
          width: '170',
          height: '102',
          rx: '12',
          fill: 'rgba(18,18,19,0.88)',
          stroke: '#3b3c40',
        }),
        React.createElement(
          'text',
          {
            x: '228',
            y: '36',
            fontSize: '11',
            fill: '#f3f3f1',
            fontWeight: '700',
          },
          'Route legend',
        ),
        React.createElement('circle', {
          cx: '238',
          cy: '54',
          r: '7',
          fill: '#ffd400',
          stroke: '#f3c500',
          strokeWidth: '1.5',
        }),
        React.createElement(
          'text',
          {
            x: '238',
            y: '57',
            textAnchor: 'middle',
            fontSize: '6',
            fill: '#111112',
            fontWeight: '700',
          },
          'PB',
        ),
        React.createElement(
          'text',
          {
            x: '251',
            y: '58',
            fontSize: '10',
            fill: '#b5b7bc',
          },
          'youtuber start badges',
        ),
        React.createElement('line', {
          x1: '230',
          y1: '70',
          x2: '266',
          y2: '70',
          stroke: '#f1f1ef',
          strokeWidth: '3.5',
          strokeLinecap: 'round',
        }),
        React.createElement(
          'text',
          {
            x: '274',
            y: '74',
            fontSize: '10',
            fill: '#b5b7bc',
          },
          'active route',
        ),
        React.createElement('line', {
          x1: '230',
          y1: '86',
          x2: '266',
          y2: '86',
          stroke: '#8b8d92',
          strokeOpacity: '0.45',
          strokeWidth: '2',
          strokeLinecap: 'round',
        }),
        React.createElement(
          'text',
          {
            x: '274',
            y: '90',
            fontSize: '10',
            fill: '#b5b7bc',
          },
          'other routes in region',
        ),
        React.createElement('rect', {
          x: '230',
          y: '94',
          width: '36',
          height: '10',
          rx: '5',
          fill: 'rgba(255,255,255,0.02)',
          stroke: '#6b6d73',
          strokeOpacity: '0.55',
          strokeWidth: '1',
          strokeDasharray: '6 4',
        }),
        React.createElement(
          'text',
          {
            x: '274',
            y: '103',
            fontSize: '10',
            fill: '#b5b7bc',
          },
          'regional blocks',
        ),
        React.createElement(
          'text',
          {
            x: '228',
            y: '116',
            fontSize: '10',
            fill: '#b5b7bc',
          },
          'arrival badge',
        ),
      ),
    ),
  );
}
