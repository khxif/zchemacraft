'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@zchemacraft/components/ui/dialog';
import { Button } from '../../ui/button';

interface ConfirmationModalProps {
  title: string;
  description: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  handleConfirm: () => Promise<void>;
  confirmButtonText: string;
  disabled?: boolean;
}

export function ConfirmationModal({
  open,
  setOpen,
  title,
  description,
  handleConfirm,
  confirmButtonText,
  disabled
}: ConfirmationModalProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="fixed top-1/2 left-1/2 !-translate-x-1/2 !-translate-y-1/2 w-full max-w-md space-y-4">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <DialogFooter className="">
          <DialogClose asChild>
            <Button onClick={() => setOpen(false)} disabled={disabled} className="w-full flex-1" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={handleConfirm} disabled={disabled} variant="destructive" className="w-full flex-1">
            {confirmButtonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
