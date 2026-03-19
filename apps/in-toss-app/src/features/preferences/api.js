import { countries, courses, curatedYouTubers } from '../../../../../services/api/src/seed/seed-data.ts';

export function getPreferenceSnapshot() {
  return {
    recentCountries: countries.slice(0, 2),
    recentCourses: courses.slice(0, 2),
    favoriteYoutubers: curatedYouTubers.slice(0, 2),
    notificationSettings: [
      { id: 'informational', label: '정보성 알림', enabled: true },
      { id: 'advertising', label: '광고성 알림', enabled: false },
    ],
    policyLinks: [
      { id: 'terms', label: '서비스 약관', href: '/my#terms' },
      { id: 'privacy', label: '개인정보 처리방침', href: '/my#privacy' },
    ],
  };
}
