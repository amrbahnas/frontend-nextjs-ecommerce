// /product-stats/featured
// /product-stats/trending
// /product-stats/most-sold
// /product-stats/new-arrivals
// /product-stats/related/:productId
// /product-stats/top-rated

import usePagination from "@/hooks/apiHandler/usePagination";

export const useGetProductStats = (type: string) => {
  const { data, isLoading } = usePagination<Product[]>(
    `/product-stats/${type}`
  );
  return { productStats: data, isLoading };
};

export const useGetRelatedProducts = (productId: string) => {
  const { data, isLoading } = usePagination<Product[]>(
    `/product-stats/related/${productId}`
  );
  return { relatedProducts: data, isLoading };
};
