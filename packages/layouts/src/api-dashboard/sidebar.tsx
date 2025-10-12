import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@zchemacraft/components/ui/sidebar';
import { cn } from '@zchemacraft/shared/utils';
import { Route } from '@zchemacraft/types';
import Link from 'next/link';

export function APIDashboardSidebar({ routes }: { routes: Route[] }) {
  return (
    <Sidebar >
      <SidebarHeader>
        <div className="flex space-x-4 items-center p-2">
          <h2 className="font-medium text-lg">Zchemacraft.</h2>
        </div>
      </SidebarHeader>
      <SidebarContent className="flex flex-col pt-12 px-2 space-y-2">
        {routes.map(route => (
          <SidebarMenuItem key={route.href} className="list-none">
            <Link href={route.href}>
              <SidebarMenuButton
                className={cn(
                  'py-6 flex items-center space-x-1.5 text-purple-300 hover:bg-purple-900/50',
                  route.active && 'bg-purple-900/30',
                )}
              >
                <route.icon className="size-5" />
                <p>{route.label}</p>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
