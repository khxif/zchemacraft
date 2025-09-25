import { getAuthMe } from '@zchemacraft/data-accessors/auth';
import { useAuthStore } from '@zchemacraft/stores/auth-store';
import { create } from 'zustand';
import { tokenStore } from './token-store';

interface BaseLayoutStore {
  isAppInitialized: boolean;
  initApp: () => void;
}

export const useBaseLayoutStore = create<BaseLayoutStore>()(set => ({
  isAppInitialized: false,
  initApp: async () => {
    try {
      const token = tokenStore.getToken();
      if (!token) {
        set({ isAppInitialized: true });
        return null;
      }

      const user = await getAuthMe();
      console.log(user);
      if (!user || !user.id) {
        set({ isAppInitialized: true });
        return null;
      }

      set({ isAppInitialized: true });
      useAuthStore.getState().authenticate(user, token);

      return user;
    } catch (error) {
      set({ isAppInitialized: true });
      tokenStore.removeToken();
      return null;
    }
  },
}));
