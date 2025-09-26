'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@zchemacraft/components/ui/dialog';
import { useCreateApiKeyMutation } from '@zchemacraft/hooks/mutations';
import { apiKeySchema, ApiKeySchemaType } from '@zchemacraft/zod-schemas/api-key';
import { CopyIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { APIKeyForm } from '../forms/api-key-form';

interface APIKeyModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function APIKeyModal({ open, setOpen }: APIKeyModalProps) {
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
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="fixed top-1/2 left-1/2 !-translate-x-1/2
           !-translate-y-1/2 w-full max-w-md space-y-4"
      >
        <DialogHeader>
          <DialogTitle>{!apiKey ? 'Create your API Key.' : 'API Key Created'}</DialogTitle>
          {apiKey ? (
            <DialogDescription>The API key will be shown only once.</DialogDescription>
          ) : null}
        </DialogHeader>

        {!apiKey ? (
          <APIKeyForm form={form} onSubmit={onSubmit} isPending={isPending} />
        ) : (
          <div className="flex items-center space-x-3">
            <Input readOnly value={apiKey} />
            <Button onClick={() => navigator.clipboard.writeText(apiKey)}>
              <CopyIcon className="h-4 w-4" />
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
