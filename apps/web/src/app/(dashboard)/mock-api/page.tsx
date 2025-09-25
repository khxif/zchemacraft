'use client';

import { useQueryClient } from '@tanstack/react-query';
import { MockAPISlider } from '@zchemacraft/components/core/mobile-sliders/mock-api-slider';
import { MockAPIModal } from '@zchemacraft/components/core/modals/mock-api-modal';
import { Button } from '@zchemacraft/components/uibutton';
import { useDeleteMockAPIMutation } from '@zchemacraft/hooks/mutations';
import { useGetMockAPIs } from '@zchemacraft/hooks/queries';
import { useIsMobile } from '@zchemacraft/hooks/use-mobile';
import { type MockAPI } from '@zchemacraft/types';
import { Trash2Icon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function MockAPI() {
  const isMobile = useIsMobile();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data } = useGetMockAPIs();
  console.log(data);

  const { mutateAsync: deleteMockAPI, isPending } = useDeleteMockAPIMutation();

  const handleDelete = async (id: number) => {
    try {
      const data = await deleteMockAPI(id);
      queryClient.invalidateQueries({ queryKey: ['mock-apis'] });
      toast.success(data?.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="py-4 px-10 w-full flex-1">
      <Button onClick={() => setIsModalOpen(true)}>Create API</Button>

      <div className="flex flex-col gap-4 mt-6">
        {data?.map((api: MockAPI) => (
          <div
            key={api.id}
            className="flex items-center justify-between py-4 px-6 rounded-md w-full border border-muted"
          >
            <div className="">
              <Button size="sm" className="font-bold text-sm">
                GET
              </Button>
              <span className="ml-4 font-medium">{api.path}</span>
            </div>

            <div>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleDelete(api.id)}
                disabled={isPending}
              >
                <Trash2Icon className="size-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      {isMobile ? (
        <MockAPISlider open={isModalOpen} setOpen={setIsModalOpen} />
      ) : (
        <MockAPIModal open={isModalOpen} setOpen={setIsModalOpen} />
      )}
    </main>
  );
}
