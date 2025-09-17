import { generateMockData, seedMockData } from '@zchemacraft/data-accessors/mock-data';
import { useMutation } from '@tanstack/react-query';

export function useGenerateMockData() {
  return useMutation({ mutationFn: generateMockData });
}

export function useSeedMockData() {
  return useMutation({ mutationFn: seedMockData });
}
