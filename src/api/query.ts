import { useQuery } from "../hooks/useQuery";

export const useGetProducts = (params?: any) => {
  const { data: products, isLoading } = useQuery("/products", {
    params: {
      fields: "title,price,imageCover,images",
      ...params,
    },
  });

  return { products, isLoading };
};

export const useGetCategories = (params?: any) => {
  const { data: categories, isLoading } = useQuery("/categories", {
    params,
  });

  return { categories, isLoading };
};
