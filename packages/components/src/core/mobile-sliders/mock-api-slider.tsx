'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from '@zchemacraft/components/ui/sheet';
import { MockAPIForm } from '../forms/mock-api-form';

interface MockAPISliderProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function MockAPISlider({ open, setOpen }: MockAPISliderProps) {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="bottom" className="p-5 rounded-t-3xl space-y-2.5">
        <div className="flex flex-col space-y-1">
          <SheetTitle>Create your own API.</SheetTitle>
          <SheetDescription>Craft your schemas into a mock API in seconds.</SheetDescription>
        </div>

        <MockAPIForm />
      </SheetContent>
    </Sheet>
  );
}
