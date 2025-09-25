import { useQuery } from '@tanstack/react-query';
import { getApiKeys } from '@zchemacraft/data-accessors/api-keys';
import { getMockAPIs } from '@zchemacraft/data-accessors/mock-api';

export function useGetMockAPIs() {
  return useQuery({ queryKey: ['mock-apis'], queryFn: getMockAPIs });
}

export function useGetAPIkeys() {
  return useQuery({ queryKey: ['api-keys'], queryFn: getApiKeys });
}
