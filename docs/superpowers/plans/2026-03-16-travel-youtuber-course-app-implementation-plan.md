# Travel Youtuber Course App Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the first Apps in Toss release of a curated travel-course app that lets users explore selected Korean travel YouTubers' country, city, course, and place data with Toss login, map-based course views, and lightweight personalization.

**Architecture:** Use a monorepo with a React Native Apps in Toss client, a small API service for canonical content and personalization, and a separate ingestion worker for YouTube/blog/review collection and verification. Keep domain models shared across app, API, and ingestion so route, place, and verification rules stay consistent as the content set grows from 6 to 20+ YouTubers.

**Tech Stack:** Apps in Toss React Native (Granite), `@apps-in-toss/framework`, `@toss-design-system/react-native`, TypeScript, TanStack Query, Node.js API, PostgreSQL, background ingestion workers, Playwright/API tests, Vitest/Jest as appropriate

---

## Scope Note

This spec spans multiple subsystems:

- Apps in Toss client
- API and database
- Content ingestion and verification pipeline
- Personalization and notifications

These should still be executed as one coordinated program, but delivered in phases so each phase ends in working, testable software. The first usable milestone should be an authenticated app shell backed by seeded curated content, before any automation-heavy ingestion work starts.

## Proposed Repository Structure

### Product Apps

- `apps/in-toss-app/`
  - Apps in Toss React Native client
- `services/api/`
  - Canonical content API, auth exchange, personalization endpoints
- `services/ingestion/`
  - Data collection, normalization, verification workers

### Shared Packages

- `packages/domain/`
  - Shared schemas, enums, confidence rules, entity mappers
- `packages/ui/`
  - Shared UI helpers, card view models, icon mappings
- `packages/config/`
  - Shared TypeScript and lint config

### Docs and Ops

- `docs/superpowers/specs/`
  - Approved product specs
- `docs/superpowers/plans/`
  - Execution plans
- `infra/`
  - Deployment and environment templates
- `scripts/`
  - Seed, maintenance, and local bootstrap scripts

## Delivery Milestones

1. Foundation and authenticated app shell
2. Canonical content model and seeded browsing experience
3. Map, course, and place-detail experience
4. Personalization, favorites, and notification preferences
5. Automated ingestion and verification pipeline
6. Apps in Toss hardening, QA, and release readiness

## Chunk 1: Foundation and Monorepo Bootstrap

### Task 1: Initialize the workspace as a multi-app TypeScript repository

**Files:**
- Create: `package.json`
- Create: `pnpm-workspace.yaml`
- Create: `tsconfig.base.json`
- Create: `.editorconfig`
- Create: `.nvmrc`
- Create: `packages/config/package.json`
- Create: `packages/config/tsconfig/node.json`
- Create: `packages/config/eslint/base.cjs`

- [ ] **Step 1: Write the failing workspace validation check**

```js
// scripts/check-workspace.mjs
import { readFileSync } from 'node:fs';
const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url)));
if (!pkg.workspaces && pkg.packageManager == null) {
  throw new Error('workspace metadata missing');
}
```

- [ ] **Step 2: Run validation to verify it fails**

Run: `node scripts/check-workspace.mjs`
Expected: FAIL because `package.json` does not exist yet

- [ ] **Step 3: Write the minimal workspace configuration**

Add:

- root `package.json` with workspace scripts
- `pnpm-workspace.yaml` for `apps/*`, `services/*`, `packages/*`
- `tsconfig.base.json` for shared strict TypeScript settings

- [ ] **Step 4: Run validation to verify it passes**

Run: `node scripts/check-workspace.mjs`
Expected: PASS with no output

- [ ] **Step 5: Commit**

```bash
git add package.json pnpm-workspace.yaml tsconfig.base.json .editorconfig .nvmrc packages/config scripts/check-workspace.mjs
git commit -m "chore: bootstrap monorepo workspace"
```

### Task 2: Scaffold the Apps in Toss React Native client

