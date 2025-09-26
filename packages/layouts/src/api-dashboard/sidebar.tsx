import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@zchemacraft/components/ui/sidebar';
import { GitPullRequestDraftIcon, KeyRoundIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function APIDashboardSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex space-x-4 items-center">
          <Image src="/logo2.png" alt="Logo" width={100} height={150} className="w-10 h-10" />
          <h2 className="font-medium text-lg">Zchemacraft</h2>
        </div>
      </SidebarHeader>
      <SidebarContent className="flex flex-col space-y- pt-12">
        <SidebarMenuItem>
          <Link href="/mock-api">
            <SidebarMenuButton className="py-6 flex items-center space-x-1.5">
              <GitPullRequestDraftIcon className="rotate-90 size-5" />
              <p>Mock APIs</p>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <Link href="/api-keys">
            <SidebarMenuButton className="py-6 flex items-center space-x-1.5">
              <KeyRoundIcon className="size-5" />
              <p>API Keys</p>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      </SidebarContent>
    </Sidebar>
  );
}
