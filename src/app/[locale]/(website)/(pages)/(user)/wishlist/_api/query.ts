import usePagination from "@/hooks/apiHandler/usePagination";

export const useGetWishlist = () => {
  const { data, isLoading, refetch, pagination } =
    usePagination<Product[]>("/wishlist");

  return {
    wishlist: data || [],
    isLoading,
    refetch,
    pagination,
  };
};
