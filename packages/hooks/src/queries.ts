import { useQuery } from '@tanstack/react-query';
import { getMockAPIs } from '@zchemacraft/data-accessors/mock-api';

export function useGetMockAPIs() {
  return useQuery({ queryKey: ['mock-apis'], queryFn: getMockAPIs });
}
