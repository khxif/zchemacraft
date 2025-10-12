'use client';

import { UserButton } from '@zchemacraft/components/coreuser-button';
import { SidebarProvider, SidebarTrigger } from '@zchemacraft/components/ui/sidebar';
import { useAuthStore } from '@zchemacraft/stores/auth-store';
import { Route, User } from '@zchemacraft/types';
import { APIDashboardSidebar } from './sidebar';

export function APIDashboardLayout({
  children,
  routes,
}: {
  children: React.ReactNode;
  routes: Route[];
}) {
  const user = useAuthStore(state => state.user);

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
