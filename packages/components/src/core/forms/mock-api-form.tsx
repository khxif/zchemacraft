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
import { Textarea } from '@zchemacraft/components/ui/textarea';
import { MockAPISchemaType } from '@zchemacraft/zod-schemas/mock-api';
import { UseFormReturn } from 'react-hook-form';
import { Spinner } from '../../ui/spinner';
import { Tabs, TabsList, TabsTrigger } from '../../ui/tabs';

interface MockAPIFormProps {
  form: UseFormReturn<MockAPISchemaType>;
  onSubmit: (values: MockAPISchemaType) => Promise<void>;
  isPending: boolean;
}

export function MockAPIForm({ form, onSubmit, isPending }: MockAPIFormProps) {
  const [activeTab] = form.watch(['schemaType']);

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
                      <TabsTrigger value="prisma">Prisma</TabsTrigger>
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
                <FormLabel>API Path</FormLabel>
                <FormControl>
                  <Input placeholder="/users" {...field} />
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
                  <Textarea placeholder={placeholders[activeTab]} {...field} />
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
            {isPending ? <Spinner /> : 'Create API'}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}

const placeholders = {
  json: `{
  "name": { "type": "string", "minLength": 1 },
}`,
  mongoose: `{
  User: {
    name: { type: String, required: true },
    posts: [{ type: ObjectId, ref: 'Post' }],
    createdAt: { type: Date, default: "now" }
  },
  Post: {
    title: { type: String, required: true },
    author: { type: ObjectId, ref: 'User' },
  }
}`,
  prisma: `model User {
  id        Int      @id @default(autoincrement())
  name model User {
  id     Int     @id @default(autoincrement())
  name   String
  email  String  @unique
}`,
};
