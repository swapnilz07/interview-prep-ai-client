import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { authApi } from "../services/authApi";
import { useAuthStore } from "../stores/authStore";
import type { LoginCredentials } from "../types/auth.types";

import { messageFromResponseData } from "../../../shared/utils/errorUtils";


export const useLogin = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),
    onSuccess: (data) => {
      if (data.success && data.data) {
        setAuth(data.data.user, data.data.accessToken);
        toast.success("Login successful!");
        navigate("/dashboard");
      }
    },
    onError: (error: unknown) => {
      let msg: string | undefined;
      if (isAxiosError(error)) {
        msg = messageFromResponseData(error.response?.data) ?? error.message;
      } else if (error instanceof Error) {
        msg = error.message;
      }
      toast.error(msg || "Login failed");
    },
  });
};
