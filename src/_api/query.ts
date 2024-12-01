import useQuery from "@/hooks/apiHandler/useQuery";
import useAuthStore from "@/store/useAuthStore";

export const useMe = () => {
  const { data, error, refetch, isError, isLoading } =
    useQuery<User>("/users/me");
  return {
    user: data || {},
    error,
    refetch,
    isError,
    isLoading,
  };
};
export const useCheckMe = () => {
  const { data, error, refetch, isError, isLoading } = useQuery<User>(
    "/users/me",
    {
      skip: true,
      params: {
        fields: "role,active,emailVerified",
      },
    }
  );
  return {
    user: data || {},
    error,
    refetch,
    isError,
    isLoading,
  };
};

export const useGetProducts = (params?: any) => {
  const { data: products, isLoading } = useQuery<Product[]>("/products", {
    params: {
      fields:
        "title,price,imageCover,images,colors,description,status,availableSizes,quantity,ratingsAverage,status",
      ...params,
    },
  });

  return { products: products || [], isLoading };
};

export const useGetCart = () => {
  const isLogin = useAuthStore((state) => state.isLogin);

  const {
    data: cart,
    isLoading,
    refetch,
  } = useQuery<CartType>("/cart", {
    skip: !isLogin,
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