**Files:**
- Create: `apps/in-toss-app/package.json`
- Create: `apps/in-toss-app/bedrock.config.ts`
- Create: `apps/in-toss-app/src/app/_layout.tsx`
- Create: `apps/in-toss-app/src/app/index.tsx`
- Create: `apps/in-toss-app/src/features/home/HomeScreen.tsx`
- Create: `apps/in-toss-app/src/test/smoke.test.tsx`

- [ ] **Step 1: Write the failing app smoke test**

```tsx
import { render, screen } from '@testing-library/react-native';
import { HomeScreen } from '../features/home/HomeScreen';

it('renders search, country, and youtuber entry points', () => {
  render(<HomeScreen />);
  expect(screen.getByText('검색')).toBeTruthy();
  expect(screen.getByText('국가 선택')).toBeTruthy();
  expect(screen.getByText('유튜버 선택')).toBeTruthy();
});
```

- [ ] **Step 2: Run the smoke test to verify it fails**

Run: `pnpm --filter in-toss-app test smoke.test.tsx`
Expected: FAIL because screen and component do not exist yet

- [ ] **Step 3: Implement the minimal app shell**

Add a Granite-based app with:

- required brand configuration in `bedrock.config.ts`
- root app layout
- a simple `HomeScreen`
- TDS-based buttons or cards for the three entry points

- [ ] **Step 4: Run the smoke test to verify it passes**

Run: `pnpm --filter in-toss-app test smoke.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add apps/in-toss-app
git commit -m "feat: scaffold apps in toss client shell"
```

### Task 3: Add lint, format, and test commands that block regressions early

**Files:**
- Modify: `package.json`
- Create: `eslint.config.js`
- Create: `vitest.workspace.ts`
- Create: `prettier.config.cjs`
- Create: `scripts/verify-ci.mjs`

- [ ] **Step 1: Write the failing CI guard**

```js
// scripts/verify-ci.mjs
process.exitCode = 1;
throw new Error('wire verify script after tooling is configured');
```

- [ ] **Step 2: Run CI guard to verify it fails**

Run: `node scripts/verify-ci.mjs`
Expected: FAIL with configuration error

- [ ] **Step 3: Wire lint, typecheck, and test scripts**

Root scripts should include:

- `lint`
- `typecheck`
- `test`
- `verify`

`verify` should run the three commands in sequence.

- [ ] **Step 4: Run verification to verify it passes**

Run: `pnpm verify`
Expected: PASS for the current scaffold

- [ ] **Step 5: Commit**

```bash
git add package.json eslint.config.js vitest.workspace.ts prettier.config.cjs scripts/verify-ci.mjs
git commit -m "chore: add repo verification tooling"
```

## Chunk 2: Shared Domain Model and Seeded Content

### Task 4: Create canonical domain schemas for YouTuber, geography, course, and place

**Files:**
- Create: `packages/domain/package.json`
- Create: `packages/domain/src/index.ts`
- Create: `packages/domain/src/entities.ts`
- Create: `packages/domain/src/place-types.ts`
- Create: `packages/domain/src/confidence.ts`
- Create: `packages/domain/src/__tests__/entities.test.ts`

- [ ] **Step 1: Write the failing domain test**

```ts
import { PlaceTypeSchema } from '../place-types';

it('accepts only restaurant, attraction, and lodging place types', () => {
  expect(() => PlaceTypeSchema.parse('restaurant')).not.toThrow();
  expect(() => PlaceTypeSchema.parse('cafe')).toThrow();
});
```

- [ ] **Step 2: Run the domain test to verify it fails**

Run: `pnpm --filter @travel/domain test entities.test.ts`
Expected: FAIL because schemas are missing

- [ ] **Step 3: Implement shared schemas and enums**

Include:

- `YouTuber`
- `Country`
- `City`
- `Course`
- `Place`
- `VerificationEvidence`
- `ConfidenceLevel`

Use a schema library such as Zod so API, ingestion, and app can share runtime validation.

- [ ] **Step 4: Run the domain test to verify it passes**

Run: `pnpm --filter @travel/domain test entities.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add packages/domain
git commit -m "feat: add shared travel domain schemas"
```

