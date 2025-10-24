'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@zchemacraft/components/ui/card';
import { Button } from '@zchemacraft/components/ui/button';
import { FcGoogle } from 'react-icons/fc';
import { supabase } from '../../../../supabase/client';

export default function LoginPage() {
  async function signInWithGoogle() {
    try {
      const { data } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      console.log(data);
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
        <Button className="w-full font-medium" onClick={signInWithGoogle}>
          <FcGoogle className="mr-2 size-6" />
          <p> Login with Google</p>
        </Button>
      </CardContent>
    </Card>
  );
}
