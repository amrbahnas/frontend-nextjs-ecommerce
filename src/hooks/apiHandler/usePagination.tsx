"use client";

import axiosInstance from "@/config/apiClient";
import proxyAxiosInstance from "@/config/proxyClient";
import useAuthStore from "@/store/useAuthStore";
import {
  keepPreviousData as keepPreviousDataPlaceholder,
  useQuery as reactUseQuery,
} from "@tanstack/react-query";
import ms from "ms";
import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { useLogout } from "../global/useLogout";

async function usePagination<T>(endpoint: string, options?: QueryOptionsType) {
  const { logout } = useLogout();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(options?.pageSize || 10);
  const instance = options?.disableProxy ? axiosInstance : proxyAxiosInstance;
  const prevParamsRef = useRef(options?.params);
  const isLogin = useAuthStore((state) => state.isLogin);

  useEffect(() => {
    if (
      JSON.stringify(prevParamsRef.current) !== JSON.stringify(options?.params)
    ) {
      setPage(1);
      prevParamsRef.current = options?.params;
    }
  }, [options?.params]);

  const queryFn = async () => {
    const res = await instance.get(endpoint, {
      params: {
        pageSize,
        page,
        ...options?.params,
      },
    });
    return res.data;
  };

  const { data, isLoading, ...result } = reactUseQuery<any, CustomError>({
    queryKey: [endpoint, page, options?.params || "", pageSize],
    queryFn,
    staleTime: ms(options?.staleTime || "5s"),
    retryDelay: (retryCount: number) => retryCount * 2000,
    retry: options?.retry || 3,
    initialData: options?.initialData,
    enabled: !Boolean(options?.skip),
    placeholderData: options?.keepPreviousData
      ? keepPreviousDataPlaceholder
      : undefined,
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
    pagination: {
      // current: data?.data?.pagination?.currentPage,
      current: page,
      // pageSize: data?.data?.pagination?.pageSize,
      pageSize,
      total: data?.data?.pagination?.total,
      showSizeChanger: true,
      showTotal: (total: number) => (
        <span className="font-medium">{`Total ${total} items`}</span>
      ),
      onChange: (page: number, nextPageSize?: number) => {
        if (pageSize !== nextPageSize) {
          setPageSize(nextPageSize!);
          setPage(1);
        } else {
          setPage(page);
        }
      },
    } as Pagination,
    hasMore: data?.data?.pagination?.hasMore,
    page,
    setPage,
    nextPage: () => {
      if (data?.data?.pagination?.hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    },
    data: (data?.data?.list as T) || [],
    isLoading,
    ...result,
    refetch: (data?: any) => result.refetch(),
  };
}

export default usePagination;
