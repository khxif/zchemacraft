'use client';

import { useQueryClient } from '@tanstack/react-query';
import { MockAPISlider } from '@zchemacraft/components/core/mobile-sliders/mock-api-slider';
import { MockAPIModal } from '@zchemacraft/components/core/modals/mock-api-modal';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@zchemacraft/components/ui/accordion';
import { Table, TableBody, TableCell, TableRow } from '@zchemacraft/components/ui/table';
import { Button } from '@zchemacraft/components/uibutton';
import { Spinner } from '@zchemacraft/components/uispinner';
import { useDeleteMockAPIMutation } from '@zchemacraft/hooks/mutations';
import { useGetMockAPIs } from '@zchemacraft/hooks/queries';
import { useIsMobile } from '@zchemacraft/hooks/use-mobile';
import { useAuthStore } from '@zchemacraft/stores/auth-store';
import { User, type MockAPI } from '@zchemacraft/types';
import { ExternalLinkIcon, Trash2Icon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function MockAPI() {
  const isMobile = useIsMobile();
  const queryClient = useQueryClient();
  const user = useAuthStore(state => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading } = useGetMockAPIs();

  const { mutateAsync: deleteMockAPI, isPending } = useDeleteMockAPIMutation();

  const handleDelete = async (id: string) => {
    try {
      const data = await deleteMockAPI(id);
      queryClient.invalidateQueries({ queryKey: ['mock-apis'] });
      toast.success(data?.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="py-4 px-4 w-full flex-1 md:px-10">
      <nav className="flex items-center justify-between">
        <h1 className="text-xl font-medium md:text-2xl">Mock APIs</h1>

        <Button onClick={() => setIsModalOpen(true)}>Create API</Button>
      </nav>

      {!isLoading ? (
        <Accordion className="flex flex-col gap-4 mt-6" type="single" collapsible>
          {data?.map((api: MockAPI) => (
            <AccordionItem key={api.id} value={api.path} className="border border-muted">
              <AccordionTrigger className="px-4">
                <div className="flex items-center">
                  <div className="font-bold text-sm bg-primary rounded-sm text-secondary px-3 py-1.5">
                    GET
                  </div>
                  <span
                    className="flex items-center space-x-1.5 ml-4"
                    onClick={e => {
                      e.stopPropagation();
                      navigator.clipboard.writeText(
                        `${process.env.NEXT_PUBLIC_PUBLIC_API_URL}/api/mock-data/${(user as User)?.id}${api.path}`,
                      );
                      toast.success('Copied to clipboard');
                    }}
                  >
                    <p className="font-medium">
                      {process.env.NEXT_PUBLIC_PUBLIC_API_URL}/api/mock-data/{(user as User)?.id}{api.path}
                    </p>
                    <ExternalLinkIcon className="size-3" />
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 border border-muted space-y-6">
                <div className="flex flex-col space-y-2">
                  <h1 className="text-sm font-bold">Headers:</h1>

                  <Table className=" rounded-md text-sm bg-muted">
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium w-1/2 border-r border-r-muted-foreground">
                          x-api-key
                        </TableCell>
                        <TableCell className="font-mono w-1/2">{'<>YOUR_API_KEY<>'}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="flex flex-col gap-1.5">
                  <h1 className="text-sm font-bold">Schema:</h1>
                  <pre className="bg-muted p-4 rounded-md overflow-y-scroll scrollbar-hide">
                    <code>{api.schema}</code>
                  </pre>
                </div>

                <div className="w-full flex items-center justify-end">
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(api.id)}
                    disabled={isPending}
                  >
                    <Trash2Icon className="size-4" />
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <Spinner className="mx-auto mt-20" />
      )}

      {isMobile ? (
        <MockAPISlider open={isModalOpen} setOpen={setIsModalOpen} />
      ) : (
        <MockAPIModal open={isModalOpen} setOpen={setIsModalOpen} />
      )}
    </main>
  );
}
