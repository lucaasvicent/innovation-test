import { create } from 'zustand';

interface AuthState {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null,
  setToken: (token) => {
    localStorage.setItem('auth_token', token);
    set({ token });
  },
  clearToken: () => {
    localStorage.removeItem('auth_token');
    set({ token: null });
  },
}));