### Task 5: Seed the first 6 curated YouTubers and example course content

**Files:**
- Create: `services/api/prisma/schema.prisma`
- Create: `services/api/prisma/seed.ts`
- Create: `services/api/src/seed/seed-data.ts`
- Create: `services/api/src/seed/seed-data.test.ts`

- [ ] **Step 1: Write the failing seed-data test**

```ts
import { curatedYouTubers } from './seed-data';

it('contains exactly the 6 launch youtubers', () => {
  expect(curatedYouTubers).toHaveLength(6);
});
```

- [ ] **Step 2: Run the seed-data test to verify it fails**

Run: `pnpm --filter api test src/seed/seed-data.test.ts`
Expected: FAIL because seed files are missing

- [ ] **Step 3: Implement canonical seed content**

Seed:

- 6 curated YouTubers
- at least 2 countries
- at least 2 cities per seeded country where feasible
- at least 1 complete course path with places for each seeded YouTuber

Keep seed media aligned with safe image policy.

- [ ] **Step 4: Run the seed-data test to verify it passes**

Run: `pnpm --filter api test src/seed/seed-data.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add services/api/prisma services/api/src/seed
git commit -m "feat: seed launch youtubers and sample routes"
```

### Task 6: Expose read-only content APIs for launch browsing

**Files:**
- Create: `services/api/src/server.ts`
- Create: `services/api/src/routes/countries.ts`
- Create: `services/api/src/routes/youtubers.ts`
- Create: `services/api/src/routes/courses.ts`
- Create: `services/api/src/routes/places.ts`
- Create: `services/api/src/routes/search.ts`
- Create: `services/api/src/routes/__tests__/search.test.ts`

- [ ] **Step 1: Write the failing search API test**

```ts
it('returns country, city, youtuber, and place hits in one response', async () => {
  const response = await request(app).get('/search?q=일본');
  expect(response.status).toBe(200);
  expect(response.body.results).toEqual(
    expect.arrayContaining([expect.objectContaining({ entityType: 'country' })]),
  );
});
```

- [ ] **Step 2: Run the API test to verify it fails**

Run: `pnpm --filter api test src/routes/__tests__/search.test.ts`
Expected: FAIL because routes do not exist yet

- [ ] **Step 3: Implement minimal read APIs**

Required launch endpoints:

- `GET /countries`
- `GET /countries/:countryId`
- `GET /countries/:countryId/cities/:cityId/courses`
- `GET /youtubers`
- `GET /youtubers/:id`
- `GET /courses/:id`
- `GET /places/:id`
- `GET /search?q=...`

- [ ] **Step 4: Run the API test to verify it passes**

Run: `pnpm --filter api test src/routes/__tests__/search.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add services/api/src
git commit -m "feat: add launch content APIs"
```

## Chunk 3: Authentication and App Navigation

### Task 7: Implement Toss login exchange flow

**Files:**
- Create: `services/api/src/routes/auth.ts`
- Create: `services/api/src/lib/toss-login.ts`
- Create: `apps/in-toss-app/src/features/auth/useAppLogin.ts`
- Create: `apps/in-toss-app/src/features/auth/AuthGate.tsx`
- Create: `apps/in-toss-app/src/features/auth/__tests__/auth-gate.test.tsx`

- [ ] **Step 1: Write the failing auth-gate test**

```tsx
it('blocks app browsing until toss auth session is available', () => {
  render(<AuthGate><Text>ok</Text></AuthGate>);
  expect(screen.getByText('로그인 중')).toBeTruthy();
});
```

- [ ] **Step 2: Run the auth test to verify it fails**

Run: `pnpm --filter in-toss-app test auth-gate.test.tsx`
Expected: FAIL because auth gate is missing

- [ ] **Step 3: Implement minimal auth flow**

Implement:

- client-side `appLogin` invocation
- authorization code exchange endpoint on API
- local session bootstrap for authenticated app usage
- loading and error states for first-auth vs returning-auth scenarios

- [ ] **Step 4: Run the auth test to verify it passes**

