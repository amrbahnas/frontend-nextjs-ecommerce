import usePagination from "@/hooks/apiHandler/usePagination";
import useQuery from "@/hooks/apiHandler/useQuery";

export const useAdminGetOrders = () => {
  const {
    data: orders,
    isLoading: ordersLoading,
    pagination,
    refetch,
  } = usePagination<OrderType[]>("/orders");
  return {
    orders: orders || [],
    ordersLoading,
    pagination,
    refetch,
  };
};
