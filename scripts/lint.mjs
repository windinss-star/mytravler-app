import { readFileSync } from 'node:fs';

const content = readFileSync(new URL('../apps/in-toss-app/src/features/home/HomeScreen.js', import.meta.url), 'utf8');

if (!content.includes('검색') || !content.includes('국가 선택') || !content.includes('유튜버 선택')) {
  throw new Error('home screen entry labels are missing');
}
