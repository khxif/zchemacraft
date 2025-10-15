import { ApiClientSchema } from '@zchemacraft/zod-schemas/api-client';
import axios from 'axios';

export const getMockApiEndpoint = async (options: ApiClientSchema) => {
  const mockApiClient = axios.create({});
  mockApiClient.defaults.headers['x-api-key'] = options.apiKey ?? '';

  const { data } = await mockApiClient.get(options.url);
  return data;
};
