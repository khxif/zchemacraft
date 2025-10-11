import { apiClient, authClient } from '@zchemacraft/data-accessors/apiClient';

export const googleSignIn = async ({ token }: { token: string }) => {
  const { data } = await authClient.post(
    '/api/auth/login/google',
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return data;
};

export const getAuthMe = async () => {
  const { data } = await apiClient.get('/api/auth/me');
  return data.data;
};
