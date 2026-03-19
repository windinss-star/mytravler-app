import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { getCountries } from '../features/countries/api.js';
import { CountryDetailScreen } from '../features/countries/CountryDetailScreen.js';
import { CountryListScreen } from '../features/countries/CountryListScreen.js';
import { CourseDetailScreen } from '../features/courses/CourseDetailScreen.js';
import { MapHubScreen } from '../features/courses/MapHubScreen.js';
import { HomeScreen } from '../features/home/HomeScreen.js';
import { MyScreen } from '../features/my/MyScreen.js';
import { PlaceDetailScreen } from '../features/places/PlaceDetailScreen.js';
import { SearchScreen } from '../features/search/SearchScreen.js';
import { getFavoriteYoutubers, getYoutubers } from '../features/youtubers/api.js';
import { YouTuberDetailScreen } from '../features/youtubers/YouTuberDetailScreen.js';
import { FavoriteYouTubersRail } from '../features/youtubers/components/FavoriteYouTubersRail.js';
import { YouTuberList } from '../features/youtubers/components/YouTuberList.js';
import { YouTuberSortControl } from '../features/youtubers/components/YouTuberSortControl.js';
import { YouTuberListScreen } from '../features/youtubers/YouTuberListScreen.js';

function Layout({ title, activeTab, children }) {
  const tabs = [
    { id: 'home', label: '홈', href: '/', icon: '⌂' },
    { id: 'countries', label: '국가', href: '/countries', icon: '◎' },
    { id: 'youtubers', label: '유튜버', href: '/youtubers', icon: '◉' },
    { id: 'my', label: '마이', href: '/my', icon: '◌' },
  ];

  return React.createElement(
    'html',
    { lang: 'ko' },
    React.createElement(
      'head',
      null,
      React.createElement('meta', { charSet: 'utf-8' }),
      React.createElement('meta', {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      }),
      React.createElement('title', null, `${title} | 여행 유튜버 코스`),
      React.createElement(
        'style',
        null,
        `
          :root { color-scheme: dark; --bg: #0b0d10; --surface: #15181d; --surface-soft: #1b2027; --surface-strong: #20262f; --surface-nav: rgba(9,11,14,0.94); --ink: #f8fafc; --muted: #9aa4b2; --line: #262d36; --line-strong: #313a46; --accent: #4f8dff; }
          * { box-sizing: border-box; }
          body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans KR", sans-serif; background: var(--bg); color: var(--ink); }
          a { color: inherit; }
          .shell { max-width: 430px; min-height: 100vh; margin: 0 auto; background: linear-gradient(180deg, #0d1014 0%, #090b0e 100%); }
          .content { padding: 20px 20px 108px; }
          .screen { display: grid; gap: 16px; }
          .panel { display: grid; gap: 16px; padding: 20px; border-radius: 24px; background: var(--surface); box-shadow: inset 0 1px 0 rgba(255,255,255,0.02), 0 8px 24px rgba(0,0,0,0.28); }
          .panel h1, .panel h2, .panel h3, .panel strong { color: var(--ink); }
          .panel p, .panel small, .panel li { color: var(--muted); }
          .grid { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); }
          .card { padding: 18px; border-radius: 20px; border: 1px solid var(--line); background: var(--surface); text-decoration: none; box-shadow: 0 10px 22px rgba(0,0,0,0.22); }
          .card p, .card small { color: var(--muted); }
          .bottom-nav { position: sticky; bottom: 0; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 4px; padding: 10px 14px 18px; background: var(--surface-nav); backdrop-filter: blur(22px); border-top: 1px solid rgba(255,255,255,0.05); box-shadow: 0 -12px 28px rgba(0,0,0,0.34); }
          .bottom-nav-item { position: relative; display: grid; gap: 4px; justify-items: center; padding: 10px 6px 8px; border-radius: 14px; text-decoration: none; color: #7f8b99; font-size: 12px; font-weight: 600; letter-spacing: -0.01em; }
          .bottom-nav-item.active { color: var(--ink); background: transparent; box-shadow: none; }
          .bottom-nav-item.active::before { content: ""; position: absolute; top: 0; left: 50%; width: 24px; height: 3px; border-radius: 999px; background: var(--ink); transform: translateX(-50%); }
          .bottom-nav-icon { font-size: 18px; line-height: 1; opacity: 0.92; }
          .home-screen { display: grid; gap: 18px; }
          .home-header { display: flex; align-items: center; justify-content: space-between; min-height: 32px; }
          .home-service-name { margin: 0; font-size: 24px; line-height: 1.3; font-weight: 800; letter-spacing: -0.03em; color: var(--ink); }
          .home-search-form { margin: 0; }
          .home-search-field { display: flex; align-items: center; gap: 10px; width: 100%; padding: 0 16px; height: 54px; border-radius: 18px; background: var(--surface); border: 1px solid var(--line); box-shadow: inset 0 1px 0 rgba(255,255,255,0.02); }
          .home-search-icon { color: #7c8798; font-size: 18px; }
          .home-search-input { flex: 1; border: 0; background: transparent; font-size: 15px; color: var(--ink); outline: none; }
          .home-search-input::placeholder { color: #7c8798; }
          .home-menu-list { display: grid; gap: 12px; }
          .home-menu-item { display: grid; grid-template-columns: 72px minmax(0, 1fr) 20px; align-items: center; gap: 14px; min-height: 96px; padding: 14px 16px; border-radius: 24px; background: linear-gradient(180deg, var(--surface-soft) 0%, #161a20 100%); border: 1px solid var(--line); text-decoration: none; box-shadow: inset 0 1px 0 rgba(255,255,255,0.02), 0 10px 22px rgba(0,0,0,0.22); }
          .home-menu-visual { position: relative; display: inline-flex; align-items: center; justify-content: center; width: 72px; height: 72px; }
          .home-menu-icon-shadow { position: absolute; inset: auto 10px 4px; height: 14px; border-radius: 999px; background: rgba(0,0,0,0.34); filter: blur(8px); }
          .home-menu-icon { position: relative; display: inline-flex; align-items: center; justify-content: center; width: 72px; height: 72px; border-radius: 26px; }
          .home-menu-icon-badge { position: absolute; inset: 3px; border-radius: 23px; background: linear-gradient(180deg, #303742 0%, #20262f 100%); box-shadow: inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -10px 18px rgba(0,0,0,0.18), 0 18px 24px rgba(0,0,0,0.2); }
          .home-menu-icon-core { position: absolute; inset: 10px; border-radius: 18px; background: radial-gradient(circle at top, #3a434f 0%, #252c35 44%, #171b22 100%); box-shadow: inset 0 8px 16px rgba(255,255,255,0.07), inset 0 -10px 16px rgba(0,0,0,0.18); }
          .home-menu-icon-gloss { position: absolute; top: 11px; left: 15px; width: 28px; height: 12px; border-radius: 999px; background: rgba(255,255,255,0.22); transform: rotate(-16deg); }
          .home-menu-icon-glyph { position: relative; z-index: 1; font-size: 29px; transform: translateY(-1px); filter: saturate(1.04); }
          .home-menu-copy { display: grid; gap: 6px; min-width: 0; }
          .home-menu-title { font-size: 17px; line-height: 1.35; letter-spacing: -0.03em; color: var(--ink); }
          .home-menu-description { font-size: 13px; line-height: 1.45; color: var(--muted); }
          .home-menu-arrow { justify-self: end; font-size: 24px; color: #6d7785; transform: translateY(-1px); }
          ul, ol { padding-left: 18px; }
          @media (max-width: 420px) { .content { padding: 16px 16px 104px; } .home-menu-item { grid-template-columns: 64px minmax(0, 1fr) 18px; min-height: 88px; padding: 12px 14px; } .home-menu-visual, .home-menu-icon { width: 64px; height: 64px; } }
        `,
      ),
    ),
    React.createElement(
      'body',
      null,
      React.createElement(
        'div',
        { className: 'shell' },
        React.createElement(
          'div',
          { className: 'content' },
          React.createElement(
            'main',
            { className: activeTab === 'home' ? 'screen' : 'panel' },
            children,
          ),
        ),
        React.createElement(
          'nav',
          { className: 'bottom-nav' },
          ...tabs.map((tab) =>
            React.createElement(
              'a',
              {
                key: tab.id,
                href: tab.href,
                className: activeTab === tab.id ? 'bottom-nav-item active' : 'bottom-nav-item',
              },
              React.createElement('span', { className: 'bottom-nav-icon', 'aria-hidden': 'true' }, tab.icon),
              React.createElement('span', null, tab.label),
            ),
          ),
        ),
      ),
    ),
  );
}

