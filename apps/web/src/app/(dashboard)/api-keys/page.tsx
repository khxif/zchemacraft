'use client';

import { useQueryClient } from '@tanstack/react-query';
import { type ColumnDef } from '@tanstack/react-table';
import { APIKeyModal } from '@zchemacraft/components/core/modals/api-key-modal';
import { APIKeysTable } from '@zchemacraft/components/core/tables/api-keys-table';
import { Button } from '@zchemacraft/components/uibutton';
import { Spinner } from '@zchemacraft/components/uispinner';
import { useDeleteApiKeyMutation } from '@zchemacraft/hooks/mutations';
import { useGetAPIkeys } from '@zchemacraft/hooks/queries';
import { type APIKey } from '@zchemacraft/types';
import { Trash2Icon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ApiKeys() {
  const [isAPIKeyModalOpen, setAPIKeyModalOpen] = useState(false);
  const { data, isLoading } = useGetAPIkeys();

  const { mutateAsync, isPending } = useDeleteApiKeyMutation();
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
    <main className="py-4 px-4 w-full flex-1 md:px-10 space-y-10">
      <nav className="flex items-center justify-between">
        <h1 className="text-xl font-medium md:text-2xl">API Keys</h1>

        <Button onClick={() => setAPIKeyModalOpen(true)}>Create API</Button>
      </nav>

      {!isLoading ? (
        <APIKeysTable columns={getColumns(handleApiKeyDelete, isPending)} data={data} />
      ) : (
        <div className="flex justify-center items-center h-32">
          <Spinner />
        </div>
      )}

      <APIKeyModal open={isAPIKeyModalOpen} setOpen={setAPIKeyModalOpen} />
    </main>
  );
}

function getColumns(handleApiKeyDelete: (id: number) => void, isPending: boolean) {
  const columns: ColumnDef<APIKey>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'key',
      header: 'Key',
      cell: () => <p>sc_xxxxx</p>,
    },
    {
      accessorKey: 'createdAt',
      header: 'Created At',
      cell: ({ row }) => <p>{new Date(row.original.createdAt).toLocaleString()}</p>,
    },
    {
      accessorKey: 'id',
      header: '',
      cell: ({ row }) => {
        return (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleApiKeyDelete(row.original.id)}
            disabled={isPending}
          >
            {isPending ? <Spinner /> : <Trash2Icon className="h-4 w-4" />}
          </Button>
        );
      },
    },
  ];

  return columns;
}
