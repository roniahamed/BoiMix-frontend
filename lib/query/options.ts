import type { QueryClientConfig } from "@tanstack/react-query";

export const queryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
    mutations: {
      retry: 0,
    },
  },
} satisfies QueryClientConfig;
