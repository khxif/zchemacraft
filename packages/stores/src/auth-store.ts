import { create } from 'zustand';
import { tokenStore } from './token-store';
import { User } from '@zchemacraft/types';

type AuthStore = {
  isAuthenticated: boolean;
  user: User | null;
  authenticate: (user: User, token: string) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthStore>()(set => ({
  isAuthenticated: false,
  user: null,
  authenticate: (user, token) => {
    set({ isAuthenticated: true, user });
    tokenStore.setToken(token);
  },
  clearAuth: () => {
    set({ isAuthenticated: false, user: null });
    tokenStore.removeToken();
  },
}));
