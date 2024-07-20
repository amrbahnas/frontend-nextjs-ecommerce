import { useQuery } from "../../../../hooks/useQuery";

export const useGetSpecificProduct = (id: string) => {
  const { data, error, refetch, isError, isLoading } = useQuery(
    `/products/${id}`,
    {
      skip: !id,
    }
  );
  return {
    product: data || {},
    error,
    refetch,
    isError,
    isLoading,
  };
};

export const useGetProductReviews = (id: string) => {
  const { data, error, refetch, isError, isLoading } = useQuery(
    `/products/${id}/reviews`,
    {
      skip: !id,
    }
  );
  return {
    reviews: data || [],
    error,
    refetch,
    isError,
    isLoading,
  };
};
