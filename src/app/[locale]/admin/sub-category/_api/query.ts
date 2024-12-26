import usePagination from "@/hooks/apiHandler/usePagination";

export const useGetAdminSubCategories = (params?: any) => {
  const { data, isLoading, refetch, pagination } = usePagination<
    SubCategoryType[]
  >(`/sub-categories/admin`, {
    params,
  });

  return {
    Subcategories: data || [],
    isLoading,
    refetch,
    pagination,
  };
};
