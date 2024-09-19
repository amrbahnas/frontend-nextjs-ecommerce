import useQuery from "@/hooks/useQuery";

export const useGetProducts = (params?: any) => {
  const { data: products, isLoading } = useQuery("/products", {
    params: {
      fields: "title,price,imageCover,images,colors",
      ...params,
    },
  });

  return { products, isLoading };
};

export const useGetCategories = (params?: any) => {
  const { data: categories, isLoading } = useQuery("/categories", {
    params,
    staleTime: "1d",
  });

  return { categories, isLoading };
};

export const useGetCart = ({ skip }: { skip?: boolean }) => {
  const {
    data: cart,
    isLoading,
    refetch,
  } = useQuery<CartType>("/cart", {
    skip,
  });

  return {
    cart: cart || { cartItems: [], totalCartPrice: 0 },
    isLoading,
    refetch,
  };
};

///api/cart/count

export const useGetCartCount = ({ skip }: { skip?: boolean }) => {
  const { data, isLoading, refetch } = useQuery<{ cartItemsCount: number }>(
    "/cart/count",
    {
      skip,
    }
  );

  return {
    cartItemsCount: data?.cartItemsCount || 0,
    refetchCartCount: refetch,
    isLoading,
  };
};
