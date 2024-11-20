"use client";
import useAuthStore from "@/store/useAuthStore";
import { useQuery as reactUseQuery } from "@tanstack/react-query";
import ms from "ms";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axiosInstance from "../../config/apiClient";

function useQuery<T>(endpoint: string, options?: UseQueryOptionsType) {
  const route = useRouter();

  const isLogin = useAuthStore((state) => state.isLogin);
  const queryFn = () =>
    axiosInstance
      .get(endpoint, {
        params: options?.params,
        // headers: {
        //   Authorization: "Bearer " + (Cookies.get("token") || ""),
        // },
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
    process.env.NEXT_PUBLIC_ENV === "development" &&
      toast.error(result.error.response?.data || "Internal Server Error");
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
