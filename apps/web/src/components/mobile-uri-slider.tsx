'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@zchemacraft/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@zchemacraft/components/ui/form';
import { Input } from '@zchemacraft/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@zchemacraft/components/ui/sheet';
import { Spinner } from '@zchemacraft/components/ui/spinner';
import { useSeedMockData } from '@zchemacraft/hooks/mutations';
import { uriSchema, UriSchemaType } from '@zchemacraft/zod-schemas/schema';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface MobileUriSliderProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  schema: string;
  type: string;
}

export function MobileUriSlider({
  isOpen,
  setIsOpen,
  schema,
  type = 'Mongoose',
}: MobileUriSliderProps) {
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
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="bottom" className="p-5">
        <SheetTitle>Enter the Database URI.</SheetTitle>

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
      </SheetContent>
    </Sheet>
  );
}
