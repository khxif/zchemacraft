'use client';

import { zodResolver } from '@hookform/resolvers/zod';
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
import { Textarea } from '@zchemacraft/components/ui/textarea';
import { useCreateMockAPIMutation } from '@zchemacraft/hooks/mutations';
import { mockAPISchema, MockAPISchemaType } from '@zchemacraft/zod-schemas/mock-api';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Tabs, TabsList, TabsTrigger } from '../../ui/tabs';
import { Spinner } from '../../ui/spinner';
import { useQueryClient } from '@tanstack/react-query';

export function MockAPIForm() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useCreateMockAPIMutation();

  const form = useForm<MockAPISchemaType>({
    resolver: zodResolver(mockAPISchema),
    defaultValues: {
      schema: '',
      path: '',
      schemaType: 'json',
    },
  });

  async function onSubmit(values: MockAPISchemaType) {
    try {
      const data = await mutateAsync(values);
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['mock-apis'] });
      toast.success(data?.message || 'Mock API created successfully');
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="schemaType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Schema Type</FormLabel>
                <FormControl>
                  <Tabs onValueChange={field.onChange} value={field.value} className="w-full">
                    <TabsList>
                      <TabsTrigger value="json">JSON</TabsTrigger>
                      <TabsTrigger value="mongoose">Mongoose</TabsTrigger>
                      <TabsTrigger value="prisma" disabled>
                        Coming Soon..
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="path"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>API Endpoint</FormLabel>
                <FormControl>
                  <Input placeholder="/api/users" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="schema"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Schema</FormLabel>
                <FormControl>
                  <Textarea placeholder="Schema" {...field} />
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
  );
}
