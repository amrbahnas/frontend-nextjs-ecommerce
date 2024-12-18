import useMutation from "@/hooks/apiHandler/useMutation";

export const useAdminDeleteProduct = (id: string) => {
  const { mutate: deleteProduct, isPending: deleteLoading } = useMutation(
    `/products/${id}`,
    { method: "delete" }
  );
  return {
    deleteProduct,
    deleteLoading,
  };
};

// create product
export const useAdminCreateProduct = () => {
  const { mutate: createProduct, isPending: createLoading } = useMutation(
    "/products",
    { method: "post" }
  );
  return {
    createProduct,
    createLoading,
  };
};

// edit product
export const useAdminEditProduct = (id: string | undefined) => {
  const { mutate: editProduct, isPending: editLoading } = useMutation(
    "/products/" + id,
    { method: "patch" }
  );
  return {
    editProduct,
    editLoading,
  };
};
