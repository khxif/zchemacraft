'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AdminLoginForm } from '@zchemacraft/components/core/forms/admin-login-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@zchemacraft/components/ui/card';
import { useAdminLoginMutation } from '@zchemacraft/hooks/mutations';
import { useAuthStore } from '@zchemacraft/stores/auth-store';
import { adminLoginSchema, AdminLoginSchemaType } from '@zchemacraft/zod-schemas/admin-auth';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function AdminLogin() {
  const router = useRouter();
  const { mutateAsync } = useAdminLoginMutation();
  const authenticate = useAuthStore(state => state.authenticate);

  const form = useForm<AdminLoginSchemaType>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: AdminLoginSchemaType) {
    try {
      const data = await mutateAsync(values);
      authenticate(data.user, data.token);
      toast.success('Successfully logged in!');
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Card className="max-w-lg w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-xl md:text-2xl">Welcome Admin!</CardTitle>
        <CardDescription>Login to use the Admin Dashboard.</CardDescription>
      </CardHeader>
      <CardContent>
        <AdminLoginForm form={form} onSubmit={onSubmit} />
      </CardContent>
    </Card>
  );
}
