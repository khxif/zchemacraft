import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@zchemacraft/components/ui/sidebar';
import { cn } from '@zchemacraft/shared/utils';
import { Route } from '@zchemacraft/types';
import Link from 'next/link';

export function AdminSidebar({ routes }: { routes: Route[] }) {
  return (
    <Sidebar>
      <SidebarHeader>Admin</SidebarHeader>
      <SidebarContent className="px-2">
        {routes.map(route => (
          <SidebarMenuItem key={route.href}>
            <Link href={route.href}>
              <SidebarMenuButton
                className={cn(
                  'py-6 flex items-center space-x-1.5 hover:text-white hover:bg-primary/50 px-4 mt-14',
                  route.active && 'bg-primary/30',
                )}
              >
                <route.icon className="size-5" />
                <p>{route.label}</p>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}
