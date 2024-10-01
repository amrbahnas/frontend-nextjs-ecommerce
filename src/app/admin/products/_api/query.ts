import useQuery from "@/hooks/useQuery";

export const useGetAdminCategories = (params?: any) => {
  const { data: categories, isLoading } = useQuery<CategoryType[]>(
    "/categories",
    {
      params: {
        fields: "name",
        ...params,
      },
      staleTime: "1d",
    }
  );

  return { categories: categories || [], isLoading };
};

export const useGetAdminSubCategories = (
  categoryId: string | "",
  params?: any
) => {
  const { data: Subcategories, isLoading } = useQuery<SubCategoryType[]>(
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

  return { Subcategories: Subcategories || [], isLoading };
};

export const useGetAdminProducts = (params?: any) => {
  const {
    data: products,
    isLoading,
    refetch: refetchProduct,
  } = useQuery<Product[]>("/products", {
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
  } = useQuery<Product>(`/products/${productId}`, {
    params: {
      fields: "title,imageCover,description,price",
    },
    skip: !productId,
  });

  return { product, isLoading, refetchProduct };
};
