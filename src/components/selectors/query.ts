import usePagination from "@/hooks/apiHandler/usePagination";

export const useGetCategories = (params?: any) => {
  const { data: categories, isLoading } = usePagination<CategoryType[]>(
    "/categories",
    {
      params,
      staleTime: "1d",
    }
  );

  return { categories: categories || [], isLoading };
};
