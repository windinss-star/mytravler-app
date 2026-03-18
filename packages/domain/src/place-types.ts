import { z } from 'zod';

export const PlaceCategorySchema = z.enum(['restaurant', 'attraction', 'lodging']);

export type PlaceCategory = z.infer<typeof PlaceCategorySchema>;
