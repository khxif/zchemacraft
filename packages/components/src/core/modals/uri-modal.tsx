'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@zchemacraft/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@zchemacraft/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@zchemacraft/components/ui/form';
import { Input } from '@zchemacraft/components/ui/input';
import { Spinner } from '@zchemacraft/components/ui/spinner';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useSeedMockData } from '@zchemacraft/hooks/mutations';
import { uriSchema, UriSchemaType } from '@zchemacraft/zod-schemas/schema';

interface UriModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  schema: string;
  type: string;
}

export function UriModal({ isOpen, setIsOpen, schema, type = 'Mongoose' }: UriModalProps) {
  const { mutateAsync, isPending } = useSeedMockData();

  const form = useForm<UriSchemaType>({
    resolver: zodResolver(uriSchema),
    defaultValues: {
      uri: '',
    },
  });

  async function onSubmit(values: UriSchemaType) {
    try {
      await mutateAsync({ schema, uri: values.uri, type });
      toast.success('Database seeded successfully!');
    } catch (error) {
      console.error(error);
    } finally {
      setIsOpen(false);
    }
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="fixed top-1/2 left-1/2 !-translate-x-1/2 !-translate-y-1/2 w-full max-w-md">
        <DialogHeader>
          <DialogTitle>Enter the Database URI.</DialogTitle>
        </DialogHeader>
        <div>
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
