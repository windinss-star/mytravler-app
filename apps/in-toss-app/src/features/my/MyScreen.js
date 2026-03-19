import React from 'react';

import { getPreferenceSnapshot } from '../preferences/api.js';
import { NotificationSettingsCard } from './components/NotificationSettingsCard.js';
import { PolicyLinksCard } from './components/PolicyLinksCard.js';
import { RecentViewsCard } from './components/RecentViewsCard.js';

export function MyScreen() {
  const snapshot = getPreferenceSnapshot();

  return React.createElement(
    'section',
    null,
    React.createElement('h2', null, '마이'),
    React.createElement('p', null, '최근 본 여행 기록과 알림 설정을 확인합니다.'),
    React.createElement(RecentViewsCard, {
      recentCountries: snapshot.recentCountries,
      recentCourses: snapshot.recentCourses,
      favoriteYoutubers: snapshot.favoriteYoutubers,
    }),
    React.createElement(NotificationSettingsCard, {
      settings: snapshot.notificationSettings,
    }),
    React.createElement(PolicyLinksCard, {
      links: snapshot.policyLinks,
    }),
  );
}
