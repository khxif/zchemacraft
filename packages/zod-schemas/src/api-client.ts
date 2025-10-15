import z from 'zod';

const allowedBaseUrl = process.env.NEXT_PUBLIC_PUBLIC_API_URL;

export const apiClientSchema = z.object({
  url: z
    .url('Must be a valid URL')
    .refine(val => allowedBaseUrl && val.startsWith(`${allowedBaseUrl}/api/mock-data`), {
      message: `URL must start with ${allowedBaseUrl}`,
    }),
  apiKey: z.string().optional(),
});
export type ApiClientSchema = z.infer<typeof apiClientSchema>;
