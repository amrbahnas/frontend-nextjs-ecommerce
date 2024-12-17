"use client";

import axiosInstance from "@/config/apiClient";
import proxyAxiosInstance from "@/config/proxyClient";
import {
  keepPreviousData,
  useQuery as reactUseQuery,
  useQueryClient,
} from "@tanstack/react-query";
import ms from "ms";
import { useEffect, useMemo, useState } from "react";

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
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);

  const [pageSize, setPageSize] = useState(options?.pageSize || 10);
  const [paginationLoading, setPaginationLoading] = useState(false);

  const variables = useMemo(() => {
    return {
      pageSize,
      page,
    };
  }, [page, pageSize]);

  const queryFn = async () => {
    const instance = options?.disableProxy ? axiosInstance : proxyAxiosInstance;
    setPaginationLoading(true);
    const res = await instance.get(endpoint, {
      params: {
        ...variables,
        ...options?.params,
      },
    });
    setPaginationLoading(false);
    return res.data;
  };

  const commonQuerySettings = {
    queryKey: [endpoint, page],
    queryFn,
    staleTime: ms(options?.staleTime || "5m"),
    retryDelay: (retryCount: number) => retryCount * 2000,
    retry: options?.retry || 3,
    initialData: options?.initialData,
  };

  const { isPlaceholderData, data, isLoading, ...result } = reactUseQuery({
    ...commonQuerySettings,
    enabled: !Boolean(options?.skip),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: options?.refetchOnWindowFocus || false,
  });

  useEffect(() => {
    if (!isPlaceholderData && data?.data?.paginator?.hasMore) {
      queryClient.prefetchQuery(commonQuerySettings);
    }
  }, [data, isPlaceholderData, variables, queryClient]);

  return {
    pagination: {
      current: data?.data?.paginator?.currentPage,
      pageSize: data?.data?.paginator?.pageSize,
      total: data?.data?.paginator?.total,
      showTotal: (total: number) => (
        <span className="font-medium">{`Total ${total} items`}</span>
      ),
      onChange: (page: number, pageSize?: number) => {
        setPage(page);
        pageSize && setPageSize(pageSize);
      },
    },
    data: (data?.data?.list as T) || [],
    isLoading: isLoading || paginationLoading,
    ...result,
  };
}

export default usePagination;
