import useInfiniteQuery from "@/hooks/apiHandler/useInfiniteQuery";

export const useGetWishlist = () => {
  const { data, isLoading, refetch, pagination } =
    useInfiniteQuery<Product[]>("/wishlist");

  return {
    wishlist: data || [],
    isLoading,
    refetch,
    pagination,
  };
};
