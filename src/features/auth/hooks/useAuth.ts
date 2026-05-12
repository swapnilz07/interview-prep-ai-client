import { useAuthStore } from "../stores/authStore";

export const useAuth = () => {
  const { user, isAuthenticated, clearAuth } = useAuthStore();

  return {
    user,
    isAuthenticated,
    logout: clearAuth,
  };
};
