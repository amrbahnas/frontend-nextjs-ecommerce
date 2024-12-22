import usePagination from "@/hooks/apiHandler/usePagination";
import useQuery from "@/hooks/apiHandler/useQuery";

export const useGetSpecificOrder = (id: string) => {
  const { data, error, refetch, isError, isLoading } = useQuery<OrderType>(
    `/orders/${id}`,
    {
      skip: !id,
    }
  );
  return {
    order: (data || {}) as OrderType,
    error,
    refetch,
    isError,
    isLoading,
  };
};
export const useGetAllOrders = () => {
  const { data, error, refetch, isError, isLoading } =
    usePagination<OrderType[]>(`/orders`);
  return {
    orders: (data || []) as OrderType[],
    error,
    refetch,
    isError,
    isLoading,
  };
};
