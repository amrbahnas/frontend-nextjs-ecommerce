import useQuery from "@/hooks/apiHandler/useQuery";
import { Sora } from "next/font/google";

export const useGetSpecificProduct = (id: any) => {
  const { data, error, refetch, isError, isLoading } = useQuery<Product>(
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
  const { data, error, refetch, isError, isLoading } = useQuery<ReviewType[]>(
    `/products/${id}/reviews`,
    {
      skip: !id,
      params: {
        sort: "-createdAt",
      },
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
