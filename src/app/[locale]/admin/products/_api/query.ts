import usePagination from "@/hooks/apiHandler/usePagination";
import useQuery from "@/hooks/apiHandler/useQuery";

export const useGetAdminCategories = (params?: any) => {
  const { data, isLoading, refetch } = useQuery("/categories", {
    params: {
      fields: "name,image",
      ...params,
    },
    staleTime: "1d",
  });

  return {
    categories: (data?.categories || []) as CategoryType[],
    isLoading,
    refetch,
  };
};

export const useGetAdminSubCategories = (
  categoryId: string | "",
  params?: any
) => {
  const { data, isLoading } = useQuery(
    `/categories/${categoryId}/subCategories`,
    {
      params: {
        fields: "name",
        ...params,
      },
      skip: !categoryId,
      staleTime: "1d",
    }
  );

  return {
    Subcategories: (data.Subcategories || []) as SubCategoryType[],
    isLoading,
  };
};

export const useGetAdminProducts = (params?: any) => {
  const {
    data: products,
    isLoading,
    refetch: refetchProduct,
  } = usePagination<Product[]>("/products", {
    params: {
      fields: "title,imageCover,description,price",
      ...params,
    },
  });

  return { products: products || [], isLoading, refetchProduct };
};

export const useGetAdminProduct = (productId: string | undefined) => {
  const {
    data: product,
    isLoading,
    refetch: refetchProduct,
  } = useQuery(`/products/${productId}`, {
    params: {
      fields: "title,imageCover,description,price",
    },
    skip: !productId,
  });

  return { product: product as Product, isLoading, refetchProduct };
};
