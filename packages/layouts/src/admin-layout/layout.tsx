'use client';

import { SidebarProvider, SidebarTrigger } from '@zchemacraft/components/ui/sidebar';
import { AdminSidebar } from '@zchemacraft/layouts/admin-layout/sidebar';
import { useAuthStore } from '@zchemacraft/stores/auth-store';
import { Route } from '@zchemacraft/types';
import { GitPullRequestDraftIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';

export function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const user = useAuthStore(state => state.user);
  const pathname = usePathname();

  const routes: Route[] = [
    {
      label: 'Dashboard',
      icon: GitPullRequestDraftIcon,
      href: '/dashboard',
      active: pathname === '/dashboard',
    },
  ] as const;
  return (
    <SidebarProvider>
      <AdminSidebar routes={routes} />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
