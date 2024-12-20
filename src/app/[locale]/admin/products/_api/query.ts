import usePagination from "@/hooks/apiHandler/usePagination";
import useQuery from "@/hooks/apiHandler/useQuery";

export const useGetAdminProducts = (params?: any) => {
  const {
    data: products,
    isLoading,
    refetch: refetchProduct,
    pagination,
  } = usePagination<Product[]>("/products", {
    params: {
      fields: "title,imageCover,description,price",
      ...params,
    },
  });

  return { products: products || [], isLoading, refetchProduct, pagination };
};

export const useGetAdminProduct = (productId: string | undefined) => {
  const {
    data: product,
    isLoading,
    refetch: refetchProduct,
  } = useQuery<Product>(`/products/${productId}`, {
    params: {
      fields: "title,imageCover,description,price",
    },
    skip: !productId,
  });

  return { product, isLoading, refetchProduct };
};
