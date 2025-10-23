import { apiClient } from './apiClient';

export async function getDashboardOverview() {
  const data = await apiClient.get('/api/admin/overview');
  return data.data;
}
