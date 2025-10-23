'use client';

import { UserButton } from '@zchemacraft/components/core/user-button';
import { SidebarTrigger } from '@zchemacraft/components/ui/sidebar';
import { useAuthStore } from '@zchemacraft/stores/auth-store';
import { User } from '@zchemacraft/types';

export function Navbar() {
  const user = useAuthStore(state => state.user);

  return (
    <nav className='flex items-center justify-between p-4'>
      <SidebarTrigger />
      <UserButton user={user as User} />
    </nav>
  );
}
