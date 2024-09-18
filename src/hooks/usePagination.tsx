"use client";
import {
  QueryClient,
  keepPreviousData,
  useQuery as reactUseQuery,
  useQueryClient,
} from "@tanstack/react-query";
import Cookies from "js-cookie";
import axiosInstance from "../config/apiClient";
import ms from "ms";
import { useEffect, useMemo, useState } from "react";

const usePagination = (
  endpoint: string,
  options?: {
    params?: Record<string, any>;
    initialData?: any;
    skip?: boolean;
    retry?: number;
  }
) => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);

  const variables = useMemo(() => {
    return {
      pageSize,
      page,
    };
  }, [page, pageSize]);

  const queryFn = () =>
    axiosInstance
      .get(endpoint, {
        params: {
          ...variables,
          ...options?.params,
        },
        headers: {
          Authorization: Cookies.get("token"),
        },
      })
      .then((res) => res.data);

  const { isPlaceholderData, data, ...result } = reactUseQuery({
    queryKey: [endpoint, page],
    queryFn,
    initialData: options?.initialData,
    staleTime: ms("5m"),
    enabled: !Boolean(options?.skip),
    retry: options?.retry || 3,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (!isPlaceholderData && data?.paginator.hasMore) {
      queryClient.prefetchQuery({
        queryKey: [endpoint, page],
        queryFn,
      });
    }
  }, [data, isPlaceholderData, variables, queryClient]);

  return {
    pagination: {
      current: data?.paginator.currentPage,
      pageSize: data?.paginator.pageSize,
      total: data?.paginator.total,
      showTotal: (total: number) => (
        <span className="font-medium">{`Total ${total} items`}</span>
      ),
      onChange: (page: number, pageSize?: number) => {
        setPage(page);
        pageSize && setPageSize(pageSize);
      },
    },
    data: data?.data,
    ...result,
  };
};

export default usePagination;
