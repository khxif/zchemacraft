'use client';

import { useAuthStore } from '@zchemacraft/stores/auth-store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function AuthProtected({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const user = useAuthStore(state => state.user);

  useEffect(() => {
    if (!user) router.push('/login');
  }, [user, router]);

  return <>{children}</>;
}
