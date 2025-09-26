import z from 'zod';

export const apiKeySchema = z.object({
  name: z.string().min(2, 'Enter a valid name'),
});
export type ApiKeySchemaType = z.infer<typeof apiKeySchema>;
