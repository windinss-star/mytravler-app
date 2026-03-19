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
    { id: 'home', label: '홈', href: '/' },
    { id: 'countries', label: '국가', href: '/countries' },
    { id: 'youtubers', label: '유튜버', href: '/youtubers' },
    { id: 'my', label: '마이', href: '/my' },
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
          :root { color-scheme: light; --bg: #f5efe6; --panel: #fffaf3; --ink: #172b3a; --muted: #5f6f7a; --line: #d9cfbf; --accent: #c96f3b; }
          * { box-sizing: border-box; }
          body { margin: 0; font-family: Georgia, "Noto Serif KR", serif; background: radial-gradient(circle at top, #fff8ef 0%, var(--bg) 55%, #efe3d2 100%); color: var(--ink); }
          a { color: inherit; }
          .shell { max-width: 1080px; margin: 0 auto; padding: 24px; }
          .hero { padding: 24px; border: 1px solid var(--line); background: rgba(255,250,243,0.94); border-radius: 20px; box-shadow: 0 12px 30px rgba(23,43,58,0.08); }
          .eyebrow { color: var(--accent); text-transform: uppercase; letter-spacing: 0.08em; font-size: 12px; margin: 0 0 8px; }
          .hero h1 { margin: 0; font-size: clamp(32px, 5vw, 52px); }
          .hero p { color: var(--muted); max-width: 720px; }
          .tabs { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; margin: 20px 0 28px; }
          .tab { display: block; text-align: center; padding: 14px 16px; text-decoration: none; border-radius: 999px; border: 1px solid var(--line); background: rgba(255,255,255,0.72); }
          .tab.active { background: var(--ink); color: white; border-color: var(--ink); }
          .panel { padding: 22px; border: 1px solid var(--line); background: rgba(255,250,243,0.94); border-radius: 18px; box-shadow: 0 12px 24px rgba(23,43,58,0.06); }
          .grid { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }
          .card { padding: 18px; border-radius: 16px; border: 1px solid var(--line); background: white; text-decoration: none; box-shadow: 0 10px 20px rgba(23,43,58,0.05); }
          .card p, .panel p, .panel small { color: var(--muted); }
          ul, ol { padding-left: 18px; }
          @media (max-width: 720px) { .tabs { grid-template-columns: repeat(2, minmax(0, 1fr)); } .shell { padding: 16px; } }
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
          'header',
          { className: 'hero' },
          React.createElement('p', { className: 'eyebrow' }, 'Local Preview'),
          React.createElement('h1', null, '여행 유튜버 코스'),
          React.createElement(
            'p',
            null,
            '현재 seed 데이터 기반으로 국가, 유튜버, 코스 흐름을 브라우저에서 직접 눌러볼 수 있는 프리뷰입니다.',
          ),
        ),
        React.createElement(
          'nav',
          { className: 'tabs' },
          ...tabs.map((tab) =>
            React.createElement(
              'a',
              {
                key: tab.id,
                href: tab.href,
                className: activeTab === tab.id ? 'tab active' : 'tab',
              },
              tab.label,
            ),
          ),
        ),
        React.createElement('main', { className: 'panel' }, children),
      ),
    ),
  );
}


function HomePreview() {
  return React.createElement(
    'div',
    null,
    React.createElement(HomeScreen),
    React.createElement(
      'div',
      { className: 'grid' },
      React.createElement(
        'a',
        { className: 'card', href: '/search?q=일' },
        React.createElement('strong', null, '통합 검색'),
        React.createElement('p', null, '국가, 도시, 유튜버, 장소, 코스를 한 번에 탐색합니다.'),
      ),
      React.createElement(
        'a',
        { className: 'card', href: '/map' },
        React.createElement('strong', null, '지도에서 코스 보기'),
        React.createElement('p', null, '여러 코스의 루트를 먼저 보고 상세로 이동합니다.'),
      ),
      React.createElement(
        'a',
        { className: 'card', href: '/countries' },
        React.createElement('strong', null, '국가 탐색'),
        React.createElement('p', null, '국가 목록에서 도시와 대표 코스를 살펴봅니다.'),
      ),
      React.createElement(
        'a',
        { className: 'card', href: '/youtubers' },
        React.createElement('strong', null, '유튜버 탐색'),
        React.createElement('p', null, '정렬과 즐겨찾기 레일을 포함한 목록을 봅니다.'),
      ),
      React.createElement(
        'a',
        { className: 'card', href: '/courses/course-pani-tokyo-1' },
        React.createElement('strong', null, '인기 코스 보기'),
        React.createElement('p', null, '빠니보틀의 도쿄 대표 코스를 바로 살펴봅니다.'),
      ),
    ),
  );
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
