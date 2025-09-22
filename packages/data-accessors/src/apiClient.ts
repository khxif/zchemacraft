import { tokenStore } from '@zchemacraft/stores/token-store';
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PUBLIC_API_URL || 'http://localhost:8888',
});

apiClient.interceptors.request.use(config => {
  const token = tokenStore.getToken();
  if (token) config.headers.authorization = `Bearer ${token}`;

  return config;
});
