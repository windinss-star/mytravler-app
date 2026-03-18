import React from 'react';

export function YouTuberSortControl({ currentSort = 'displayName', hrefBuilder }) {
  return React.createElement(
    'section',
    null,
    React.createElement('h3', null, '정렬'),
    React.createElement(
      'p',
      null,
      '현재 정렬: ',
      currentSort === 'subscriberCount' ? '구독자 수' : '이름순',
    ),
    React.createElement(
      'div',
      null,
      hrefBuilder == null
        ? '이름순 / 구독자 수'
        : React.createElement('a', { href: hrefBuilder('displayName') }, '이름순'),
      ' ',
      hrefBuilder == null
        ? null
        : React.createElement('a', { href: hrefBuilder('subscriberCount') }, '구독자 수'),
    ),
  );
}
