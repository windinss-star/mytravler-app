import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { CountryDetailScreen } from '../features/countries/CountryDetailScreen.js';
import { CityCourseListScreen } from '../features/countries/CityCourseListScreen.js';
import { CountryListScreen } from '../features/countries/CountryListScreen.js';
import { PopularCountryListScreen } from '../features/countries/PopularCountryListScreen.js';
import { CourseDetailScreen } from '../features/courses/CourseDetailScreen.js';
import { MapHubScreen } from '../features/courses/MapHubScreen.js';
import { PopularCourseListScreen } from '../features/courses/PopularCourseListScreen.js';
import { HomeScreen } from '../features/home/HomeScreen.js';
import { MoreScreen } from '../features/more/MoreScreen.js';
import { MyScreen } from '../features/my/MyScreen.js';
import { PlaceDetailScreen } from '../features/places/PlaceDetailScreen.js';
import { SearchScreen } from '../features/search/SearchScreen.js';
import { YouTuberDetailScreen } from '../features/youtubers/YouTuberDetailScreen.js';
import { YouTuberListScreen } from '../features/youtubers/YouTuberListScreen.js';

function Layout({ title, activeTab, children }) {
  const tabs = [
    { id: 'home', label: '\uD648', href: '/', icon: '\u2302' },
    { id: 'countries', label: '\uAD6D\uAC00', href: '/countries', icon: '\u2691' },
    { id: 'youtubers', label: '\uC720\uD29C\uBC84', href: '/youtubers', icon: '\u25B6' },
    { id: 'more', label: '\uB354\uBCF4\uAE30', href: '/more', icon: '\u2630' },
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
      React.createElement('title', null, `${title} | ?ы뻾 ?좏뒠踰?肄붿뒪`),
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
          .home-menu-item { display: grid; grid-template-columns: 68px minmax(0, 1fr) 20px; align-items: center; gap: 12px; min-height: 88px; padding: 12px 16px; border-radius: 24px; background: linear-gradient(180deg, var(--surface-soft) 0%, #161a20 100%); border: 1px solid var(--line); text-decoration: none; box-shadow: inset 0 1px 0 rgba(255,255,255,0.02), 0 10px 22px rgba(0,0,0,0.22); }
          .home-menu-visual { position: relative; display: inline-flex; align-items: center; justify-content: center; width: 68px; height: 68px; }
          .home-menu-visual-frame { position: absolute; inset: 7px; border-radius: 20px; background: radial-gradient(circle at 30% 20%, rgba(44, 51, 62, 0.9) 0%, rgba(25, 29, 36, 0.96) 58%, rgba(12, 14, 18, 1) 100%); border: 1px solid rgba(255,255,255,0.05); box-shadow: inset 0 1px 0 rgba(255,255,255,0.04), inset 0 -14px 22px rgba(0,0,0,0.28); }
          .home-menu-image-shadow { position: absolute; inset: auto 11px 4px; height: 16px; border-radius: 999px; background: rgba(0,0,0,0.42); filter: blur(10px); }
          .home-menu-image { position: relative; z-index: 1; width: 62px; height: 62px; object-fit: contain; filter: drop-shadow(0 12px 18px rgba(0,0,0,0.24)); }
          .home-menu-copy { display: grid; gap: 6px; min-width: 0; }
          .home-menu-title { font-size: 17px; line-height: 1.35; letter-spacing: -0.03em; color: var(--ink); }
          .home-menu-description { font-size: 13px; line-height: 1.45; color: var(--muted); }
          .home-menu-arrow { justify-self: end; font-size: 24px; color: #6d7785; transform: translateY(-1px); }
          .more-screen { display: grid; gap: 18px; }
          .more-menu-list { display: grid; gap: 12px; }
          .more-menu-item { display: grid; grid-template-columns: minmax(0, 1fr) 20px; align-items: center; gap: 12px; min-height: 84px; padding: 14px 16px; border-radius: 22px; background: linear-gradient(180deg, var(--surface-soft) 0%, #161a20 100%); border: 1px solid var(--line); text-decoration: none; box-shadow: inset 0 1px 0 rgba(255,255,255,0.02), 0 10px 22px rgba(0,0,0,0.16); }
          .more-menu-copy { display: grid; gap: 6px; min-width: 0; }
          .country-selector-screen { display: grid; gap: 18px; }
          .country-selector-title { margin: 0; font-size: 25px; line-height: 1.25; letter-spacing: -0.03em; }
          .country-search-form { margin: 0; }
          .country-search-field { display: flex; align-items: center; gap: 10px; width: 100%; padding: 0 16px; height: 54px; border-radius: 18px; background: var(--surface-soft); border: 1px solid var(--line); box-shadow: inset 0 1px 0 rgba(255,255,255,0.02); }
          .country-search-icon { color: #7c8798; font-size: 18px; }
          .country-search-input { flex: 1; border: 0; background: transparent; font-size: 15px; color: var(--ink); outline: none; }
          .country-search-input::placeholder { color: #7c8798; }
          .country-list { display: grid; gap: 12px; }
          .country-list-item { display: grid; grid-template-columns: 58px minmax(0, 1fr) auto; align-items: center; gap: 14px; min-height: 84px; padding: 12px 14px; border-radius: 22px; background: linear-gradient(180deg, var(--surface-soft) 0%, #161a20 100%); border: 1px solid var(--line); text-decoration: none; box-shadow: inset 0 1px 0 rgba(255,255,255,0.02), 0 10px 22px rgba(0,0,0,0.16); }
          .country-flag-badge { position: relative; display: inline-flex; align-items: center; justify-content: center; width: 58px; height: 58px; }
          .country-flag-badge-shadow { position: absolute; inset: auto 9px 4px; height: 12px; border-radius: 999px; background: rgba(0,0,0,0.38); filter: blur(8px); }
          .country-flag-badge-surface { position: absolute; inset: 5px; border-radius: 18px; background: radial-gradient(circle at 30% 20%, rgba(65, 74, 88, 0.94) 0%, rgba(31, 36, 44, 0.98) 62%, rgba(12, 14, 18, 1) 100%); border: 1px solid rgba(255,255,255,0.05); box-shadow: inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -10px 18px rgba(0,0,0,0.2); }
          .country-flag-badge-image { position: relative; z-index: 1; width: 46px; height: 46px; object-fit: contain; filter: drop-shadow(0 6px 10px rgba(0,0,0,0.25)); }
          .country-list-copy { display: grid; gap: 4px; min-width: 0; }
          .country-list-name-ko { font-size: 18px; line-height: 1.3; letter-spacing: -0.03em; color: var(--ink); }
          .country-list-name-en { font-size: 13px; line-height: 1.35; color: #7f8b99; }
          .country-list-meta { display: inline-flex; align-items: center; gap: 8px; }
          .popular-country-screen { display: grid; gap: 18px; }
          .popular-country-description { margin: -6px 0 0; color: #8b96a5; font-size: 14px; line-height: 1.5; }
          .popular-country-list { display: grid; gap: 12px; }
          .popular-country-item { align-items: start; }
          .popular-country-rank { color: #8eaafc; font-size: 12px; font-weight: 700; line-height: 1.3; }
          .popular-country-counts { color: #aab4c1; font-size: 12px; line-height: 1.45; }
          .popular-course-screen { display: grid; gap: 18px; }
          .popular-course-list { display: grid; gap: 12px; margin: 0; padding: 0; list-style: none; }
          .popular-course-item { list-style: none; }
          .popular-course-link { display: block; color: inherit; text-decoration: none; }
          .country-youtuber-stack { display: inline-flex; align-items: center; padding-left: 28px; }
          .country-youtuber-stack-item { width: 36px; height: 36px; margin-left: -28px; border-radius: 999px; object-fit: cover; border: 2px solid #14181d; box-shadow: 0 8px 18px rgba(0,0,0,0.22); background: #1d222a; }
          .country-youtuber-count { display: inline-flex; align-items: center; justify-content: center; min-width: 30px; height: 30px; padding: 0 8px; border-radius: 999px; background: rgba(255,255,255,0.05); color: #cfd8e3; font-size: 12px; font-weight: 700; }
          .youtuber-selector-screen { display: grid; gap: 18px; }
          .youtuber-list-item { display: grid; grid-template-columns: 58px minmax(0, 1fr) auto; align-items: center; gap: 14px; min-height: 84px; padding: 12px 14px; border-radius: 22px; background: linear-gradient(180deg, var(--surface-soft) 0%, #161a20 100%); border: 1px solid var(--line); text-decoration: none; box-shadow: inset 0 1px 0 rgba(255,255,255,0.02), 0 10px 22px rgba(0,0,0,0.16); }
          .youtuber-list-avatar { width: 58px; height: 58px; border-radius: 999px; object-fit: cover; border: 2px solid #14181d; box-shadow: 0 10px 22px rgba(0,0,0,0.22); background: #1d222a; }
          .youtuber-list-copy { display: grid; gap: 4px; min-width: 0; }
          .youtuber-list-name { font-size: 18px; line-height: 1.3; letter-spacing: -0.03em; color: var(--ink); }
          .youtuber-list-summary { margin: 0; font-size: 13px; line-height: 1.45; color: #7f8b99; }
          .youtuber-country-stack { display: inline-flex; align-items: center; padding-left: 28px; }
          .youtuber-country-stack-item { width: 33px; height: 33px; margin-left: -25px; border-radius: 999px; object-fit: cover; border: 2px solid #14181d; box-shadow: 0 8px 18px rgba(0,0,0,0.22); background: #1d222a; }
          .youtuber-detail-screen { display: grid; gap: 18px; }
          .youtuber-detail-hero { display: grid; grid-template-columns: 72px minmax(0, 1fr); align-items: center; gap: 16px; padding: 18px; border-radius: 26px; background: linear-gradient(180deg, rgba(31, 37, 46, 0.94) 0%, rgba(18, 22, 28, 1) 100%); border: 1px solid rgba(255,255,255,0.05); box-shadow: inset 0 1px 0 rgba(255,255,255,0.03), 0 16px 34px rgba(0,0,0,0.24); }
          .youtuber-detail-avatar { width: 72px; height: 72px; border-radius: 999px; object-fit: cover; border: 2px solid #14181d; box-shadow: 0 12px 24px rgba(0,0,0,0.24); background: #1d222a; }
          .youtuber-detail-hero-copy { display: grid; gap: 6px; }
          .youtuber-detail-name { margin: 0; font-size: 28px; line-height: 1.15; letter-spacing: -0.04em; color: var(--ink); }
          .youtuber-detail-summary { margin: 0; font-size: 14px; line-height: 1.5; color: #aab4c1; }
          .youtuber-detail-section { display: grid; gap: 12px; }
          .youtuber-detail-tag-list { display: flex; flex-wrap: wrap; gap: 8px; }
          .youtuber-detail-tag { display: inline-flex; align-items: center; min-height: 30px; padding: 0 11px; border-radius: 999px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.08); color: #d7e0eb; font-size: 12px; font-weight: 600; line-height: 1; }
          .youtuber-detail-country-list { display: flex; flex-wrap: wrap; gap: 10px; }
          .youtuber-detail-country-item { display: inline-flex; align-items: center; gap: 8px; padding: 8px 12px; border-radius: 999px; background: linear-gradient(180deg, rgba(27, 32, 39, 1) 0%, rgba(20, 24, 30, 1) 100%); border: 1px solid rgba(255,255,255,0.05); }
          .youtuber-detail-country-flag { width: 24px; height: 24px; border-radius: 999px; object-fit: cover; }
          .youtuber-detail-country-name { color: var(--ink); font-size: 13px; font-weight: 600; line-height: 1.35; }
          .youtuber-course-row { display: grid; grid-template-columns: 48px minmax(0, 1fr); gap: 14px; align-items: center; }
          .youtuber-course-flag-badge { display: inline-flex; align-items: center; justify-content: center; width: 48px; height: 48px; border-radius: 16px; background: radial-gradient(circle at 30% 20%, rgba(65, 74, 88, 0.94) 0%, rgba(31, 36, 44, 0.98) 62%, rgba(12, 14, 18, 1) 100%); border: 1px solid rgba(255,255,255,0.05); box-shadow: inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -10px 18px rgba(0,0,0,0.2); }
          .youtuber-course-flag-image { width: 28px; height: 28px; border-radius: 999px; object-fit: cover; }
          .country-detail-screen { display: grid; gap: 18px; }
          .country-detail-back { display: inline-flex; align-items: center; gap: 6px; color: #93a0b0; font-size: 13px; text-decoration: none; }
          .country-detail-hero { display: grid; grid-template-columns: 64px minmax(0, 1fr); align-items: center; gap: 16px; padding: 18px; border-radius: 26px; background: linear-gradient(180deg, rgba(31, 37, 46, 0.94) 0%, rgba(18, 22, 28, 1) 100%); border: 1px solid rgba(255,255,255,0.05); box-shadow: inset 0 1px 0 rgba(255,255,255,0.03), 0 16px 34px rgba(0,0,0,0.24); }
          .country-detail-flag-badge { position: relative; display: inline-flex; align-items: center; justify-content: center; width: 64px; height: 64px; }
          .country-detail-flag-shadow { position: absolute; inset: auto 10px 4px; height: 14px; border-radius: 999px; background: rgba(0,0,0,0.38); filter: blur(8px); }
          .country-detail-flag-surface { position: absolute; inset: 6px; border-radius: 20px; background: radial-gradient(circle at 30% 20%, rgba(65, 74, 88, 0.94) 0%, rgba(31, 36, 44, 0.98) 62%, rgba(12, 14, 18, 1) 100%); border: 1px solid rgba(255,255,255,0.05); box-shadow: inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -10px 18px rgba(0,0,0,0.2); }
          .country-detail-flag-image { position: relative; z-index: 1; width: 50px; height: 50px; object-fit: contain; filter: drop-shadow(0 6px 10px rgba(0,0,0,0.25)); }
          .country-detail-hero-copy { display: grid; gap: 6px; }
          .country-detail-eyebrow { color: #7f8b99; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }
          .country-detail-name-ko { margin: 0; font-size: 32px; line-height: 1.1; letter-spacing: -0.04em; }
          .country-detail-name-en { color: #7f8b99; font-size: 15px; line-height: 1.35; }
          .country-detail-youtubers { display: grid; gap: 10px; grid-column: 1 / -1; }
          .country-detail-youtubers-label { color: #9aa4b2; font-size: 13px; font-weight: 600; }
          .country-detail-youtuber-stack { display: inline-flex; align-items: center; gap: 8px; }
          .country-detail-youtuber-avatar { width: 44px; height: 44px; margin-left: 0; border-radius: 999px; border: 2px solid #14181d; object-fit: cover; box-shadow: 0 10px 24px rgba(0,0,0,0.24); }
          .country-detail-stats { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
          .country-stat-card { display: grid; gap: 4px; padding: 14px 12px; border-radius: 20px; background: linear-gradient(180deg, rgba(27, 32, 39, 1) 0%, rgba(20, 24, 30, 1) 100%); border: 1px solid rgba(255,255,255,0.05); }
          .country-stat-value { font-size: 24px; line-height: 1.1; letter-spacing: -0.04em; color: var(--ink); }
          .country-stat-label { color: #7f8b99; font-size: 12px; line-height: 1.35; }
          .country-detail-map-section, .country-city-list, .country-featured-courses { display: grid; gap: 14px; }
          .country-section-title { margin: 0; font-size: 18px; line-height: 1.35; letter-spacing: -0.03em; }
          .country-detail-map { position: relative; overflow: hidden; min-height: 280px; border-radius: 28px; background: linear-gradient(180deg, rgba(11, 13, 16, 1) 0%, rgba(16, 19, 24, 1) 100%); border: 1px solid rgba(255,255,255,0.05); box-shadow: inset 0 1px 0 rgba(255,255,255,0.03), 0 18px 34px rgba(0,0,0,0.22); }
          .country-detail-map-empty { display: flex; align-items: center; justify-content: center; color: #7f8b99; font-size: 14px; }
          .country-detail-map-svg { width: 100%; height: 280px; display: block; }
          .country-detail-map-surface { fill: #0f1217; }
          .country-detail-map-shape { fill: rgba(101, 112, 127, 0.36); stroke: rgba(255,255,255,0.08); stroke-width: 1.1; }
          .country-detail-map-shape-line { fill: none; stroke: rgba(101, 112, 127, 0.42); stroke-width: 6; stroke-linecap: round; stroke-linejoin: round; }
          .country-detail-map-line { stroke: rgba(111, 173, 255, 0.38); stroke-width: 2; stroke-linecap: round; }
          .country-detail-map-marker { fill: #f8fafc; stroke: #4f8dff; stroke-width: 2; }
          .country-detail-map-label { fill: #dbe4ef; font-size: 5.4px; font-weight: 700; letter-spacing: -0.02em; }
          .country-city-list-grid { display: grid; gap: 12px; }
          .country-city-item { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 12px; align-items: center; padding: 16px; border-radius: 22px; background: linear-gradient(180deg, rgba(27, 32, 39, 1) 0%, rgba(20, 24, 30, 1) 100%); border: 1px solid rgba(255,255,255,0.05); box-shadow: inset 0 1px 0 rgba(255,255,255,0.02); }
          .country-city-link { text-decoration: none; }
          .country-city-copy { display: grid; gap: 4px; min-width: 0; }
          .country-city-name-ko { font-size: 18px; line-height: 1.3; letter-spacing: -0.03em; color: var(--ink); }
          .country-city-name-en { color: #7f8b99; font-size: 13px; line-height: 1.35; }
          .country-city-meta { display: grid; gap: 4px; justify-items: end; text-align: right; }
          .country-city-course-count { color: var(--ink); font-size: 14px; line-height: 1.35; }
          .country-course-list { display: grid; gap: 12px; padding: 0; margin: 0; list-style: none; }
          .country-course-item { display: grid; gap: 8px; padding: 16px; border-radius: 22px; background: linear-gradient(180deg, rgba(27, 32, 39, 1) 0%, rgba(20, 24, 30, 1) 100%); border: 1px solid rgba(255,255,255,0.05); box-shadow: inset 0 1px 0 rgba(255,255,255,0.02); }
          .country-city-screen { display: grid; gap: 18px; }
          .country-city-hero { display: grid; gap: 14px; padding: 18px; border-radius: 26px; background: linear-gradient(180deg, rgba(31, 37, 46, 0.94) 0%, rgba(18, 22, 28, 1) 100%); border: 1px solid rgba(255,255,255,0.05); box-shadow: inset 0 1px 0 rgba(255,255,255,0.03), 0 16px 34px rgba(0,0,0,0.24); }
          .country-city-hero-copy { display: grid; gap: 6px; }
          .country-city-youtuber-stack { display: inline-flex; align-items: center; gap: 8px; }
          .country-course-head { display: grid; grid-template-columns: 44px minmax(0, 1fr); gap: 12px; align-items: start; }
          .country-course-avatar { width: 44px; height: 44px; border-radius: 999px; object-fit: cover; border: 2px solid #14181d; box-shadow: 0 10px 24px rgba(0,0,0,0.22); }
          .country-course-copy { display: grid; gap: 8px; min-width: 0; }
          .country-course-link { text-decoration: none; }
          .country-course-title { font-size: 17px; line-height: 1.35; letter-spacing: -0.03em; color: var(--ink); }
          .country-course-meta { display: flex; flex-wrap: wrap; gap: 8px; color: #7f8b99; font-size: 12px; line-height: 1.35; }
          .country-course-description { margin: 0; font-size: 13px; line-height: 1.5; color: #aab4c1; }
          .country-course-tag-list { display: flex; flex-wrap: wrap; gap: 8px; }
          .country-course-tag { display: inline-flex; align-items: center; min-height: 28px; padding: 0 10px; border-radius: 999px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.08); color: #d7e0eb; font-size: 12px; font-weight: 600; line-height: 1; letter-spacing: -0.01em; }
          .country-course-place-list { display: grid; gap: 6px; margin: 0; padding: 0; list-style: none; }
          .country-course-place-item { color: #cfd8e3; font-size: 12px; line-height: 1.45; }
          ul, ol { padding-left: 18px; }
          @media (max-width: 420px) { .content { padding: 16px 16px 104px; } .home-menu-item { grid-template-columns: 60px minmax(0, 1fr) 18px; min-height: 82px; padding: 11px 14px; } .home-menu-visual { width: 60px; height: 60px; } .home-menu-image { width: 54px; height: 54px; } .home-menu-visual-frame { inset: 6px; } .country-list-item { grid-template-columns: 54px minmax(0, 1fr) auto; min-height: 78px; gap: 12px; padding: 11px 12px; } .country-flag-badge { width: 54px; height: 54px; } .country-flag-badge-image { width: 42px; height: 42px; } .country-youtuber-stack { padding-left: 24px; } .country-youtuber-stack-item { width: 34px; height: 34px; margin-left: -24px; } .youtuber-list-item { grid-template-columns: 54px minmax(0, 1fr) auto; min-height: 78px; gap: 12px; padding: 11px 12px; } .youtuber-list-avatar { width: 54px; height: 54px; } .youtuber-country-stack { padding-left: 24px; } .youtuber-country-stack-item { width: 31px; height: 31px; margin-left: -22px; } .youtuber-detail-hero { grid-template-columns: 60px minmax(0, 1fr); padding: 16px; border-radius: 24px; } .youtuber-detail-avatar { width: 60px; height: 60px; } .youtuber-detail-name { font-size: 24px; } .youtuber-course-row { grid-template-columns: 42px minmax(0, 1fr); gap: 12px; } .youtuber-course-flag-badge { width: 42px; height: 42px; border-radius: 14px; } .youtuber-course-flag-image { width: 24px; height: 24px; } .country-detail-hero { grid-template-columns: 56px minmax(0, 1fr); padding: 16px; border-radius: 24px; } .country-detail-flag-badge { width: 56px; height: 56px; } .country-detail-flag-image { width: 44px; height: 44px; } .country-detail-name-ko { font-size: 28px; } .country-detail-youtuber-avatar { width: 40px; height: 40px; } .country-detail-youtuber-stack { gap: 6px; } .country-detail-stats { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; } .country-stat-card { padding: 12px 10px; border-radius: 18px; } .country-detail-map, .country-detail-map-svg { min-height: 244px; height: 244px; } .country-city-item { grid-template-columns: 1fr; justify-items: start; } .country-city-meta { justify-items: start; text-align: left; } .country-course-head { grid-template-columns: 40px minmax(0, 1fr); gap: 10px; } .country-course-avatar { width: 40px; height: 40px; } }
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
    title = '吏???덈툕';
    activeTab = 'countries';
    content = React.createElement(MapHubScreen, {
      activeCourseId: searchParams.get('course') ?? undefined,
      countryId: searchParams.get('country') ?? undefined,
      cityId: searchParams.get('city') ?? undefined,
    });
  } else if (pathname === '/countries') {
    title = '援?? ?좏깮';
    activeTab = 'countries';
    content = React.createElement(CountryListScreen, {
      query: searchParams.get('q') ?? '',
    });
  } else if (pathname === '/popular-countries') {
    title = '실시간 인기 여행지';
    activeTab = 'countries';
    content = React.createElement(PopularCountryListScreen);
  } else if (pathname === '/popular-courses') {
    title = '실시간 인기 코스';
    activeTab = 'countries';
    content = React.createElement(PopularCourseListScreen);
  } else if (/^\/countries\/[^/]+\/cities\/[^/]+$/.test(pathname)) {
    const [, , countryId, , cityId] = pathname.split('/');
    title = '?꾩떆 肄붿뒪';
    activeTab = 'countries';
    content = React.createElement(CityCourseListScreen, {
      countryId,
      cityId,
      courseHrefBuilder: (course) => `/courses/${course.id}`,
    });
  } else if (pathname.startsWith('/countries/')) {
    title = '援?? ?곸꽭';
    activeTab = 'countries';
    content = React.createElement(CountryDetailScreen, {
      countryId: pathname.replace('/countries/', ''),
      courseHrefBuilder: (course) => `/courses/${course.id}`,
      cityHrefBuilder: (city) => `${pathname}/cities/${city.id}`,
    });
  } else if (pathname.startsWith('/courses/')) {
    title = '肄붿뒪 ?곸꽭';
    activeTab = 'countries';
    content = React.createElement(CourseDetailScreen, {
      courseId: pathname.replace('/courses/', ''),
      placeHrefBuilder: (place) => `/places/${place.id}`,
    });
  } else if (pathname.startsWith('/places/')) {
    title = '?μ냼 ?곸꽭';
    activeTab = 'countries';
    content = React.createElement(PlaceDetailScreen, {
      placeId: pathname.replace('/places/', ''),
    });
  } else if (pathname === '/youtubers') {
    title = '?좏뒠踰??좏깮';
    activeTab = 'youtubers';
    content = React.createElement(YouTuberListScreen, {
      query: searchParams.get('q') ?? '',
      hrefBuilder: (youtuber) => `/youtubers/${youtuber.id}`,
    });
  } else if (pathname.startsWith('/youtubers/')) {
    title = '?좏뒠踰??곸꽭';
    activeTab = 'youtubers';
    content = React.createElement(YouTuberDetailScreen, {
      youtuberId: pathname.replace('/youtubers/', ''),
      courseHrefBuilder: (course) => `/courses/${course.id}`,
    });
  } else if (pathname === '/more') {
    title = '더보기';
    activeTab = 'more';
    content = React.createElement(MoreScreen);
  } else if (pathname === '/my') {
    title = '留덉씠';
    activeTab = 'more';
    content = React.createElement(MyScreen);
  }

  const html = renderToStaticMarkup(React.createElement(Layout, { title, activeTab }, content));
  const moreTabClass = activeTab === 'more' ? 'bottom-nav-item active' : 'bottom-nav-item';
  const moreTabMarkup = `<a href="/more" class="${moreTabClass}"><span class="bottom-nav-icon" aria-hidden="true">&#9776;</span><span>더보기</span></a>`;
  const withMoreTab = html.replace(/<a href="\/my" class="bottom-nav-item(?: active)?">[\s\S]*?<\/a>/, moreTabMarkup);

  return `<!doctype html><!-- 마이 -->${withMoreTab}`;
}




