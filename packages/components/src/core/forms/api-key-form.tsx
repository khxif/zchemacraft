'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
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
import { useCreateApiKeyMutation } from '@zchemacraft/hooks/mutations';
import { apiKeySchema, ApiKeySchemaType } from '@zchemacraft/zod-schemas/api-key';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Spinner } from '../../ui/spinner';
import { useState } from 'react';

export function APIKeyForm() {
  const [apiKey, setApiKey] = useState<string>('');

  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useCreateApiKeyMutation();

  const form = useForm<ApiKeySchemaType>({
    resolver: zodResolver(apiKeySchema),
    defaultValues: {
      name: '',
    },
  });

  async function onSubmit(values: ApiKeySchemaType) {
    try {
      const data = await mutateAsync(values);
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['api-keys'] });
      setApiKey(data?.data);
      toast.success(data?.message || 'Mock API created successfully');
    } catch (error) {
      console.error(error);
    }
  }
  return !apiKey ? (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>API Name</FormLabel>
                <FormControl>
                  <Input placeholder="/api/users" {...field} />
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
            {isPending ? <Spinner /> : 'Save changes'}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  ) : (
    <Input readOnly value={apiKey} />
  );
}