Run: `pnpm --filter in-toss-app test auth-gate.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add services/api/src/routes/auth.ts services/api/src/lib/toss-login.ts apps/in-toss-app/src/features/auth
git commit -m "feat: add apps in toss login flow"
```

### Task 8: Add the launch navigation skeleton with Home, Country, YouTuber, and My

**Files:**
- Create: `apps/in-toss-app/src/navigation/AppTabs.tsx`
- Create: `apps/in-toss-app/src/features/countries/CountryListScreen.tsx`
- Create: `apps/in-toss-app/src/features/youtubers/YouTuberListScreen.tsx`
- Create: `apps/in-toss-app/src/features/my/MyScreen.tsx`
- Create: `apps/in-toss-app/src/navigation/__tests__/tabs.test.tsx`

- [ ] **Step 1: Write the failing tabs test**

```tsx
it('renders the four launch tabs', () => {
  render(<AppTabs />);
  expect(screen.getByText('홈')).toBeTruthy();
  expect(screen.getByText('국가')).toBeTruthy();
  expect(screen.getByText('유튜버')).toBeTruthy();
  expect(screen.getByText('마이')).toBeTruthy();
});
```

- [ ] **Step 2: Run the tabs test to verify it fails**

Run: `pnpm --filter in-toss-app test tabs.test.tsx`
Expected: FAIL because navigation shell is missing

- [ ] **Step 3: Implement the navigation skeleton**

Keep screens shallow at first. Each screen only needs:

- top-level title
- loading state
- empty state
- API connection hook placeholder

- [ ] **Step 4: Run the tabs test to verify it passes**

Run: `pnpm --filter in-toss-app test tabs.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add apps/in-toss-app/src/navigation apps/in-toss-app/src/features
git commit -m "feat: add launch app navigation"
```

## Chunk 4: Browsing Experience and Map Flow

### Task 9: Build the Country browsing path from list to course cards

**Files:**
- Create: `apps/in-toss-app/src/features/countries/api.ts`
- Create: `apps/in-toss-app/src/features/countries/CountryDetailScreen.tsx`
- Create: `apps/in-toss-app/src/features/countries/components/CountryYouTuberFilter.tsx`
- Create: `apps/in-toss-app/src/features/countries/components/FavoriteCountriesRail.tsx`
- Create: `apps/in-toss-app/src/features/countries/components/CityList.tsx`
- Create: `apps/in-toss-app/src/features/countries/components/CourseCardList.tsx`
- Create: `apps/in-toss-app/src/features/countries/__tests__/country-detail.test.tsx`

- [ ] **Step 1: Write the failing country-detail test**

```tsx
it('shows youtuber filters, favorite countries, and city-driven course cards', async () => {
  render(<CountryDetailScreen countryId="jp" />);
  expect(await screen.findByText('관심 국가')).toBeTruthy();
  expect(await screen.findByText('도시')).toBeTruthy();
});
```

- [ ] **Step 2: Run the country-detail test to verify it fails**

Run: `pnpm --filter in-toss-app test country-detail.test.tsx`
Expected: FAIL because the detail screen is missing

- [ ] **Step 3: Implement the Country flow**

Support:

- Korean alphabetical list on the first screen
- top YouTuber icon row on country detail
- favorite countries block below the icon row
- city list
- representative course cards after filter selection

- [ ] **Step 4: Run the country-detail test to verify it passes**

Run: `pnpm --filter in-toss-app test country-detail.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add apps/in-toss-app/src/features/countries
git commit -m "feat: add country browsing experience"
```

### Task 10: Build the YouTuber browsing path with favorites and subscriber sorting

**Files:**
- Create: `apps/in-toss-app/src/features/youtubers/api.ts`
- Create: `apps/in-toss-app/src/features/youtubers/components/FavoriteYouTubersRail.tsx`
- Create: `apps/in-toss-app/src/features/youtubers/components/YouTuberSortControl.tsx`
- Create: `apps/in-toss-app/src/features/youtubers/components/YouTuberList.tsx`
- Create: `apps/in-toss-app/src/features/youtubers/__tests__/youtuber-list.test.tsx`

