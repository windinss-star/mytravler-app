import { z } from 'zod';

import { VerificationLevelSchema } from './confidence.ts';
import { PlaceCategorySchema } from './place-types.ts';

export const IdSchema = z.string().min(1);

export const SourceTypeSchema = z.enum([
  'youtube_caption',
  'youtube_description',
  'youtube_comment',
  'blog',
  'google_maps_review',
  'manual',
]);

export const GeoPointSchema = z.object({
  lat: z.number().finite(),
  lng: z.number().finite(),
});

export const SourceReferenceSchema = z.object({
  id: IdSchema,
  type: SourceTypeSchema,
  label: z.string().min(1),
  url: z.string().url().optional(),
  note: z.string().min(1).optional(),
  verificationLevel: VerificationLevelSchema,
});

export const YouTuberSchema = z.object({
  id: IdSchema,
  channelName: z.string().min(1),
  displayName: z.string().min(1),
  youtubeChannelUrl: z.string().url().optional(),
  profileImageUrl: z.string().url().optional(),
  description: z.string().min(1).optional(),
  isActive: z.boolean(),
  tags: z.array(z.string().min(1)),
});

export const CountrySchema = z.object({
  id: IdSchema,
  code: z.string().min(2).max(3),
  nameKo: z.string().min(1),
  nameEn: z.string().min(1),
  thumbnailUrl: z.string().url().optional(),
});

export const CitySchema = z.object({
  id: IdSchema,
  countryId: IdSchema,
  nameKo: z.string().min(1),
  nameEn: z.string().min(1),
  latitude: z.number().finite().optional(),
  longitude: z.number().finite().optional(),
  thumbnailUrl: z.string().url().optional(),
});

export const PlaceSchema = z.object({
  id: IdSchema,
  cityId: IdSchema,
  countryId: IdSchema,
  name: z.string().min(1),
  category: PlaceCategorySchema,
  shortDescription: z.string().min(1),
  address: z.string().min(1).optional(),
  location: GeoPointSchema,
  thumbnailUrl: z.string().url().optional(),
  tags: z.array(z.string().min(1)),
  sourceReferences: z.array(SourceReferenceSchema),
});

export const PlaceSnapshotSchema = z.object({
  id: IdSchema,
  placeId: IdSchema,
  capturedAt: z.string().datetime(),
  openingHours: z.string().min(1).optional(),
  menuItems: z.array(z.string().min(1)).optional(),
  averagePrice: z.number().nonnegative().optional(),
  currencyCode: z.string().length(3).optional(),
  lodgingType: z.string().min(1).optional(),
  lodgingRating: z.number().min(0).max(5).optional(),
  cautionNote: z.string().min(1).optional(),
  isStale: z.boolean().default(false),
  sourceReferences: z.array(SourceReferenceSchema).default([]),
});

export const CoursePlaceItemSchema = z.object({
  placeId: IdSchema,
  order: z.number().int().positive(),
  stayMinutes: z.number().int().positive().optional(),
  memo: z.string().min(1).optional(),
});

export const CourseSchema = z.object({
  id: IdSchema,
  youtuberId: IdSchema,
  countryId: IdSchema,
  cityId: IdSchema,
  title: z.string().min(1),
  shortDescription: z.string().min(1),
  thumbnailUrl: z.string().url().optional(),
  placeItems: z.array(CoursePlaceItemSchema),
  tags: z.array(z.string().min(1)),
  sourceReferences: z.array(SourceReferenceSchema),
  publishedAt: z.string().datetime().optional(),
  isFeatured: z.boolean().optional(),
});

export const RelatedEntityTypeSchema = z.enum([
  'youtuber',
  'country',
  'city',
  'place',
  'place_snapshot',
  'course',
]);

export const VerificationEvidenceSchema = z.object({
  id: IdSchema,
  sourceType: SourceTypeSchema,
  sourceLabel: z.string().min(1),
  sourceUrl: z.string().url().optional(),
  verificationLevel: VerificationLevelSchema,
  collectedAt: z.string().datetime(),
  rawText: z.string().min(1),
  normalizedText: z.string().min(1).optional(),
  note: z.string().min(1).optional(),
  relatedEntityType: RelatedEntityTypeSchema,
  relatedEntityId: IdSchema,
});

export type ID = z.infer<typeof IdSchema>;
export type SourceType = z.infer<typeof SourceTypeSchema>;
export type GeoPoint = z.infer<typeof GeoPointSchema>;
export type SourceReference = z.infer<typeof SourceReferenceSchema>;
export type YouTuber = z.infer<typeof YouTuberSchema>;
export type Country = z.infer<typeof CountrySchema>;
export type City = z.infer<typeof CitySchema>;
export type Place = z.infer<typeof PlaceSchema>;
export type PlaceSnapshot = z.infer<typeof PlaceSnapshotSchema>;
export type CoursePlaceItem = z.infer<typeof CoursePlaceItemSchema>;
export type Course = z.infer<typeof CourseSchema>;
export type RelatedEntityType = z.infer<typeof RelatedEntityTypeSchema>;
export type VerificationEvidence = z.infer<typeof VerificationEvidenceSchema>;
