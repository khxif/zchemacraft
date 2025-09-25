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
    <div className="p-4">
      <Button onClick={() => setAPIKeyModalOpen(true)}>Create New API Key</Button>
      {data?.map((apikey: APIKey) => (
        <div key={apikey.id} className="my-2 p-4 border border-gray-300 rounded">
          <p>
            {apikey.name} - {apikey.key}
          </p>
          <Button onClick={() => handleApiKeyDelete(apikey.id)}>Delete</Button>
        </div>
      ))}

      <APIKeyModal open={isAPIKeyModalOpen} setOpen={setAPIKeyModalOpen} />
    </div>
  );
}
