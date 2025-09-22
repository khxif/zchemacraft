import { apiClient } from '@zchemacraft/data-accessors/apiClient';

export const googleSignIn = async () => {
  const { data } = await apiClient.post('/api/auth/login/google');
  return data;
};
