import useMutation from "../../hooks/useMutation";

export const useAddProductToCart = () => {
  const { mutate: addProduct, isPending } = useMutation(`/cart`);
  return {
    addProduct,
    isPending,
  };
};
