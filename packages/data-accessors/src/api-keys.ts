import { ApiKeySchemaType } from '@zchemacraft/zod-schemas/api-key';
import { apiClient } from './apiClient';

export async function createApiKey(body: ApiKeySchemaType) {
  const { data } = await apiClient.post('/api/api-keys', body);
  return data;
}
