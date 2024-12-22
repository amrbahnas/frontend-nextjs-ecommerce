import usePagination from "@/hooks/apiHandler/usePagination";
import useQuery from "@/hooks/apiHandler/useQuery";

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
export const useGetAddresses = () => {
  const { data, error, refetch, isError, isLoading, pagination } =
    usePagination<AddressType[]>("/addresses", {
      pageSize: 5,
    });
  return {
    addresses: isLoading ? [] : data,
    addressesError: error,
    addressesRefetch: refetch,
    addressesIsError: isError,
    addressesIsLoading: isLoading,
    pagination,
  };
};