- [ ] **Step 1: Write the failing youtuber-list test**

```tsx
it('supports sorting by subscriber count', async () => {
  render(<YouTuberListScreen />);
  expect(await screen.findByText('구독자 수 순')).toBeTruthy();
});
```

- [ ] **Step 2: Run the youtuber-list test to verify it fails**

Run: `pnpm --filter in-toss-app test youtuber-list.test.tsx`
Expected: FAIL because sort controls are missing

- [ ] **Step 3: Implement the YouTuber flow**

Include:

- favorite YouTuber rail at top
- full list below
- sort controls including subscriber count
- link into YouTuber-specific course lists

- [ ] **Step 4: Run the youtuber-list test to verify it passes**

Run: `pnpm --filter in-toss-app test youtuber-list.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add apps/in-toss-app/src/features/youtubers
git commit -m "feat: add youtuber browsing experience"
```

### Task 11: Implement search and integrated filters

**Files:**
- Create: `apps/in-toss-app/src/features/search/SearchScreen.tsx`
- Create: `apps/in-toss-app/src/features/search/api.ts`
- Create: `apps/in-toss-app/src/features/search/components/SearchFiltersSheet.tsx`
- Create: `apps/in-toss-app/src/features/search/components/SearchResultsList.tsx`
- Create: `apps/in-toss-app/src/features/search/__tests__/search-screen.test.tsx`

- [ ] **Step 1: Write the failing search-screen test**

```tsx
it('returns mixed entity search results', async () => {
  render(<SearchScreen />);
  fireEvent.changeText(screen.getByPlaceholderText('국가, 도시, 유튜버, 장소 검색'), '일본');
  expect(await screen.findByText('국가')).toBeTruthy();
});
```

- [ ] **Step 2: Run the search test to verify it fails**

Run: `pnpm --filter in-toss-app test search-screen.test.tsx`
Expected: FAIL because the search UI is missing

- [ ] **Step 3: Implement search with detailed filters**

Support:

- unified search input
- entity grouping in results
- filter sheet for combined exploration

- [ ] **Step 4: Run the search test to verify it passes**

Run: `pnpm --filter in-toss-app test search-screen.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add apps/in-toss-app/src/features/search
git commit -m "feat: add unified search and filters"
```

### Task 12: Build course map, day summary, and place drill-down

**Files:**
- Create: `apps/in-toss-app/src/features/courses/CourseMapScreen.tsx`
- Create: `apps/in-toss-app/src/features/courses/CourseDetailScreen.tsx`
- Create: `apps/in-toss-app/src/features/courses/components/RouteMap.tsx`
- Create: `apps/in-toss-app/src/features/courses/components/CourseSummary.tsx`
- Create: `apps/in-toss-app/src/features/places/PlaceDetailScreen.tsx`
- Create: `apps/in-toss-app/src/features/places/components/PlaceSummaryKeywords.tsx`
- Create: `apps/in-toss-app/src/features/places/components/PlaceMetaByType.tsx`
- Create: `apps/in-toss-app/src/features/courses/__tests__/course-detail.test.tsx`

- [ ] **Step 1: Write the failing course-detail test**

```tsx
it('shows trip-day context, route summary, and place order', async () => {
  render(<CourseDetailScreen courseId="course-1" />);
  expect(await screen.findByText(/n일차|day/i)).toBeTruthy();
  expect(await screen.findByText(/방문 장소/)).toBeTruthy();
});
```

- [ ] **Step 2: Run the course test to verify it fails**

Run: `pnpm --filter in-toss-app test course-detail.test.tsx`
Expected: FAIL because course detail screens are missing

- [ ] **Step 3: Implement map and place drill-down**

Include:

- point-and-line route map
- course-level first view
- next-depth detail with trip-day context, visit order, and place list
- concise place summaries with max 5 keywords and max 3 lines
- type-specific place metadata for restaurant, attraction, and lodging

- [ ] **Step 4: Run the course test to verify it passes**

Run: `pnpm --filter in-toss-app test course-detail.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add apps/in-toss-app/src/features/courses apps/in-toss-app/src/features/places
git commit -m "feat: add course map and place detail flow"
```

