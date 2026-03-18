import React from 'react';

export function MyScreen() {
  return React.createElement(
    'section',
    null,
    React.createElement('h2', null, '마이'),
    React.createElement('p', null, 'Loading profile...'),
    React.createElement('p', null, 'No recent views yet.'),
    React.createElement('small', null, 'API hook placeholder: preferences/history'),
  );
}
