import { AxiosError } from "axios";

export type ApiError = {
  message: string;
  status?: number;
  code?: string;
  details?: unknown;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type ApiErrorPayload = {
  message?: string;
  error?: string;
  code?: string;
  details?: unknown;
};

export function normalizeApiError(error: unknown): ApiError {
  if (error instanceof AxiosError) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payload = error.response?.data as any;

    let message = "Something went wrong.";
    if (typeof payload?.message === "string") message = payload.message;
    else if (typeof payload?.error === "string") message = payload.error;
    else if (typeof payload?.error?.message === "string")
      message = payload.error.message;
    else if (error.message) message = error.message;

    return {
      message,
      status: error.response?.status,
      code: payload?.code ?? payload?.error?.code ?? error.code,
      details: payload?.details ?? payload?.error?.details ?? payload,
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
