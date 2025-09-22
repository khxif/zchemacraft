import { apiClient } from '@zchemacraft/data-accessors/apiClient';

export const googleSignIn = async () => {
  const { data } = await apiClient.post('/api/auth/login/google');
  return data;
};

export const getAuthMe = async () => {
  const { data } = await apiClient.get('/api/auth/me');
  console.log(data)
  return data;
};
