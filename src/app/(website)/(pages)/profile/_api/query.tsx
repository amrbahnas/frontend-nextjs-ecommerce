import usePagination from "@/hooks/usePagination";
import useQuery from "@/hooks/useQuery";

export const useMe = () => {
  const { data, error, refetch, isError, isLoading } =
    useQuery<User>("/users/me");
  return {
    user: data || {},
    error,
    refetch,
    isError,
    isLoading,
  };
};

export const useGetOrders = () => {
  const { data, error, refetch, isError, isLoading, pagination } =
    usePagination<OrderType[]>("/orders", {
      pageSize: 5,
    });
  return {
    orders: isLoading ? [] : data,
    ordersError: error,
    ordersRefetch: refetch,
    ordersIsError: isError,
    ordersIsLoading: isLoading,
    pagination,
  };
};