## Chunk 5: Personalization, My, and Notification Preferences

### Task 13: Add favorite and recent-view persistence

**Files:**
- Create: `services/api/src/routes/preferences.ts`
- Create: `services/api/src/routes/history.ts`
- Create: `apps/in-toss-app/src/features/preferences/api.ts`
- Create: `apps/in-toss-app/src/features/preferences/useFavorites.ts`
- Create: `apps/in-toss-app/src/features/preferences/useRecentViews.ts`
- Create: `apps/in-toss-app/src/features/preferences/__tests__/favorites.test.ts`

- [ ] **Step 1: Write the failing favorites test**

```ts
it('stores favorite countries and favorite youtubers separately', async () => {
  const result = reducer(undefined, addFavoriteCountry('jp'));
  expect(result.favoriteCountryIds).toContain('jp');
});
```

- [ ] **Step 2: Run the favorites test to verify it fails**

Run: `pnpm --filter in-toss-app test favorites.test.ts`
Expected: FAIL because favorite state is missing

- [ ] **Step 3: Implement persistence layer**

Support:

- favorite countries
- favorite YouTubers
- recently viewed countries
- recently viewed courses

Use API-backed persistence, with local optimistic state where helpful.

- [ ] **Step 4: Run the favorites test to verify it passes**

Run: `pnpm --filter in-toss-app test favorites.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add services/api/src/routes/preferences.ts services/api/src/routes/history.ts apps/in-toss-app/src/features/preferences
git commit -m "feat: add favorites and recent view persistence"
```

### Task 14: Complete the My screen and notification preferences

**Files:**
- Modify: `apps/in-toss-app/src/features/my/MyScreen.tsx`
- Create: `apps/in-toss-app/src/features/my/components/NotificationSettingsCard.tsx`
- Create: `apps/in-toss-app/src/features/my/components/RecentViewsCard.tsx`
- Create: `apps/in-toss-app/src/features/my/components/PolicyLinksCard.tsx`
- Create: `apps/in-toss-app/src/features/my/__tests__/my-screen.test.tsx`

- [ ] **Step 1: Write the failing My screen test**

```tsx
it('shows recents, alerts, and policy links', async () => {
  render(<MyScreen />);
  expect(await screen.findByText('최근 본 코스')).toBeTruthy();
  expect(await screen.findByText('알림 설정')).toBeTruthy();
  expect(await screen.findByText('서비스 약관')).toBeTruthy();
});
```

- [ ] **Step 2: Run the My screen test to verify it fails**

Run: `pnpm --filter in-toss-app test my-screen.test.tsx`
Expected: FAIL because My details are incomplete

- [ ] **Step 3: Implement My details**

Support:

- recent countries/courses
- favorite YouTubers summary
- informational vs advertising notification preferences
- terms and policies

- [ ] **Step 4: Run the My screen test to verify it passes**

Run: `pnpm --filter in-toss-app test my-screen.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add apps/in-toss-app/src/features/my
git commit -m "feat: complete my screen and notification preferences"
```

## Chunk 6: Ingestion and Verification Pipeline

### Task 15: Implement raw-source ingestion contracts before external integrations

**Files:**
- Create: `services/ingestion/package.json`
- Create: `services/ingestion/src/contracts/raw-source.ts`
- Create: `services/ingestion/src/contracts/normalized-place.ts`
- Create: `services/ingestion/src/__tests__/contracts.test.ts`

- [ ] **Step 1: Write the failing contracts test**

```ts
it('requires source type, source id, and collectedAt for raw evidence', () => {
  expect(() => RawSourceSchema.parse({})).toThrow();
});
```

- [ ] **Step 2: Run the contracts test to verify it fails**

Run: `pnpm --filter ingestion test contracts.test.ts`
Expected: FAIL because contract schemas are missing

- [ ] **Step 3: Implement ingestion contracts**

Model:

- source kind
- source URL
- source timestamp
- extracted text
- place candidate
- evidence confidence

