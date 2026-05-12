import { apiEndpoints } from "../../../shared/config/apiEndpoints";
import axiosInstance from "../../../shared/config/axiosInstance";
import {
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
} from "../types/auth.types";

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>(
      apiEndpoints.auth.login,
      credentials,
    );
    return response.data;
  },

  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>(
      apiEndpoints.auth.register,
      credentials,
    );
    return response.data;
  },

  logout: async (): Promise<void> => {
    await axiosInstance.post(apiEndpoints.auth.logout);
  },

  getMe: async () => {
    const response = await axiosInstance.get(apiEndpoints.auth.me);
    return response.data;
  },

  refreshToken: async (): Promise<{ accessToken: string }> => {
    const response = await axiosInstance.post<{
      success: boolean;
      data: { accessToken: string };
    }>(apiEndpoints.auth.refresh);
    return { accessToken: response.data.data.accessToken };
  },
};
