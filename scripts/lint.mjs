import { readFileSync } from 'node:fs';

const content = readFileSync(
  new URL('../apps/in-toss-app/src/features/home/HomeScreen.js', import.meta.url),
  'utf8',
);

const requiredLabels = [
  '마이트래블',
  '국가 탐색',
  '유튜버 탐색',
  '인기 나라 보기',
  '인기 코스 보기',
];

if (!requiredLabels.every((label) => content.includes(label))) {
  throw new Error('home screen entry labels are missing');
}
