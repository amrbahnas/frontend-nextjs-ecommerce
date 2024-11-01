"use client";
import { useQuery as reactUseQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import axiosInstance from "../config/apiClient";
import ms from "ms";
import { toast } from "react-toastify";
import { useLogout } from "./useLogout";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

function useQuery<T>(endpoint: string, options?: UseQueryOptionsType) {
  const route = useRouter();
  const isLogin = useAuthStore((state) => state.isLogin);
  const queryFn = () =>
    axiosInstance
      .get(endpoint, {
        params: options?.params,
        headers: {
          Authorization: "Bearer " + (Cookies.get("token") || ""),
        },
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

  if (result.error) {
    toast.error(result.error.response.data || "Internal server error");
    if (result.error.response?.status === 401 && isLogin) {
      route.push("/auth/login");
    }
  }

  return {
    data: data?.data as T,
    ...result,
  };
}

export default useQuery;
