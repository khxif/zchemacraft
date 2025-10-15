'use client';

import { APIDashboardLayout } from '@zchemacraft/layouts/api-dashboard/layout';
import { AuthProtected } from '@zchemacraft/providers/auth-protected';
import type { Route } from '@zchemacraft/types';
import { GitPullRequestDraftIcon, KeyRoundIcon, RocketIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function MockAPILayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const routes: Route[] = [
    {
      label: 'Mock APIs',
      icon: GitPullRequestDraftIcon,
      href: '/mock-api',
      active: pathname === '/mock-api',
    },
    {
      label: 'API Keys',
      icon: KeyRoundIcon,
      href: '/api-keys',
      active: pathname === '/api-keys',
    },
    {
      label: 'Test APIs',
      icon: RocketIcon,
      href: '/api-client',
      active: pathname === '/api-client',
    },
  ] as const;

  return (
    <AuthProtected>
      <APIDashboardLayout routes={routes}>{children}</APIDashboardLayout>
    </AuthProtected>
  );
}
