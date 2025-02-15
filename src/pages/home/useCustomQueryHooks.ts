import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { ReactNode } from "react";

interface useCustomQueryhookProps<T> {
  queryKey: QueryKey;
  queryFn: () => Promise<T>;
  SkeletonComponent?: ReactNode;
  errorMessage?: string;
  options?: UseQueryOptions<T>;
}
export const useCustomQueryhook = <T>({
  queryKey,
  queryFn,
  SkeletonComponent,
  errorMessage,
  options
}: useCustomQueryhookProps<T>) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: queryKey,
    queryFn: queryFn,
    ...options
  });
  if (isError) {
    console.error(error);
  }
  return {
    data,
    errorMessage: isError ? errorMessage : null,
    SkeletonUI: isLoading ? SkeletonComponent : null
  };
};
