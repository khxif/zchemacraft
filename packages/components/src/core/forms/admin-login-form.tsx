'use client';

import { Button } from '@zchemacraft/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@zchemacraft/components/ui/form';
import { Input } from '@zchemacraft/components/ui/input';
import { AdminLoginSchemaType } from '@zchemacraft/zod-schemas/admin-auth';
import { UseFormReturn } from 'react-hook-form';

interface AdminLoginFormProps {
  form: UseFormReturn<AdminLoginSchemaType>;
  onSubmit: (data: AdminLoginSchemaType) => Promise<void>;
}

export function AdminLoginForm({ form, onSubmit }: AdminLoginFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john.doe@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" type="submit" size="lg">
          Login
        </Button>
      </form>
    </Form>
  );
}
