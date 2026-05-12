import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../stores/authStore";
import { authApi } from "../services/authApi";

export const useAuthInit = () => {
  const [authReady, setAuthReady] = useState(false);
  const setAuth = useAuthStore((s) => s.setAuth);
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const accessToken = useAuthStore((s) => s.accessToken);

  const { data, isError, isSuccess } = useQuery({
    queryKey: ["authInit"],
    queryFn: () => authApi.getMe(),
    retry: false,
    staleTime: Infinity,
    enabled: !!accessToken,
  });

  useEffect(() => {
    if (!accessToken) {
      setAuthReady(true);
      return;
    }

    if (isError) {
      clearAuth();
      setAuthReady(true);
      return;
    }

    if (isSuccess) {
      if (data?.data?.user) {
        setAuth(data.data.user, accessToken);
      } else {
        clearAuth();
      }
      setAuthReady(true);
    }
  }, [accessToken, isError, isSuccess, data, clearAuth, setAuth]);

  return { authReady };
};

