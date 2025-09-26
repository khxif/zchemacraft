import { SidebarProvider, SidebarTrigger } from '@zchemacraft/components/ui/sidebar';
import { APIDashboardSidebar } from './sidebar';
import { UserButton } from '@zchemacraft/components/coreuser-button';

export function APIDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <APIDashboardSidebar />
      <main className="flex-1">
        <nav className='flex items-center justify-between px-4 py-2 border-b border-border'>
          <SidebarTrigger />
          <UserButton />
        </nav>
        {children}
      </main>
    </SidebarProvider>
  );
}
