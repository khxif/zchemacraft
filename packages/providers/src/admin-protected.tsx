'use client';

import { useAuthStore } from '@zchemacraft/stores/auth-store';
import { useRouter } from 'next/navigation';
import { useLayoutEffect } from 'react';

export function AdminProtected({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const user = useAuthStore(state => state.user);

  useLayoutEffect(() => {
    if (!user || user.role !== 'admin') router.push('/auth/login');
  }, [user, router]);

  return children;
}
