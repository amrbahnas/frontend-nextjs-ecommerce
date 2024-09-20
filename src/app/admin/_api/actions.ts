import useMutation from "@/hooks/useMutation";

export const useAdminDeleteProduct = (id: string) => {
  const { mutate: deleteProduct, isPending: deleteLoading } = useMutation(
    `/products/${id}`,
    "delete"
  );
  return {
    deleteProduct,
    deleteLoading,
  };
};
