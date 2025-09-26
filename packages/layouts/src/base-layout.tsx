'use client';

import { useBaseLayoutStore } from '@zchemacraft/stores/base-layout-store';
import React from 'react';
import { useInitApp } from '@zchemacraft/hooks/use-init-app';
import { Spinner } from '@zchemacraft/components/uispinner';

export function BaseLayout({ children }: { children: React.ReactNode }) {
  const isAppInitialized = useBaseLayoutStore(state => state.isAppInitialized);
  useInitApp();

  return isAppInitialized ? (
    children
  ) : (
    <div className="flex items-center justify-center h-svh flex-col space-y-1">
      <Spinner />
      <p>Loading..</p>
    </div>
  );
}
