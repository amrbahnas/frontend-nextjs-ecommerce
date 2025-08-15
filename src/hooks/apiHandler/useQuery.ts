"use client";
import axiosInstance from "@/config/apiClient";
import proxyAxiosInstance from "@/config/proxyClient";
import useAuthStore from "@/store/useAuthStore";
import { useQuery as reactUseQuery } from "@tanstack/react-query";
import ms from "ms";
import toast from "react-hot-toast";
import { useLogout } from "../global/useLogout";
import { useEffect } from "react";

type UseQueryOptionsType = {
  params?: ParamsType;
  skip?: boolean;
  retry?: number;
  staleTime?: string;
  refetchOnWindowFocus?: boolean;
  initialResults?: any;
  disableProxy?: boolean;
};

async function useQuery<T>(endpoint: string, options?: UseQueryOptionsType) {
  const { logout } = useLogout();
  const isLogin = useAuthStore((state) => state.isLogin);
  const instance = options?.disableProxy ? axiosInstance : proxyAxiosInstance;
  const queryFn = () =>
    instance
      .get(endpoint, {
        params: options?.params,
      })
      .then((res) => res.data);

  const { data, ...result } = reactUseQuery<any, CustomError>({
    queryKey: [endpoint, options?.params || ""],
    queryFn,

    enabled: !Boolean(options?.skip),
    initialData: options?.initialResults,
    retry: options?.retry || 2,
    retryDelay: (retryCount: number) => retryCount * 2000,
    staleTime: ms(options?.staleTime || "0s"),
    refetchOnWindowFocus: options?.refetchOnWindowFocus || false,
  });

  useEffect(() => {
    if (result.error) {
      const handleError = async () => {
        process.env.NEXT_PUBLIC_ENV === "development" &&
          toast.error(
            JSON.stringify(
              result.error.response?.data || "Internal Server Error"
            )
          );

        if (isLogin) {
          if (result.error.response?.status === 401) {
            await logout("/auth/login");
            return;
          }
          if (result.error.response?.status === 403) {
            await logout("/inactiveAccount");
            return;
          }
        }
      };
      handleError();
    }
  }, [result.error]);

  return {
    data: data?.data as T | undefined,
    ...result,
    refetch: (data?: any) => result.refetch(),
  };
}

export default useQuery;
