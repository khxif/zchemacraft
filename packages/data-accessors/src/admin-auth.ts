import { AdminLoginSchemaType } from '@zchemacraft/zod-schemas/admin-auth';
import { apiClient } from './apiClient';

export const adminLogin = async (body: AdminLoginSchemaType) => {
  const { data } = await apiClient.post('/api/admin/auth/login', body);
  return data;
};
