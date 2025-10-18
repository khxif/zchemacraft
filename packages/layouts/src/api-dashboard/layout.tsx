'use client';

import { UserButton } from '@zchemacraft/components/coreuser-button';
import { SidebarProvider, SidebarTrigger } from '@zchemacraft/components/ui/sidebar';
import { useAuthStore } from '@zchemacraft/stores/auth-store';
import type { Route } from '@zchemacraft/types';
import { User } from '@zchemacraft/types';
import { GitPullRequestDraftIcon, KeyRoundIcon, RocketIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React from 'react';
import { APIDashboardSidebar } from './sidebar';

export function APIDashboardLayout({ children }: { children: React.ReactNode }) {
  const user = useAuthStore(state => state.user);
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
    <SidebarProvider>
      <APIDashboardSidebar routes={routes} />
      <main className="flex-1">
        <nav className="flex items-center justify-between px-4 py-2 border-b border-border">
          <SidebarTrigger />
          <UserButton user={user as User} />
        </nav>
        {children}
      </main>
    </SidebarProvider>
  );
}
