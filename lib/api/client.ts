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
  const token = accessToken || useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Track if we're currently refreshing to prevent multiple refresh calls
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}> = [];

function processQueue(error: unknown, token: string | null = null) {
  failedQueue.forEach((p) => {
    if (error) {
      p.reject(error);
    } else {
      p.resolve(token!);
    }
  });
  failedQueue = [];
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const originalRequest = (error as any)?.config;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const status = (error as any)?.response?.status;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const errorCode = (error as any)?.response?.data?.error?.code;

    // Only attempt refresh for 401 with authentication_failed, not on the refresh endpoint itself
    if (
      status === 401 &&
      errorCode === "authentication_failed" &&
      originalRequest &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/refresh")
    ) {
      if (isRefreshing) {
        // Queue up requests while refreshing
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(normalizeApiError(err)));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const store = useAuthStore.getState();
      const storedRefreshToken = store.refreshToken;

      if (!storedRefreshToken) {
        // No refresh token — log the user out
        store.clearSession();
        isRefreshing = false;
        return Promise.reject(normalizeApiError(error));
      }

      try {
        const res = await axios.post(`${env.apiBaseUrl}/auth/refresh`, {
          refresh_token: storedRefreshToken,
        });
        const newAccess: string = res.data.access_token;
        const newRefresh: string = res.data.refresh_token;

        // Update stored tokens
        accessToken = newAccess;
        store.updateTokens(newAccess, newRefresh);

        processQueue(null, newAccess);
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        useAuthStore.getState().clearSession();
        return Promise.reject(normalizeApiError(refreshError));
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(normalizeApiError(error));
  },
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
