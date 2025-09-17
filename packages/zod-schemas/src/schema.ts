import z from 'zod';

const allowedTypes = ['String', 'Number', 'Boolean', 'Date', 'ObjectId'] as const;

const fieldSchema = z.object({
  type: z.enum(allowedTypes),
  required: z.boolean().optional(),
  enum: z.array(z.string()).optional(),
  default: z.union([z.string(), z.number(), z.boolean(), z.null()]).optional(),
});

const modelSchema = z.record(z.string(), fieldSchema);
export const inputSchema = z.record(z.string(), modelSchema);
export type InputType = z.infer<typeof inputSchema>;

export const mongoUriSchema = z
  .url()
  .regex(/^mongodb(\+srv)?:\/\//, 'Must be a valid MongoDB connection string');

export const schemaInputSchema = z.object({
  schema: z.string().min(2),
});
export type SchemaInputType = z.infer<typeof schemaInputSchema>;

export const uriSchema = z.object({
  uri: z.url({ message: 'Please enter a valid Database URI' }),
});
export type UriSchemaType = z.infer<typeof uriSchema>;
