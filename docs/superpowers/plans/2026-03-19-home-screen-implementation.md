# Home Screen Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 홈 화면을 TDS 톤의 밝고 단정한 구조로 재구성하고, 상단 서비스명/검색창/2x2 메뉴/하단 GNB를 반영한다.

**Architecture:** 프리뷰 공용 레이아웃의 상단 탭 구조를 하단 GNB로 내리고, 홈 화면은 전용 섹션 컴포넌트로 재구성한다. 홈 화면은 현재 프리뷰 구조를 유지하면서도 메뉴 카드 중심의 단순한 탐색 허브로 동작하게 만든다.

**Tech Stack:** React server rendering, preview HTML renderer, local CSS in `renderPage.js`, existing preview tests

---

## Chunk 1: 레이아웃 구조와 테스트 고정

### Task 1: 홈 레이아웃 기대값 테스트 추가

**Files:**
- Modify: `C:\Users\windi\Desktop\ai\apps\in-toss-app\src\preview\__tests__\preview-server.test.js`

- [ ] **Step 1: Write the failing test**

홈 프리뷰 응답에 아래 요소가 보이도록 기대값을 추가한다.
- `마이트래블`
- 검색 placeholder
- `국가 탐색`
- `유튜버 탐색`
- `인기 나라 보기`
- `인기 코스 보기`
- 하단 GNB의 `홈`, `국가`, `유튜버`, `마이`

- [ ] **Step 2: Run test to verify it fails**

Run: `npm.cmd --workspace apps/in-toss-app test`
Expected: 홈 관련 기대값 실패

### Task 2: 공용 프리뷰 레이아웃을 하단 GNB 구조로 전환

**Files:**
- Modify: `C:\Users\windi\Desktop\ai\apps\in-toss-app\src\preview\renderPage.js`

- [ ] **Step 1: Write minimal implementation**

공용 `Layout`에서 상단 탭을 제거하고 하단 GNB를 렌더링한다. 밝은 배경, 단정한 패널, 하단 고정 느낌의 네비게이션 스타일을 정의한다.

- [ ] **Step 2: Run test to verify it passes**

Run: `npm.cmd --workspace apps/in-toss-app test`
Expected: 새 홈 기대값 외 다른 프리뷰 테스트도 모두 통과

- [ ] **Step 3: Commit**

```bash
git add apps/in-toss-app/src/preview/renderPage.js apps/in-toss-app/src/preview/__tests__/preview-server.test.js
git commit -m "홈 레이아웃과 하단 GNB 구조 반영"
```

## Chunk 2: 홈 UI 구현

### Task 3: 홈 화면 본문 구조 교체

**Files:**
- Modify: `C:\Users\windi\Desktop\ai\apps\in-toss-app\src\features\home\HomeScreen.js`
- Modify: `C:\Users\windi\Desktop\ai\apps\in-toss-app\src\preview\renderPage.js`

- [ ] **Step 1: Write minimal implementation**

`HomeScreen`을 아래 구조로 교체한다.
- 상단 서비스명 `마이트래블`
- 검색창
- 2x2 정사각형 메뉴 카드
- 각 카드에 작은 3D 느낌의 이모지/오브젝트형 시각 요소와 텍스트 배치

`renderPage.js`의 홈 전용 CSS도 함께 정리한다.

- [ ] **Step 2: Run test to verify it passes**

Run: `npm.cmd --workspace apps/in-toss-app test`
Expected: 홈 관련 테스트 포함 전체 통과

### Task 4: 메뉴 카드 탐색 연결 정리

**Files:**
- Modify: `C:\Users\windi\Desktop\ai\apps\in-toss-app\src\features\home\HomeScreen.js`

- [ ] **Step 1: Write minimal implementation**

각 메뉴 카드의 링크를 아래와 같이 연결한다.
- 국가 탐색 → `/countries`
- 유튜버 탐색 → `/youtubers`
- 인기 나라 보기 → `/countries`
- 인기 코스 보기 → `/courses/course-pani-tokyo-1`

- [ ] **Step 2: Run test to verify it passes**

Run: `npm.cmd --workspace apps/in-toss-app test`
Expected: 링크와 화면 요소 기대값 통과

- [ ] **Step 3: Commit**

```bash
git add apps/in-toss-app/src/features/home/HomeScreen.js apps/in-toss-app/src/preview/renderPage.js
git commit -m "홈 탐색 카드 UI 적용"
```

## Chunk 3: 최종 검증

### Task 5: 회귀 검증

**Files:**
- Verify only

- [ ] **Step 1: Run app tests**

Run: `npm.cmd --workspace apps/in-toss-app test`
Expected: PASS

- [ ] **Step 2: Run full verification**

Run: `npm.cmd run verify`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "홈 화면 디자인 개편"
```
