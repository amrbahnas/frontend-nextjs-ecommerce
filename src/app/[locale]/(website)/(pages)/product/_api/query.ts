import usePagination from "@/hooks/apiHandler/usePagination";
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
    product: (data || {}) as Product,
    error,
    refetch,
    isError,
    isLoading,
  };
};

export const useGetProductReviews = (id: string, skip?: boolean) => {
  const { data, error, refetch, isError, isLoading, pagination } =
    usePagination<ReviewType[]>(`/products/${id}/reviews`, {
      skip: !id || skip,
      params: {
        sort: "-createdAt",
      },
    });
  return {
    reviews: (data || []) as ReviewType[],
    error,
    refetch,
    isError,
    isLoading,
    pagination,
  };
};
