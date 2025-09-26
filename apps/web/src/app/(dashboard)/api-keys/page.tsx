'use client';

import { useQueryClient } from '@tanstack/react-query';
import { APIKeyModal } from '@zchemacraft/components/core/modals/api-key-modal';
import { Button } from '@zchemacraft/components/uibutton';
import { useDeleteApiKeyMutation } from '@zchemacraft/hooks/mutations';
import { useGetAPIkeys } from '@zchemacraft/hooks/queries';
import { APIKey } from '@zchemacraft/types';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ApiKeys() {
  const [isAPIKeyModalOpen, setAPIKeyModalOpen] = useState(false);
  const { data } = useGetAPIkeys();

  const { mutateAsync } = useDeleteApiKeyMutation();
  const queryClient = useQueryClient();

  const handleApiKeyDelete = async (id: number) => {
    try {
      const data = await mutateAsync(id);
      queryClient.invalidateQueries({ queryKey: ['api-keys'] });
      toast.success(data?.message || 'API Key deleted successfully');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="py-4 px-4 w-full flex-1 md:px-10">
      <nav className="flex items-center justify-between">
        <h1 className="text-xl font-medium md:text-2xl">API Keys</h1>

        <Button onClick={() => setAPIKeyModalOpen(true)}>Create API</Button>
      </nav>

      <div className='mt-8'>
        {data?.map((apikey: APIKey) => (
          <div key={apikey.id} className="my-2 p-4 border border-gray-300 rounded">
            <p>
              {apikey.name} - {apikey.key}
            </p>
            <Button onClick={() => handleApiKeyDelete(apikey.id)}>Delete</Button>
          </div>
        ))}
      </div>

      <APIKeyModal open={isAPIKeyModalOpen} setOpen={setAPIKeyModalOpen} />
    </main>
  );
}
