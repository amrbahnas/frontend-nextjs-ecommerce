import usePagination from "@/hooks/apiHandler/usePagination";
import useQuery from "@/hooks/apiHandler/useQuery";

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
