"use client";
import { useQuery as reactUseQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import axiosInstance from "../config/apiClient";
import ms from "ms";

function useQuery<T>(endpoint: string, options?: UseQueryOptionsType) {
  const queryFn = () =>
    axiosInstance
      .get(endpoint, {
        params: options?.params,
        headers: {
          Authorization: Cookies.get("token"),
        },
      })
      .then((res) => res.data);

  const { data, ...result } = reactUseQuery({
    queryKey: [endpoint, options?.params || ""],
    queryFn,
    initialData: options?.initialData,
    enabled: !Boolean(options?.skip),
    retry: options?.retry || 3,
    retryDelay: (retryCount: number) => retryCount * 2000,
    staleTime: ms(options?.staleTime || "0s"),
    refetchOnWindowFocus: options?.refetchOnWindowFocus || false,
  });
  return {
    data: data?.data as T,
    ...result,
  };
}

export default useQuery;
