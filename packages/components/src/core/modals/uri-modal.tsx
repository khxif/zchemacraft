'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@zchemacraft/components/ui/dialog';
import { Sheet, SheetContent, SheetTitle } from '@zchemacraft/components/ui/sheet';
import { useSeedMockData } from '@zchemacraft/hooks/mutations';
import { useIsMobile } from '@zchemacraft/hooks/use-mobile';
import { uriSchema, UriSchemaType } from '@zchemacraft/zod-schemas/schema';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { UriForm } from '../forms/uri-forms';

interface UriModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  schema: string;
  type: string;
}

export function UriModal({ isOpen, setIsOpen, schema, type = 'Mongoose' }: UriModalProps) {
  const isMobile = useIsMobile();
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
  return !isMobile ? (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="fixed top-1/2 left-1/2 !-translate-x-1/2 !-translate-y-1/2 w-full max-w-md">
        <DialogHeader>
          <DialogTitle>Enter the Database URI.</DialogTitle>
        </DialogHeader>
        <div>
          <UriForm form={form} onSubmit={onSubmit} isPending={isPending} />
        </div>
      </DialogContent>
    </Dialog>
  ) : (
     <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="bottom" className="p-5 rounded-t-3xl">
        <SheetTitle>Enter the Database URI.</SheetTitle>

        <div>
         <UriForm form={form} onSubmit={onSubmit} isPending={isPending} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
