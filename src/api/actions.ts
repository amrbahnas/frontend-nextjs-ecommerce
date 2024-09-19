import useMutation from "../hooks/useMutation";

export const useAddProductToCart = () => {
  const { mutate: addProduct, isPending } = useMutation(`/cart`);
  return {
    addProduct,
    isPending,
  };
};

export const useRemoveItemFromCart = (id: string) => {
  const { mutate: removeItem, isPending } = useMutation(
    `/cart/${id}`,
    "delete"
  );
  return {
    removeItem,
    isPending,
  };
};

// reset cart

export const useResetCart = () => {
  const { mutate: resetCart, isPending } = useMutation(`/cart/reset`);
  return {
    resetCart,
    isPending,
  };
};
