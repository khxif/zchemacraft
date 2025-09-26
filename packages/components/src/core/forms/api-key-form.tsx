'use client';

import { Button } from '@zchemacraft/components/ui/button';
import { DialogClose, DialogFooter } from '@zchemacraft/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@zchemacraft/components/ui/form';
import { Input } from '@zchemacraft/components/ui/input';
import { ApiKeySchemaType } from '@zchemacraft/zod-schemas/api-key';
import { UseFormReturn } from 'react-hook-form';
import { Spinner } from '../../ui/spinner';

interface APIKeyFormProps {
  form: UseFormReturn<ApiKeySchemaType>;
  onSubmit: (values: ApiKeySchemaType) => Promise<void>;
  isPending: boolean;
}

export function APIKeyForm({ form, onSubmit, isPending }: APIKeyFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>API Key Name</FormLabel>
                <FormControl>
                  <Input placeholder="Test Key" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isPending}>
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" disabled={isPending}>
            {isPending ? <Spinner /> : 'Create Key'}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
