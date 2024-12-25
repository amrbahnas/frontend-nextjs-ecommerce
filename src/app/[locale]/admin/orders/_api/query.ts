import usePagination from "@/hooks/apiHandler/usePagination";
import useQuery from "@/hooks/apiHandler/useQuery";

export const useAdminGetOrders = (params: {
  userName?: string;
  createdAt?: string;
}) => {
  const {
    data: orders,
    isLoading: ordersLoading,
    pagination,
    refetch,
  } = usePagination<OrderType[]>("/orders", { params });
  return {
    orders: orders || [],
    ordersLoading,
    pagination,
    refetch,
  };
};
