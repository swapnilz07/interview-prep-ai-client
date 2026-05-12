import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { User } from "../types/auth.types";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, accessToken: string) => void;
  clearAuth: () => void;
  updateAccessToken: (accessToken: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      setAuth: (user, accessToken) =>
        set({ user, accessToken, isAuthenticated: true }),
      clearAuth: () =>
        set({ user: null, accessToken: null, isAuthenticated: false }),
      updateAccessToken: (accessToken) =>
        set((state) => ({
          accessToken,
          ...(state.user ? { isAuthenticated: true } : {}),
        })),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
      }),
      merge: (persisted, current) => {
        const p = persisted as Partial<AuthState> | undefined;
        const base = { ...(current as AuthState), ...p } as AuthState;
        return {
          ...base,
          isAuthenticated: !!(base.user && base.accessToken),
        };
      },
    },
  ),
);
