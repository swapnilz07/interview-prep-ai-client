import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "../services/authApi";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";
import { messageFromResponseData } from "../../../shared/utils/errorUtils";

export const useLogout = () => {
  const navigate = useNavigate();
  const { clearAuth } = useAuthStore();

  const logoutMutation = useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      clearAuth();
      navigate("/login");
      toast.success("Logged out successfully");
    },
    onError: (error: unknown) => {
      let msg: string | undefined;
      clearAuth();
      if (isAxiosError(error)) {
        msg = messageFromResponseData(error.response?.data) ?? error.message;
      } else if (error instanceof Error) {
        msg = error.message;
      }
      toast.error(msg || "Logout failed");
    },
  });

  return logoutMutation;
};
