import z from 'zod';

export const mockAPISchema = z.object({
  schema: z.string().min(2, 'Schema is required'),
  path: z.string().min(2, 'Path is required').regex(/^\//, 'Path must start with /'),
  schemaType: z.enum(['json', 'mongoose', 'prisma']),
});
export type MockAPISchemaType = z.infer<typeof mockAPISchema>;
