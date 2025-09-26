import { useMutation } from '@tanstack/react-query';
import { createApiKey, deleteApiKey } from '@zchemacraft/data-accessors/api-keys';
import { googleSignIn } from '@zchemacraft/data-accessors/auth';
import { createMockAPI, deleteMockAPI } from '@zchemacraft/data-accessors/mock-api';
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

export function useDeleteMockAPIMutation() {
  return useMutation({ mutationFn: deleteMockAPI });
}

export const useCreateApiKeyMutation = () => {
  return useMutation({ mutationFn: createApiKey });
};

export const useDeleteApiKeyMutation = () => {
  return useMutation({ mutationFn: deleteApiKey });
};
