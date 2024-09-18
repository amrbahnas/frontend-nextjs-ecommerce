import useQuery from "@/hooks/useQuery";

export const useGetSpecificOrder = (id: string) => {
  const { data, error, refetch, isError, isLoading } = useQuery(
    `/orders/${id}`,
    {
      skip: !id,
    }
  );
  return {
    order: data || {},
    error,
    refetch,
    isError,
    isLoading,
  };
};
