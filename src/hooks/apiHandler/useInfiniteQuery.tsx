import { useInfiniteQuery as reactUseInfiniteQuery } from "@tanstack/react-query";
import ms from "ms";
import { useLogout } from "../global/useLogout";
import axiosInstance from "@/config/apiClient";
import proxyAxiosInstance from "@/config/proxyClient";

// ex:usage
// export const useGetCalibrationCertificated = (id: string) => {
//   const { data, isLoading, error } = useInfiniteQuery(
//     `/calibrations/${id}/certificates`
//   );
//   return { certificates: data as CertificateType[] ||[], isLoading,error };
// };

function useInfiniteQuery<T>(
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
  const { logout } = useLogout();
  const instance = options?.disableProxy ? axiosInstance : proxyAxiosInstance;
  const pageSize = options?.pageSize || 12;

  const fetchPage = async ({ pageParam = 1 }) => {
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
  } = reactUseInfiniteQuery({
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

  //@ts-ignore
  if (error?.response?.status === 401) {
    logout();
  }

  // Flatten the pages data for easier consumption
  const flattenedData = data?.pages?.flatMap((page) => page.data?.list) || [];

  // Get pagination info from the latest page
  const latestPage = data?.pages[data.pages.length - 1];
  const pagination = latestPage?.data?.pagination;

  return {
    data: (flattenedData || []) as T,
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
