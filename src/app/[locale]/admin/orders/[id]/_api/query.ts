import useQuery from "@/hooks/apiHandler/useQuery";

export const useAdminGetOrder = (id: string) => {
  const { data, isLoading } = useQuery<OrderType>(`/orders/${id}`);
  return { order: data, isLoading };
};
