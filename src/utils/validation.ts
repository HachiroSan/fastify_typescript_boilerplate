import { z } from 'zod';

// Common validation schemas
export const paginationSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
});

export const idSchema = z.object({
  id: z.string().uuid(),
});

export const timestampSchema = z.object({
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// Validation helper function
export const validateSchema = <T>(schema: z.ZodSchema<T>, data: unknown): T => {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new Error(`Validation failed: ${result.error.message}`);
  }
  return result.data;
};

// Type helpers
export type PaginationQuery = z.infer<typeof paginationSchema>;
export type IdParams = z.infer<typeof idSchema>;
export type TimestampFields = z.infer<typeof timestampSchema>;
