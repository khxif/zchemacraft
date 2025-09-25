import { MockAPISchemaType } from '@zchemacraft/zod-schemas/mock-api';
import { apiClient } from './apiClient';

export const getMockAPIs = async () => {
  const { data } = await apiClient.get('/api/mock-api');
  return data.data;
};

export const createMockAPI = async (body: MockAPISchemaType) => {
  const { data } = await apiClient.post('/api/mock-api', body);
  return data;
};

export const deleteMockAPI = async (id: number) => {
  const { data } = await apiClient.delete(`/api/mock-api/${id}`);
  return data;
};
