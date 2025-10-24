import * as z from 'zod';

export const adminLoginSchema = z.object({
  email: z.email().min(3, 'Email must be at least 3 characters.'),
  password: z.string().min(5, 'Password must be at least 5 characters.'),
});
export type AdminLoginSchemaType = z.infer<typeof adminLoginSchema>;
