import usePagination from "@/hooks/apiHandler/usePagination";

export const useGetAdminSubCategories = (params?: any) => {
  console.log("🚀 ~ file: query.ts:4 ~ params:", params);
  const { data, isLoading, refetch } = usePagination<SubCategoryType[]>(
    `/sub-categories`,
    {
      params,
    }
  );

  return {
    Subcategories: data || [],
    isLoading,
    refetch,
  };
};
