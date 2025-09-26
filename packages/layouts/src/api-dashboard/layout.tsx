'use client';

import { UserButton } from '@zchemacraft/components/coreuser-button';
import { SidebarProvider, SidebarTrigger } from '@zchemacraft/components/ui/sidebar';
import { useAuthStore } from '@zchemacraft/stores/auth-store';
import { User } from '@zchemacraft/types';
import { APIDashboardSidebar } from './sidebar';

export function APIDashboardLayout({ children }: { children: React.ReactNode }) {
  const user = useAuthStore(state => state.user);

  return (
    <SidebarProvider>
      <APIDashboardSidebar />
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
