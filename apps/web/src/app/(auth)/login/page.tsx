'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@zchemacraft/components/ui/card';
import { Button } from '@zchemacraft/components/uibutton';
import { useGoogleSignInMutation } from '@zchemacraft/hooks/mutations';
import { useAuthStore } from '@zchemacraft/stores/auth-store';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { auth } from '../../../firebase/config';
import { FcGoogle } from 'react-icons/fc';
import { Spinner } from '@zchemacraft/components/uispinner';

export default function LoginPage() {
  const router = useRouter();
  const authenticate = useAuthStore(state => state.authenticate);
  const { mutateAsync, isPending } = useGoogleSignInMutation();

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
      <CardHeader className="text-center">
        <CardTitle className="text-xl md:text-2xl">Welcome to Zchemacraft!</CardTitle>
        <CardDescription>Login to use the Mock API.</CardDescription>
      </CardHeader>
      <CardContent>
        {!isPending ? (
          <Button className="w-full font-medium" onClick={signInWithGoogle}>
            <FcGoogle className="mr-2 size-6" />
            <p> Login with Google</p>
          </Button>
        ) : (
          <div className='flex flex-col items-center justify-center space-y-1'>
            <Spinner />
            <p>Authenticating...</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
