import useMutation from "@/hooks/apiHandler/useMutation";

export const useAddProductToCart = () => {
  const { mutate: addProduct, isPending } = useMutation(`/cart`);
  return {
    addProduct,
    isPending,
  };
};

export const useRemoveItemFromCart = (id: string) => {
  const { mutate: removeItem, isPending } = useMutation(`/cart/items/${id}`, {
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
    useMutation(`/cart/reset`);
  return {
    resetApiCart,
    resetApiCartLoading,
  };
};

export const useCardCheckout = (cartId: string) => {
  const { mutate: cardCheckout, isPending: checkoutLoading } = useMutation(
    `/payments/credit-order/${cartId}`
  );
  return {
    cardCheckout,
    checkoutLoading,
  };
};

export const useCashCheckout = (cartId: string) => {
  const { mutate: cashCheckout, isPending: cashCheckoutLoading } = useMutation(
    `/payments/cash-order/${cartId}`
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
  } = useMutation(`/cart/apply-coupon`);
  return {
    applyCoupon,
    isPending,
    error,
  };
};

export const useRemoveCoupon = () => {
  const { mutate: removeCoupon, isPending } = useMutation(
    `/cart/remove-coupon`,
    { method: "delete" }
  );
  return {
    removeCoupon,
    isPending,
  };
};

// subscribe

export const useSubscribe = () => {
  const { mutate: subscribe, isPending } = useMutation(
    `/email-subscriptions/subscribe`
  );
  return {
    subscribe,
    isPending,
  };
};