- [ ] **Step 4: Run the contracts test to verify it passes**

Run: `pnpm --filter ingestion test contracts.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add services/ingestion/src/contracts
git commit -m "feat: add ingestion source contracts"
```

### Task 16: Implement subtitle-first verification rules

**Files:**
- Create: `services/ingestion/src/verification/scoreEvidence.ts`
- Create: `services/ingestion/src/verification/selectCanonicalFacts.ts`
- Create: `services/ingestion/src/verification/__tests__/scoreEvidence.test.ts`

- [ ] **Step 1: Write the failing verification test**

```ts
it('scores subtitle evidence above comment and blog evidence', () => {
  const score = scoreEvidence({ sourceType: 'subtitle' });
  const commentScore = scoreEvidence({ sourceType: 'youtube-comment' });
  expect(score).toBeGreaterThan(commentScore);
});
```

- [ ] **Step 2: Run the verification test to verify it fails**

Run: `pnpm --filter ingestion test scoreEvidence.test.ts`
Expected: FAIL because verification rules are missing

- [ ] **Step 3: Implement scoring and acceptance rules**

Rules must include:

- subtitle/on-screen text is highest-confidence input
- lower-confidence sources require at least 3 aligned items
- time-sensitive facts can pass with caution metadata

- [ ] **Step 4: Run the verification test to verify it passes**

Run: `pnpm --filter ingestion test scoreEvidence.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add services/ingestion/src/verification
git commit -m "feat: add content verification rules"
```

### Task 17: Add provider adapters one source at a time

**Files:**
- Create: `services/ingestion/src/providers/youtube/subtitles.ts`
- Create: `services/ingestion/src/providers/youtube/comments.ts`
- Create: `services/ingestion/src/providers/naver/blogs.ts`
- Create: `services/ingestion/src/providers/google-maps/korean-reviews.ts`
- Create: `services/ingestion/src/providers/__tests__/youtube-subtitles.test.ts`

- [ ] **Step 1: Write the failing subtitles adapter test**

```ts
it('maps subtitle evidence into normalized raw source records', async () => {
  const rows = await fetchSubtitleEvidence(mockVideo);
  expect(rows[0]).toEqual(expect.objectContaining({ sourceType: 'subtitle' }));
});
```

- [ ] **Step 2: Run the provider test to verify it fails**

Run: `pnpm --filter ingestion test youtube-subtitles.test.ts`
Expected: FAIL because adapters are missing

- [ ] **Step 3: Implement adapters incrementally**

Sequence:

1. YouTube subtitles
2. YouTube comments
3. Naver blog evidence
4. Korean-review filter for Google Maps evidence

Do not start all providers at once. Get one provider fully tested before adding the next.

- [ ] **Step 4: Run the provider test to verify it passes**

Run: `pnpm --filter ingestion test youtube-subtitles.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add services/ingestion/src/providers
git commit -m "feat: add initial ingestion source adapters"
```

### Task 18: Persist normalized evidence and publish canonical course updates

**Files:**
- Create: `services/ingestion/src/jobs/syncYouTuberContent.ts`
- Create: `services/ingestion/src/jobs/publishCanonicalCourses.ts`
- Create: `services/ingestion/src/jobs/__tests__/publishCanonicalCourses.test.ts`
- Modify: `services/api/prisma/schema.prisma`

- [ ] **Step 1: Write the failing publish job test**

```ts
it('publishes only accepted canonical facts into course records', async () => {
  const result = await publishCanonicalCourses(mockEvidence);
  expect(result.publishedCourses).toBeGreaterThan(0);
});
```

- [ ] **Step 2: Run the publish-job test to verify it fails**

Run: `pnpm --filter ingestion test publishCanonicalCourses.test.ts`
Expected: FAIL because publish jobs are missing

- [ ] **Step 3: Implement durable publishing**

Persist:

- raw evidence
- normalized evidence
- accepted canonical facts
- generated course/place updates

Keep auditability so operators can inspect why a fact was accepted.

- [ ] **Step 4: Run the publish-job test to verify it passes**

