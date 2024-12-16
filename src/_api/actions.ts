import useMutation from "@/hooks/apiHandler/useMutation";

export const useAddProductToCart = () => {
  const { mutate: addProduct, isPending } = useMutation(`/carts`);
  return {
    addProduct,
    isPending,
  };
};

export const useRemoveItemFromCart = (id: string) => {
  const { mutate: removeItem, isPending } = useMutation(`/carts/${id}`, {
    method: "delete",
  });
  return {
    removeItem,
    isPending,
  };
};

// reset cart

export const useResetCart = () => {
  const { mutate: resetApiCart, isPending: resetApiCartLoading } =
    useMutation(`/carts/reset`);
  return {
    resetApiCart,
    resetApiCartLoading,
  };
};

export const useMergeLocalCart = () => {
  const { mutate: mergeCart, isPending } = useMutation(`/carts/mergeLocalCart`);
  return {
    mergeCart,
    isPending,
  };
};

export const useCardCheckout = (cartId: string) => {
  const { mutate: cardCheckout, isPending: checkoutLoading } = useMutation(
    `/orders/payment-page-url/${cartId}`
  );
  return {
    cardCheckout,
    checkoutLoading,
  };
};

export const useCashCheckout = (cartId: string) => {
  const { mutate: cashCheckout, isPending: cashCheckoutLoading } = useMutation(
    `/orders/${cartId}`
  );
  return {
    cashCheckout,
    cashCheckoutLoading,
  };
};

export const useToggleProductWishlist = (productId: string) => {
  const { mutate: toggleWishlist, isPending } = useMutation(
    `/wishlist/${productId}/toggle`
  );
  return {
    toggleWishlist,
    isPending,
  };
};

export const useApplyCoupon = () => {
  const {
    mutate: applyCoupon,
    isPending,
    error,
  } = useMutation(`/carts/applyCoupon`, { method: "put" });
  return {
    applyCoupon,
    isPending,
    error,
  };
};

export const useRemoveCoupon = () => {
  const { mutate: removeCoupon, isPending } = useMutation(
    `/cart/removeCoupon`,
    { method: "delete" }
  );
  return {
    removeCoupon,
    isPending,
  };
};
