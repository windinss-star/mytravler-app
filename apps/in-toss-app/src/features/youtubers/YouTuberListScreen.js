import React from 'react';

import { getFavoriteYoutubers, getYoutubers } from './api.js';
import { FavoriteYouTubersRail } from './components/FavoriteYouTubersRail.js';
import { YouTuberList } from './components/YouTuberList.js';
import { YouTuberSortControl } from './components/YouTuberSortControl.js';

export function YouTuberListScreen() {
  const youtubers = getYoutubers('subscriberCount');

  return React.createElement(
    'section',
    null,
    React.createElement('h2', null, '유튜버'),
    React.createElement(FavoriteYouTubersRail, { youtubers: getFavoriteYoutubers() }),
    React.createElement(YouTuberSortControl, { currentSort: 'subscriberCount' }),
    React.createElement(YouTuberList, { youtubers }),
    React.createElement('small', null, 'API hook: seed-backed /youtubers'),
  );
}
