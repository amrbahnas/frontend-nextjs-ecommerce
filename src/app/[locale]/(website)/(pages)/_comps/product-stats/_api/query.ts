import usePagination from "@/hooks/apiHandler/usePagination";

export const useGetProductStats = (type: string, skip?: boolean) => {
  const { data, isLoading } = usePagination<Product[]>(
    `/product-stats/${type}`,
    { skip }
  );
  return { productStats: data, isLoading };
};

export const useGetRelatedProducts = (productId: string, skip?: boolean) => {
  const { data, isLoading } = usePagination<Product[]>(
    `/product-stats/related/${productId}`,
    { skip }
  );
  return { relatedProducts: data, isLoading };
};
