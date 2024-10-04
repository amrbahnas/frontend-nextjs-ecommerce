import useQuery from "@/hooks/useQuery";

export const useGetWishlist = () => {
  const {
    data: wishlist,
    isLoading,
    refetch,
  } = useQuery<Product[]>("/wishlist");

  return {
    wishlist: wishlist || [],
    isLoading,
    refetch,
  };
};
