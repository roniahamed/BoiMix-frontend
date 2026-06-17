import { AxiosError } from "axios";

export type ApiError = {
  message: string;
  status?: number;
  code?: string;
  details?: unknown;
};

type ApiErrorPayload = {
  message?: string;
  error?: string;
  code?: string;
  details?: unknown;
};

export function normalizeApiError(error: unknown): ApiError {
  if (error instanceof AxiosError) {
    const payload = error.response?.data as ApiErrorPayload | undefined;

    return {
      message:
        payload?.message ??
        payload?.error ??
        error.message ??
        "Something went wrong.",
      status: error.response?.status,
      code: payload?.code ?? error.code,
      details: payload?.details ?? error.response?.data,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
    };
  }

  return {
    message: "Something went wrong.",
    details: error,
  };
}
