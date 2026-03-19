import React from 'react';

import { searchEntities } from './api.js';
import { SearchFiltersSheet } from './components/SearchFiltersSheet.js';
import { SearchResultsList } from './components/SearchResultsList.js';

export function SearchScreen({ query = '' }) {
  const results = query.trim().length === 0 ? [] : searchEntities(query);

  return React.createElement(
    'section',
    null,
    React.createElement('h2', null, '검색'),
    React.createElement('p', null, '국가, 도시, 유튜버, 장소, 코스를 한 번에 탐색합니다.'),
    React.createElement('p', null, `현재 검색어: ${query || '(없음)'}`),
    React.createElement(SearchFiltersSheet),
    results.length === 0
      ? React.createElement('p', null, '검색어를 입력하면 결과가 표시됩니다.')
      : React.createElement(SearchResultsList, { results }),
  );
}
