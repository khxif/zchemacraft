import { MockAPISchemaType } from '@zchemacraft/zod-schemas/mock-api';
import { apiClient } from './apiClient';

export const createMockAPI = async (body: MockAPISchemaType) => {
  const { data } = await apiClient.post('/api/mock-api', body);
  return data;
};
