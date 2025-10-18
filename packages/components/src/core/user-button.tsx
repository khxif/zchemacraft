'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@zchemacraft/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@zchemacraft/components/ui/dropdown-menu';
import { useAuthStore } from '@zchemacraft/stores/auth-store';
import { User } from '@zchemacraft/types';
import { LogOutIcon } from 'lucide-react';

export function UserButton({ user }: { user: User }) {
  const clearAuth = useAuthStore(state => state.clearAuth);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="size-10">
          <AvatarImage src={user?.profilePicture} />
          <AvatarFallback>{user?.name}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-xs" align="end">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1.5">
            <p>{user?.name}</p>
            <p className="text-muted-foreground"> {user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={clearAuth}
          className="flex items-center justify-between cursor-pointer"
        >
          <p>Logout</p>
          <LogOutIcon className="size-4 text-red-600" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
