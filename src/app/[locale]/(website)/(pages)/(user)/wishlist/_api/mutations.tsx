import useMutation from "@/hooks/apiHandler/useMutation";

export const useResetWishlist = () => {
  const {
    mutate: resetWishlist,
    isPending,
    error,
  } = useMutation("/users/reset-wishlist");

  return {
    resetWishlist,
    isPending,
    error,
  };
};
