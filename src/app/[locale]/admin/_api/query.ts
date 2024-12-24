import usePagination from "@/hooks/apiHandler/usePagination";
import useQuery from "@/hooks/apiHandler/useQuery";

export const useGetAdminCategories = (params?: any) => {
  const { data, isLoading, refetch, pagination } = usePagination<
    CategoryType[]
  >("/categories", {
    params: {
      fields: "name,image",
      ...params,
    },
    staleTime: "1d",
  });

  return {
    categories: data || [],
    isLoading,
    refetch,
    pagination,
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

export const useGetAdminStats = () => {
  const { data, isLoading } = useQuery<DashboardStatsType>("/stats/dashboard");
  return { stats: data, isLoading };
};

//revenue
export const useGetAdminRevenue = () => {
  const { data, isLoading } = useQuery<RevenueStatsType[]>("/stats/revenue");
  return { revenue: data || [], isLoading };
};

export const useGetStatsProduct = (id: string | undefined) => {
  const { data, isLoading } = useQuery<ProoductStatsType>(
    `/stats/product/${id}`
  );
  return { productStats: data, isLoading };
};
