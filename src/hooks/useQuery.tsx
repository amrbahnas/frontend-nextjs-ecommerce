"use client";
import { useQuery as reactUseQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import axiosInstance from "../config/apiClient";

const useQuery = (
  endpoint: string,
  options?: {
    params?: Record<string, any>;
    initialData?: any;
    skip?: boolean;
    retry?: number;
    staleTime?: string;
  }
) => {
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
    queryKey: [endpoint, options?.params],
    queryFn,
    initialData: options?.initialData,
    enabled: !Boolean(options?.skip),
    retry: options?.retry || 3,
  });
  return {
    data: data?.data,
    ...result,
  };
};

export default useQuery;
