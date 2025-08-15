import { useInfiniteQuery as reactUseInfiniteQuery } from "@tanstack/react-query";
import ms from "ms";
import { useLogout } from "../global/useLogout";
import axiosInstance from "@/config/apiClient";
import proxyAxiosInstance from "@/config/proxyClient";
import { useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import useAuthStore from "@/store/useAuthStore";

// ex:usage
// export const useGetCalibrationCertificated = (id: string) => {
//   const { data, isLoading, error } = useInfiniteQuery(
//     `/calibrations/${id}/certificates`
//   );
//   return { certificates: data as CertificateType[] ||[], isLoading,error };
// };

function useInfiniteQuery<T>(endpoint: string, options?: QueryOptionsType) {
  const { logout } = useLogout();
  const isLogin = useAuthStore((state) => state.isLogin);
  const instance = options?.disableProxy ? axiosInstance : proxyAxiosInstance;
  const pageSize = options?.pageSize || 12;

  const fetchPage = async ({ pageParam = 1 }: any) => {
    const res = await instance.get(endpoint, {
      params: {
        pageSize,
        page: pageParam,
        ...options?.params,
      },
    });
    return res.data;
  };

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    ...result
  } = reactUseInfiniteQuery<any, CustomError>({
    queryKey: [endpoint, options?.params || "", pageSize],
    queryFn: fetchPage,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const pagination = lastPage?.data?.pagination;
      if (pagination?.currentPage < pagination?.totalPages) {
        return pagination.currentPage + 1;
      }
      return undefined;
    },
    staleTime: ms(options?.staleTime || "5s"),
    retryDelay: (retryCount: number) => retryCount * 2000,
    retry: options?.retry || 3,
    initialData: options?.initialData,
    enabled: !Boolean(options?.skip),
    refetchOnWindowFocus: options?.refetchOnWindowFocus || false,
  });

  useEffect(() => {
    if (error) {
      const handleError = async () => {
        process.env.NEXT_PUBLIC_ENV === "development" &&
          toast.error(
            JSON.stringify(error.response?.data || "Internal Server Error")
          );

        if (isLogin) {
          if (error.response?.status === 401) {
            await logout("/auth/login");
            return;
          }
          if (error.response?.status === 403) {
            await logout("/inactiveAccount");
            return;
          }
        }
      };
      handleError();
    }
  }, [error]);

  // Flatten the pages data for easier consumption
  const lists = useMemo(() => {
    const items = data?.pages?.flatMap((page) => page.data?.list) || [];
    return options?.reverse ? items.reverse() : items;
  }, [data, options?.reverse]);

  // Get pagination info from the latest page
  const pagination = useMemo(() => {
    const latestPage = data?.pages[data.pages.length - 1];
    const pagination = latestPage?.data?.pagination;
    return pagination;
  }, [data]);

  return {
    data: (lists || []) as T,
    pagination: {
      current: pagination?.current,
      pageSize: pagination?.pageSize,
      total: pagination?.total,
      hasMore: hasNextPage,
      fetchNextPage,
      isFetchingNextPage,
    } as InfinitePaginationType,
    error,
    isLoading,
    refetch,
    ...result,
  };
}

export default useInfiniteQuery;
