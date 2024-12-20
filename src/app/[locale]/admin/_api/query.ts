import usePagination from "@/hooks/apiHandler/usePagination";

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

export const useGetAdminSubCategoriesById = (
  categoryId: string | "",
  params?: any
) => {
  console.log("🚀 ~ file: query.ts:24 ~ categoryId:", categoryId);
  const { data, isLoading, refetch } = usePagination<SubCategoryType[]>(
    `/categories/${categoryId}/subCategories`,
    {
      params: {
        fields: "name",
        ...params,
      },
      skip: !categoryId,
    }
  );

  return {
    Subcategories: data || [],
    isLoading,
    refetch,
  };
};