Run: `pnpm --filter ingestion test publishCanonicalCourses.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add services/ingestion/src/jobs services/api/prisma/schema.prisma
git commit -m "feat: publish verified course updates"
```

## Chunk 7: Release Hardening and Apps in Toss Readiness

### Task 19: Add end-to-end launch-path coverage

**Files:**
- Create: `apps/in-toss-app/e2e/launch-flow.spec.ts`
- Create: `services/api/src/routes/__tests__/launch-contract.test.ts`
- Create: `scripts/run-e2e.ps1`

- [ ] **Step 1: Write the failing launch-flow spec**

```ts
test('user can log in, pick a country, open a course, and view place details', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('검색')).toBeVisible();
});
```

- [ ] **Step 2: Run the e2e spec to verify it fails**

Run: `pnpm --filter in-toss-app test:e2e launch-flow.spec.ts`
Expected: FAIL because e2e harness is not configured yet

- [ ] **Step 3: Implement launch-path e2e support**

Cover:

- auth bootstrap
- country path
- youtuber path
- course map
- place detail
- My preferences

- [ ] **Step 4: Run the e2e spec to verify it passes**

Run: `pnpm --filter in-toss-app test:e2e launch-flow.spec.ts`
Expected: PASS in local sandbox or mocked integration environment

- [ ] **Step 5: Commit**

```bash
git add apps/in-toss-app/e2e services/api/src/routes/__tests__/launch-contract.test.ts scripts/run-e2e.ps1
git commit -m "test: cover launch user flows"
```

### Task 20: Add release checklists and environment templates

**Files:**
- Create: `infra/env/.env.example`
- Create: `docs/release/apps-in-toss-launch-checklist.md`
- Create: `docs/release/content-operations-checklist.md`
- Create: `docs/release/qa-matrix.md`

- [ ] **Step 1: Write the failing checklist guard**

```md
<!-- docs/release/apps-in-toss-launch-checklist.md -->
- [ ] Missing
```

- [ ] **Step 2: Review the checklist to verify required sections are missing**

Run: manual review
Expected: checklist is incomplete

- [ ] **Step 3: Fill in launch docs**

Include:

- Toss brand config and package requirements
- login and scope setup
- mTLS and API connectivity
- content seeding and refresh procedure
- push consent and compliance checks
- QA sign-off matrix

- [ ] **Step 4: Re-review checklist to verify completeness**

Run: manual review against spec and official Apps in Toss docs
Expected: checklist is complete and actionable

- [ ] **Step 5: Commit**

```bash
git add infra/env/.env.example docs/release
git commit -m "docs: add release readiness checklists"
```

## Verification Strategy

Run these after each chunk and before final release claims:

- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm verify`

Before release candidate:

- `pnpm --filter api prisma migrate dev`
- `pnpm --filter api prisma db seed`
- `pnpm --filter in-toss-app test:e2e`

## External Dependency Notes

- Apps in Toss React Native mini apps run on Granite-based React Native. Official docs also note SDK support for React Native and WebView, and TDS React Native is required for non-game React Native mini apps.
- The bridge view brand configuration is required in modern Apps in Toss packages.
- `appLogin` is the supported Toss login entry point for Apps in Toss login integration.

Reference sources:

- https://developers-apps-in-toss.toss.im/prepare/mtls-certificate.html
- https://developers-apps-in-toss.toss.im/bedrock/reference/framework/%EC%BD%94%EC%96%B4/Bedrock.html
- https://developers-apps-in-toss.toss.im/tutorials/react-native.html
- https://developers-apps-in-toss.toss.im/design_tutorials/react-native.html
- https://developers-apps-in-toss.toss.im/bedrock/release-notes/2025-03-28.html
- https://developers-apps-in-toss.toss.im/login/develop.html

## Assumptions to Confirm During Execution

- Package manager will be `pnpm`
- API runtime will be Node.js + PostgreSQL
- Map rendering will use a provider that can support route points and lines inside Apps in Toss constraints
- Seed data for launch can be entered manually before automated ingestion is production-ready
- Official map/platform images are legally usable under the chosen provider agreement
