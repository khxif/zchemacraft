'use client';

import { Spinner } from '@zchemacraft/components/ui/spinner';
import { useGoogleSignInMutation } from '@zchemacraft/hooks/mutations';
import { useAuthStore } from '@zchemacraft/stores/auth-store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '../../../../supabase/client';

export default function AuthCallback() {
  const router = useRouter();
  const authenticate = useAuthStore(state => state.authenticate);

  const { mutateAsync } = useGoogleSignInMutation();

  useEffect(() => {
    async function handleAuth() {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        toast.error('Authentication failed. Please try again.');
        router.push('/login');
      }

      if (!data.session) return;

      const res = await mutateAsync({ token: data.session.access_token });
      authenticate(res.user, res.token);
      router.push('/mock-api');
    }

    handleAuth();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-2">
      <Spinner />
      <p className="animate-pulse">Authenticating...</p>
    </div>
  );
}
