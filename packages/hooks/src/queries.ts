import { useQuery } from '@tanstack/react-query';
import { getMockApiEndpoint } from '@zchemacraft/data-accessors/api-client';
import { getApiKeys } from '@zchemacraft/data-accessors/api-keys';
import { getMockAPIs } from '@zchemacraft/data-accessors/mock-api';
import { getDashboardOverview } from '@zchemacraft/data-accessors/overview';
import { ApiClientSchema } from '@zchemacraft/zod-schemas/api-client';

export function useGetMockAPIs() {
  return useQuery({ queryKey: ['mock-apis'], queryFn: getMockAPIs });
}

export function useGetAPIkeys() {
  return useQuery({ queryKey: ['api-keys'], queryFn: getApiKeys });
}

export const useGetMockApiEndpoint = (params: ApiClientSchema) => {
  return useQuery({
    queryKey: ['mock-api-endpoint', { params }],
    queryFn: () => getMockApiEndpoint(params),
    enabled: false,
  });
};

export function useGetDashboardOverview() {
  return useQuery({ queryKey: ['overview'], queryFn: getDashboardOverview });
}
