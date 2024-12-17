import usePagination from "@/hooks/apiHandler/usePagination";
import useQuery from "@/hooks/apiHandler/useQuery";

export const useGetAdminCategories = (params?: any) => {
  const { data, isLoading, refetch } = usePagination<CategoryType[]>(
    "/categories",
    {
      params: {
        fields: "name,image",
        ...params,
      },
      staleTime: "1d",
    }
  );

  return {
    categories: data || [],
    isLoading,
    refetch,
  };
};

export const useGetAdminSubCategories = (
  categoryId: string | "",
  params?: any
) => {
  const { data, isLoading } = useQuery<SubCategoryType[]>(
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
    Subcategories: data || [],
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
  } = useQuery<Product>(`/products/${productId}`, {
    params: {
      fields: "title,imageCover,description,price",
    },
    skip: !productId,
  });

  return { product, isLoading, refetchProduct };
};
