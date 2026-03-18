import assert from 'node:assert/strict';

import { countries, courses, curatedYouTubers, placeSnapshots, places } from './seed-data.ts';

function runTest(name: string, fn: () => void) {
  try {
    fn();
    console.log(`PASS ${name}`);
  } catch (error) {
    console.error(`FAIL ${name}`);
    throw error;
  }
}

runTest('contains exactly the 6 launch youtubers', () => {
  assert.equal(curatedYouTubers.length, 6);
});

runTest('includes at least 2 countries and seeded places', () => {
  assert.ok(countries.length >= 2);
  assert.ok(places.length >= 6);
  assert.ok(placeSnapshots.length >= places.length);
});

runTest('provides at least one complete course for every launch youtuber', () => {
  const youtuberIds = new Set(curatedYouTubers.map((youtuber) => youtuber.id));
  const coveredIds = new Set(courses.map((course) => course.youtuberId));

  assert.deepEqual([...coveredIds].sort(), [...youtuberIds].sort());
  assert.ok(courses.every((course) => course.placeItems.length > 0));
});
