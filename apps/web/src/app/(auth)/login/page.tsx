'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@zchemacraft/components/ui/card';
import { Button } from '@zchemacraft/components/uibutton';
import { useGoogleSignInMutation } from '@zchemacraft/hooks/mutations';
import { useAuthStore } from '@zchemacraft/stores/auth-store';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '../../../firebase/config';
import { toast } from 'sonner';

export default function LoginPage() {
  const router = useRouter();
  const authenticate = useAuthStore(state => state.authenticate);
  const { mutateAsync } = useGoogleSignInMutation();

  async function signInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);
      const firebaseToken = await result.user.getIdToken();

      const data = await mutateAsync({ firebaseToken });
      authenticate(data.user, data.token);
      toast.success('Logged in successfully');
      router.push('/mock-api');
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Card className="max-w-lg w-full">
      <CardHeader>
        <CardTitle>Login to Continue.</CardTitle>
      </CardHeader>
      <CardContent>
        <Button className="w-full" onClick={signInWithGoogle}>
          Login with Google
        </Button>
      </CardContent>
    </Card>
  );
}
