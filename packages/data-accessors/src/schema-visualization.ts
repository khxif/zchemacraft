import { apiClient } from './apiClient';

export async function visualizeSchema({ schema, type }: { schema: string; type: string }) {
  const { data } = await apiClient.post(`/api/visualize-schema/${type.toLowerCase()}`, { schema });
  return data;
}
