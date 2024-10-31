import useQuery from "@/hooks/useQuery";

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
