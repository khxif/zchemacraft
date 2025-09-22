import { useMutation } from '@tanstack/react-query';
import { generateMockData, seedMockData } from '@zchemacraft/data-accessors/mock-data';
import { googleSignIn } from '@zchemacraft/data-accessors/auth';

export function useGenerateMockData() {
  return useMutation({ mutationFn: generateMockData });
}

export function useSeedMockData() {
  return useMutation({ mutationFn: seedMockData });
}

export const useGoogleSignInMutation = () => {
  return useMutation({ mutationFn: googleSignIn });
};
