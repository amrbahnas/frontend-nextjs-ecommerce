"use client";

import axiosInstance from "@/config/apiClient";
import proxyAxiosInstance from "@/config/proxyClient";
import {
  keepPreviousData,
  useQuery as reactUseQuery,
} from "@tanstack/react-query";
import ms from "ms";
import { useEffect, useState, useRef } from "react";

function usePagination<T>(
  endpoint: string,
  options?: {
    params?: Record<string, any>;
    initialData?: any;
    skip?: boolean;
    retry?: number;
    refetchOnWindowFocus?: boolean;
    pageSize?: number;
    disableProxy?: boolean;
    staleTime?: string;
  }
) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(options?.pageSize || 10);
  const instance = options?.disableProxy ? axiosInstance : proxyAxiosInstance;
  const prevParamsRef = useRef(options?.params);

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

  const { data, isLoading, ...result } = reactUseQuery({
    queryKey: [endpoint, page, options?.params || "", pageSize],
    queryFn,
    staleTime: ms(options?.staleTime || "5s"),
    retryDelay: (retryCount: number) => retryCount * 2000,
    retry: options?.retry || 3,
    initialData: options?.initialData,
    enabled: !Boolean(options?.skip),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: options?.refetchOnWindowFocus || false,
  });

  return {
    pagination: {
      current: data?.data?.pagination?.currentPage,
      pageSize: data?.data?.pagination?.pageSize,
      total: data?.data?.pagination?.total,
      showSizeChanger: true,
      showTotal: (total: number) => (
        <span className="font-medium">{`Total ${total} items`}</span>
      ),
      onChange: (page: number, pageSize?: number) => {
        setPage(page);
        pageSize && setPageSize(pageSize);
      },
      onShowSizeChange: (current: number, size: number) => {
        setPage(1);
        setPageSize(size);
      },
    },
    hasMore: data?.data?.pagination?.hasMore,
    page,
    setPage,
    nextPage: () => {
      if (data?.data?.pagination?.hasMore) {
        setPage(page + 1);
      }
    },
    data: (data?.data?.list as T) || [],
    isLoading,
    ...result,
    refetch: (data?: any) => result.refetch(),
  };
}

export default usePagination;
