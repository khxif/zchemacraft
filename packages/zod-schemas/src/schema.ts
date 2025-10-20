import z from 'zod';

export const schemaInputSchema = z.object({
  schema: z.string().min(2),
});
export type SchemaInputType = z.infer<typeof schemaInputSchema>;

export const uriSchema = z.object({
  uri: z.url({ message: 'Please enter a valid Database URI' }),
});
export type UriSchemaType = z.infer<typeof uriSchema>;
