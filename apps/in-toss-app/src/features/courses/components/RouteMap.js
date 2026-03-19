import React from 'react';

function normalizePoints(places) {
  if (places.length === 0) {
    return [];
  }

  const latitudes = places.map((place) => place.location.lat);
  const longitudes = places.map((place) => place.location.lng);
  const minLat = Math.min(...latitudes);
  const maxLat = Math.max(...latitudes);
  const minLng = Math.min(...longitudes);
  const maxLng = Math.max(...longitudes);
  const latRange = Math.max(maxLat - minLat, 0.01);
  const lngRange = Math.max(maxLng - minLng, 0.01);

  return places.map((place, index) => ({
    ...place,
    order: index + 1,
    x: 40 + ((place.location.lng - minLng) / lngRange) * 320,
    y: 40 + ((maxLat - place.location.lat) / latRange) * 180,
  }));
}

export function RouteMap({
  places,
  placeHrefBuilder,
  title = 'Route map',
  showLegend = true,
  showLabels = true,
  height = 260,
}) {
  const points = normalizePoints(places);
  const polyline = points.map((point) => `${point.x},${point.y}`).join(' ');

  return React.createElement(
    'section',
    null,
    React.createElement('h3', null, title),
    React.createElement(
      'svg',
      {
        viewBox: '0 0 400 260',
        width: '100%',
        height: String(height),
        role: 'img',
        'aria-label': 'Course route map',
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
      React.createElement('path', {
        d: 'M58 172 L75 168 L85 178 L80 192 L61 195 L50 184 Z',
        fill: '#323336',
        stroke: '#4f5055',
        strokeWidth: '0.9',
      }),
      React.createElement('path', {
        d: 'M340 96 L356 92 L366 102 L360 116 L345 118 L336 108 Z',
        fill: '#35363a',
        stroke: '#525359',
        strokeWidth: '0.9',
      }),
      React.createElement(
        'text',
        {
          x: '34',
          y: '30',
          fontSize: '11',
          fill: '#8b8c91',
          fontWeight: '700',
        },
        'North coast',
      ),
      React.createElement(
        'text',
        {
          x: '286',
          y: '228',
          fontSize: '11',
          fill: '#808188',
        },
        'South islands',
      ),
      React.createElement('polyline', {
        points: polyline,
        fill: 'none',
        stroke: '#f1f1ef',
        strokeWidth: '3.5',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }),
      React.createElement('polyline', {
        points: polyline,
        fill: 'none',
        stroke: '#66676b',
        strokeWidth: '8',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        opacity: '0.15',
      }),
      React.createElement('circle', {
        cx: points[0]?.x ?? 0,
        cy: points[0]?.y ?? 0,
        r: '22',
        fill: '#f2f2f0',
        opacity: '0.12',
      }),
      ...points.flatMap((point) => {
        const href = placeHrefBuilder?.(point);
        const marker = React.createElement(
          'g',
          { key: point.id },
          React.createElement('circle', {
            cx: point.x,
            cy: point.y,
            r: '14',
            fill: '#f4f4f2',
            stroke: '#0f1011',
            strokeWidth: '2',
          }),
          React.createElement(
            'text',
            {
              x: point.x,
              y: point.y + 4,
              textAnchor: 'middle',
              fontSize: '11',
              fill: '#111112',
              fontWeight: '700',
            },
            point.order,
          ),
          React.createElement(
            'text',
            {
              x: point.x,
              y: point.y - 20,
              textAnchor: 'middle',
              fontSize: '10',
              fill: '#d1d2d5',
              fontWeight: '600',
            },
            showLabels ? point.name : '',
          ),
        );

        if (href == null) {
          return [marker];
        }

        return [
          React.createElement(
            'a',
            { key: point.id, href },
            marker,
          ),
        ];
      }),
      showLegend
        ? React.createElement(
            'g',
            null,
            React.createElement('rect', {
              x: '252',
              y: '16',
              width: '132',
              height: '58',
              rx: '12',
              fill: 'rgba(18,18,19,0.88)',
              stroke: '#3b3c40',
            }),
            React.createElement(
              'text',
              {
                x: '266',
                y: '36',
                fontSize: '11',
                fill: '#f3f3f1',
                fontWeight: '700',
              },
              'Route legend',
            ),
            React.createElement('line', {
              x1: '268',
              y1: '52',
              x2: '304',
              y2: '52',
              stroke: '#f1f1ef',
              strokeWidth: '3.5',
              strokeLinecap: 'round',
            }),
            React.createElement(
              'text',
              {
                x: '312',
                y: '56',
                fontSize: '10',
                fill: '#b5b7bc',
              },
              'route flow',
            ),
            React.createElement('circle', {
              cx: '276',
              cy: '66',
              r: '7',
              fill: '#f4f4f2',
              stroke: '#111112',
              strokeWidth: '1.5',
            }),
            React.createElement(
              'text',
              {
                x: '289',
                y: '70',
                fontSize: '10',
                fill: '#b5b7bc',
              },
              'stop marker',
            ),
          )
        : null,
    ),
  );
}
