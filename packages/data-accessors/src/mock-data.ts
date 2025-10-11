import { apiClient } from './apiClient';

export const generateMockData = async ({ schema, type }: { schema: string; type: string }) => {
  const data = await apiClient.post(`/api/mock-data/${type.toLowerCase()}`, { schema });
  return data.data;
};

export const seedMockData = async ({
  schema,
  uri,
  type,
}: {
  schema: string;
  uri: string;
  type: string;
}) => {
  const data = await apiClient.post(`/api/mock-data/seed/${type.toLowerCase()}`, { schema, uri });
  return data.data;
};
