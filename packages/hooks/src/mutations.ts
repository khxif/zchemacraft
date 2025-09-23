import { useMutation } from '@tanstack/react-query';
import { googleSignIn } from '@zchemacraft/data-accessors/auth';
import { createMockAPI } from '@zchemacraft/data-accessors/mock-api';
import { generateMockData, seedMockData } from '@zchemacraft/data-accessors/mock-data';

export function useGenerateMockData() {
  return useMutation({ mutationFn: generateMockData });
}

export function useSeedMockData() {
  return useMutation({ mutationFn: seedMockData });
}

export function useGoogleSignInMutation() {
  return useMutation({ mutationFn: googleSignIn });
}

export function useCreateMockAPIMutation() {
  return useMutation({ mutationFn: createMockAPI });
}
