import usePagination from "@/hooks/usePagination";
import useQuery from "@/hooks/useQuery";

export const useMe = () => {
  const { data, error, refetch, isError, isLoading } = useQuery("/users/me");
  return {
    user: isLoading ? {} : data,
    error,
    refetch,
    isError,
    isLoading,
  };
};

export const useGetOrders = () => {
  const { data, error, refetch, isError, isLoading, pagination } =
    usePagination<OrderType[]>("/orders");
  return {
    orders: isLoading ? [] : data,
    ordersError: error,
    ordersRefetch: refetch,
    ordersIsError: isError,
    ordersIsLoading: isLoading,
    pagination,
  };
};
