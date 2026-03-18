import { z } from 'zod';

export const VerificationLevelSchema = z.enum(['high', 'medium', 'low']);

export type VerificationLevel = z.infer<typeof VerificationLevelSchema>;
