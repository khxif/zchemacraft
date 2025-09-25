import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuItem
} from '@zchemacraft/components/ui/sidebar';
import Link from 'next/link';

export function APIDashboardSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>Logo</SidebarHeader>
      <SidebarContent>
        <SidebarMenuItem>
          <Link href="/mock-api">Mock APIs</Link>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <Link href="/api-keys">API Keys</Link>
        </SidebarMenuItem>
      </SidebarContent>
      <SidebarFooter>footer</SidebarFooter>
    </Sidebar>
  );
}
