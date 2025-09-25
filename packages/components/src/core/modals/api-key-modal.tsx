'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@zchemacraft/components/ui/dialog';
import { APIKeyForm } from '../forms/api-key-form';

interface APIKeyModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function APIKeyModal({ open, setOpen }: APIKeyModalProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="fixed top-1/2 left-1/2 !-translate-x-1/2
           !-translate-y-1/2 w-full max-w-md"
      >
        <DialogHeader>
          <DialogTitle>Create your own API.</DialogTitle>
          <DialogDescription>Craft your schemas into a mock API in seconds.</DialogDescription>
        </DialogHeader>

        <APIKeyForm />
      </DialogContent>
    </Dialog>
  );
}
