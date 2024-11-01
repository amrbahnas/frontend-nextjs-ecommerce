import useQuery from "@/hooks/apiHandler/useQuery";

export const useGetCategories = (params?: any) => {
  const { data: categories, isLoading } = useQuery<CategoryType[]>(
    "/categories",
    {
      params,
      staleTime: "1d",
    }
  );

  return { categories, isLoading };
};
