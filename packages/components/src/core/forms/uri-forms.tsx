'use client';

import { Button } from '@zchemacraft/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@zchemacraft/components/ui/form';
import { Input } from '@zchemacraft/components/ui/input';
import { Spinner } from '@zchemacraft/components/ui/spinner';
import { UriSchemaType } from '@zchemacraft/zod-schemas/schema';
import { UseFormReturn } from 'react-hook-form';

interface UriFormProps {
  form: UseFormReturn<UriSchemaType>;
  onSubmit: (values: UriSchemaType) => Promise<void>;
  isPending: boolean;
}

export function UriForm({ form, onSubmit, isPending }: UriFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="uri"
          disabled={isPending}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="DATABASE URI" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? <Spinner /> : 'Seed'}
        </Button>
      </form>
    </Form>
  );
}