function HomePreview() {
  return React.createElement(HomeScreen);
}

function CountriesPreview() {
  const countries = getCountries();

  return React.createElement(
    'div',
    null,
    React.createElement(CountryListScreen),
    React.createElement(
      'div',
      { className: 'grid' },
      ...countries.map((country) =>
        React.createElement(
          'a',
          { className: 'card', href: `/countries/${country.id}`, key: country.id },
          React.createElement('strong', null, country.nameKo),
          React.createElement('p', null, country.nameEn),
        ),
      ),
    ),
  );
}

function YoutubersPreview({ sortBy }) {
  const youtubers = getYoutubers(sortBy);

  return React.createElement(
    'div',
    null,
    React.createElement(YouTuberListScreen),
    React.createElement(FavoriteYouTubersRail, {
      youtubers: getFavoriteYoutubers(),
      hrefBuilder: (youtuber) => `/youtubers/${youtuber.id}`,
    }),
    React.createElement(YouTuberSortControl, {
      currentSort: sortBy,
      hrefBuilder: (nextSort) => `/youtubers?sort=${nextSort}`,
    }),
    React.createElement(YouTuberList, {
      youtubers,
      hrefBuilder: (youtuber) => `/youtubers/${youtuber.id}`,
    }),
  );
}

export function renderPreviewPage(pathname, searchParams) {
  let title = '홈';
  let activeTab = 'home';
  let content = React.createElement(HomePreview);

  if (pathname === '/search') {
    title = '검색';
    content = React.createElement(SearchScreen, {
      query: searchParams.get('q') ?? '',
    });
  } else if (pathname === '/map') {
    title = '지도 허브';
    activeTab = 'countries';
    content = React.createElement(MapHubScreen, {
      activeCourseId: searchParams.get('course') ?? undefined,
      countryId: searchParams.get('country') ?? undefined,
      cityId: searchParams.get('city') ?? undefined,
    });
  } else if (pathname === '/countries') {
    title = '국가';
    activeTab = 'countries';
    content = React.createElement(CountriesPreview);
  } else if (pathname.startsWith('/countries/')) {
    title = '국가 상세';
    activeTab = 'countries';
    content = React.createElement(CountryDetailScreen, {
      countryId: pathname.replace('/countries/', ''),
      courseHrefBuilder: (course) => `/courses/${course.id}`,
      youtuberHrefBuilder: (youtuber) => `/youtubers/${youtuber.id}`,
    });
  } else if (pathname.startsWith('/courses/')) {
    title = '코스 상세';
    activeTab = 'countries';
    content = React.createElement(CourseDetailScreen, {
      courseId: pathname.replace('/courses/', ''),
      placeHrefBuilder: (place) => `/places/${place.id}`,
    });
  } else if (pathname.startsWith('/places/')) {
    title = '장소 상세';
    activeTab = 'countries';
    content = React.createElement(PlaceDetailScreen, {
      placeId: pathname.replace('/places/', ''),
    });
  } else if (pathname === '/youtubers') {
    title = '유튜버';
    activeTab = 'youtubers';
    content = React.createElement(YoutubersPreview, {
      sortBy: searchParams.get('sort') ?? 'subscriberCount',
    });
  } else if (pathname.startsWith('/youtubers/')) {
    title = '유튜버 상세';
    activeTab = 'youtubers';
    content = React.createElement(YouTuberDetailScreen, {
      youtuberId: pathname.replace('/youtubers/', ''),
      courseHrefBuilder: (course) => `/courses/${course.id}`,
    });
  } else if (pathname === '/my') {
    title = '마이';
    activeTab = 'my';
    content = React.createElement(MyScreen);
  }

  return `<!doctype html>${renderToStaticMarkup(
    React.createElement(Layout, { title, activeTab }, content),
  )}`;
}
