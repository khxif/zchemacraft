import { apiClient } from '@zchemacraft/data-accessors/apiClient';

export const googleSignIn = async ({ firebaseToken }: { firebaseToken: string }) => {
  const { data } = await apiClient.post(
    '/api/auth/login/google',
    {},
    {
      headers: { Authorization: `Bearer ${firebaseToken}` },
    },
  );
  return data;
};

export const getAuthMe = async () => {
  const { data } = await apiClient.get('/api/auth/me');
  return data;
};
