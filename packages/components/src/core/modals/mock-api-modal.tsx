'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { MockAPIForm } from '@zchemacraft/components/core/forms/mock-api-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@zchemacraft/components/ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from '@zchemacraft/components/ui/sheet';
import { useCreateMockAPIMutation } from '@zchemacraft/hooks/mutations';
import { useIsMobile } from '@zchemacraft/hooks/use-mobile';
import { mockAPISchema, MockAPISchemaType } from '@zchemacraft/zod-schemas/mock-api';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface MockAPIModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function MockAPIModal({ open, setOpen }: MockAPIModalProps) {
  const isMobile = useIsMobile();

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
      queryClient.invalidateQueries({ queryKey: ['mock-apis'] });

      form.reset();
      toast.success(data?.message || 'Mock API created successfully');
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  }

  return !isMobile ? (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="fixed top-1/2 left-1/2 !-translate-x-1/2
           !-translate-y-1/2 w-full max-w-md"
      >
        <DialogHeader>
          <DialogTitle>Create your own API.</DialogTitle>
          <DialogDescription>Craft your schemas into a mock API in seconds.</DialogDescription>
        </DialogHeader>

        <MockAPIForm form={form} onSubmit={onSubmit} isPending={isPending} />
      </DialogContent>
    </Dialog>
  ) : (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="bottom" className="p-5 rounded-t-3xl space-y-2.5">
        <div className="flex flex-col space-y-1">
          <SheetTitle>Create your own API.</SheetTitle>
          <SheetDescription>Craft your schemas into a mock API in seconds.</SheetDescription>
        </div>

        <MockAPIForm form={form} onSubmit={onSubmit} isPending={isPending} />
      </SheetContent>
    </Sheet>
  );
}
