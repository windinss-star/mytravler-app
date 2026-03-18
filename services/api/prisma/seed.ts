import {
  cities,
  countries,
  courses,
  curatedYouTubers,
  places,
  placeSnapshots,
} from '../src/seed/seed-data.ts';

console.log(
  JSON.stringify(
    {
      curatedYouTubers,
      countries,
      cities,
      places,
      placeSnapshots,
      courses,
    },
    null,
    2,
  ),
);
