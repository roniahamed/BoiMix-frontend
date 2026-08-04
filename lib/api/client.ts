import axios, { type AxiosRequestConfig } from "axios";

import { env } from "@/lib/env";
import { normalizeApiError } from "@/lib/api/errors";

let accessToken: string | null = null;

export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15_000,
});

import { useAuthStore } from "@/stores/auth-store";

apiClient.interceptors.request.use((config) => {
  // Try to get token from local variable first (if recently set),
  // otherwise fallback to Zustand store
  const token = accessToken || useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => Promise.reject(normalizeApiError(error)),
);

export async function apiRequest<TResponse>(
  config: AxiosRequestConfig,
): Promise<TResponse> {
  const response = await apiClient.request<TResponse>(config);

  return response.data;
}

export function setApiAccessToken(token: string | null) {
  accessToken = token;
}
