import {
  useQuery,
  type QueryKey,
  type UseQueryOptions,
} from "@tanstack/react-query";

import { apiRequest } from "@/lib/api/client";
import type { ApiError } from "@/lib/api/errors";

type UseApiQueryConfig<TResponse> = Omit<
  UseQueryOptions<TResponse, ApiError>,
  "queryKey" | "queryFn"
> & {
  queryKey: QueryKey;
  url: string;
};

export function useApiQuery<TResponse>({
  queryKey,
  url,
  ...options
}: UseApiQueryConfig<TResponse>) {
  return useQuery<TResponse, ApiError>({
    queryKey,
    queryFn: () => apiRequest<TResponse>({ method: "GET", url }),
    ...options,
  });
}
