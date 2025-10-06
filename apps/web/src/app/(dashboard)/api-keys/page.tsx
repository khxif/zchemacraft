'use client';

import { useQueryClient } from '@tanstack/react-query';
import { type ColumnDef } from '@tanstack/react-table';
import { APIKeyModal } from '@zchemacraft/components/core/modals/api-key-modal';
import { ConfirmationModal } from '@zchemacraft/components/core/modals/confirmation-modal';
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
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [apiKeyToDelete, setApiKeyToDelete] = useState<string>('');

  const { data, isLoading } = useGetAPIkeys();

  const { mutateAsync, isPending } = useDeleteApiKeyMutation();
  const queryClient = useQueryClient();

  const handleApiKeyDelete = async (id: string) => {
    try {
      const data = await mutateAsync(id);
      queryClient.invalidateQueries({ queryKey: ['api-keys'] });

      toast.success(data?.message || 'API Key deleted successfully');
      setConfirmationModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="py-4 px-4 w-full flex-1 md:px-10 space-y-10">
      <nav className="flex items-center justify-between">
        <h1 className="text-xl font-medium md:text-2xl">API Keys</h1>

        <Button onClick={() => setAPIKeyModalOpen(true)}>Create API Key</Button>
      </nav>

      {!isLoading && data ? (
        <APIKeysTable
          columns={getColumns(
            handleApiKeyDelete,
            isPending,
            setApiKeyToDelete,
            setConfirmationModalOpen,
          )}
          data={data}
        />
      ) : (
        <div className="flex justify-center items-center h-32">
          <Spinner />
        </div>
      )}

      <APIKeyModal open={isAPIKeyModalOpen} setOpen={setAPIKeyModalOpen} />
      <ConfirmationModal
        title="Delete API Key"
        description="Are you sure you want to delete this API key? This action cannot be undone."
        open={isConfirmationModalOpen}
        setOpen={setConfirmationModalOpen}
        handleConfirm={() => handleApiKeyDelete(apiKeyToDelete)}
        confirmButtonText={isPending ? 'Deleting...' : 'Delete'}
        disabled={isPending}
      />
    </main>
  );
}

function getColumns(
  handleApiKeyDelete: (id: string) => void,
  isPending: boolean,
  setApiKeyToDelete: (id: string) => void,
  setIsConfirmationModalOpen: (open: boolean) => void,
) {
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
            onClick={() => {
              setApiKeyToDelete(row.original.id);
              setIsConfirmationModalOpen(true);
            }}
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
