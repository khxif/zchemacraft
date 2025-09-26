import { ApiKeySchemaType } from '@zchemacraft/zod-schemas/api-key';
import { apiClient } from './apiClient';

export async function getApiKeys() {
  const { data } = await apiClient.get('/api/api-keys');
  return data.data;
}

export async function createApiKey(body: ApiKeySchemaType) {
  const { data } = await apiClient.post('/api/api-keys', body);
  return data;
}

export async function deleteApiKey(id: number) {
  const { data } = await apiClient.delete(`/api/api-keys/${id}`);
  return data;
}