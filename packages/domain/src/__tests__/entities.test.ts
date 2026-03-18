import assert from 'node:assert/strict';

import { VerificationLevelSchema } from '../confidence.ts';
import { PlaceCategorySchema } from '../place-types.ts';
import { PlaceSchema, VerificationEvidenceSchema } from '../entities.ts';

function runTest(name: string, fn: () => void) {
  try {
    fn();
    console.log(`PASS ${name}`);
  } catch (error) {
    console.error(`FAIL ${name}`);
    throw error;
  }
}

runTest('accepts only restaurant, attraction, and lodging place categories', () => {
  assert.doesNotThrow(() => PlaceCategorySchema.parse('restaurant'));
  assert.doesNotThrow(() => PlaceCategorySchema.parse('attraction'));
  assert.doesNotThrow(() => PlaceCategorySchema.parse('lodging'));
  assert.throws(() => PlaceCategorySchema.parse('food'));
});

runTest('accepts only high, medium, and low verification levels', () => {
  assert.equal(VerificationLevelSchema.parse('high'), 'high');
  assert.throws(() => VerificationLevelSchema.parse('confirmed'));
});

runTest('parses a canonical place with source references', () => {
  const place = PlaceSchema.parse({
    id: 'place-1',
    cityId: 'city-1',
    countryId: 'country-1',
    name: 'Goraebul Cafe',
    category: 'restaurant',
    shortDescription: 'Ocean-view brunch stop',
    location: {
      lat: 37.123,
      lng: 129.456,
    },
    tags: ['brunch', 'sea-view'],
    sourceReferences: [
      {
        id: 'source-1',
        type: 'youtube_caption',
        label: 'Episode 12 caption',
        verificationLevel: 'high',
      },
    ],
  });

  assert.equal(place.category, 'restaurant');
  assert.equal(place.sourceReferences[0]?.verificationLevel, 'high');
});

runTest('requires evidence records to keep raw text and collection timing', () => {
  const evidence = VerificationEvidenceSchema.parse({
    id: 'evidence-1',
    sourceType: 'youtube_caption',
    sourceLabel: 'Episode 12 caption',
    verificationLevel: 'high',
    collectedAt: '2026-03-18T00:00:00.000Z',
    rawText: 'We arrived at Goraebul Cafe right after sunrise.',
    relatedEntityType: 'place',
    relatedEntityId: 'place-1',
  });

  assert.equal(evidence.relatedEntityType, 'place');
  assert.throws(() =>
    VerificationEvidenceSchema.parse({
      id: 'evidence-2',
      sourceType: 'youtube_comment',
      sourceLabel: 'Comment',
      verificationLevel: 'medium',
      relatedEntityType: 'course',
      relatedEntityId: 'course-1',
    }),
  );
});
