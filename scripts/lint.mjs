import { readFileSync } from 'node:fs';

const content = readFileSync(
  new URL('../apps/in-toss-app/src/features/home/HomeScreen.js', import.meta.url),
  'utf8',
);

const requiredLabels = [
  '마이트래블',
  '국가 선택',
  '유튜버 선택',
  '실시간 인기 여행지',
  '실시간 인기 코스',
];

if (!requiredLabels.every((label) => content.includes(label))) {
  throw new Error('home screen entry labels are missing');
}
