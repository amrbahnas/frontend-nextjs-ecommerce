import usePagination from "@/hooks/usePagination";
import useQuery from "@/hooks/useQuery";

export const useAdminGetOrders = () => {
  const {
    data: orders,
    isLoading: ordersLoading,
    pagination,
  } = usePagination<OrderType[]>("/orders");
  return {
    orders: orders || [],
    ordersLoading,
    pagination,
  };
};
