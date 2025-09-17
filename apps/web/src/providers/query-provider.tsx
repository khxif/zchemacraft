'use client';

import { MutationCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import React from 'react';
import { toast } from 'sonner';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1 },
    mutations: { retry: 1 },
  },
  mutationCache: new MutationCache({
    onError: error => {
      let errorMsg = 'Something went wrong';

      if (isAxiosError(error)) errorMsg = error?.response?.data?.message;
      else errorMsg = error.message;
      toast.error(errorMsg);
    },
  }),
});

export function QueryProvider({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
