import { places, placeSnapshots } from '../seed/seed-data.ts';

export function getPlace(placeId: string) {
  const place = places.find((entry) => entry.id === placeId);
  if (place == null) {
    return null;
  }

  const latestSnapshot = placeSnapshots
    .filter((snapshot) => snapshot.placeId === placeId)
    .sort((left, right) => right.capturedAt.localeCompare(left.capturedAt))[0];

  return {
    ...place,
    latestSnapshot: latestSnapshot ?? null,
  };
}
