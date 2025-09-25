import { SidebarProvider, SidebarTrigger } from '@zchemacraft/components/ui/sidebar';
import { APIDashboardSidebar } from './sidebar';

export function APIDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <APIDashboardSidebar />
      <main className="flex-1">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
