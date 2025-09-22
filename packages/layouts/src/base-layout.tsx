"use client"

import { useBaseLayoutStore } from '@zchemacraft/stores/base-layout-store';
import React from 'react';
import { useInitApp } from '@zchemacraft/hooks/use-init-app';

export function BaseLayout({ children }: { children: React.ReactNode }) {
  const isAppInitialized = useBaseLayoutStore(state => state.isAppInitialized);
  useInitApp();

  return isAppInitialized ? children : <>Loading</>;
}
