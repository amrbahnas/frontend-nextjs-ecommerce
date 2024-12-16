import useQuery from "@/hooks/apiHandler/useQuery";
import useAuthStore from "@/store/useAuthStore";

export const useMe = () => {
  const { data, error, refetch, isError, isLoading } = useQuery("/users/me");
  return {
    user: (data || {}) as User,
    error,
    refetch,
    isError,
    isLoading,
  };
};
export const useCheckMe = () => {
  const { data, error, refetch, isError, isLoading } = useQuery("/users/me", {
    skip: true,
    params: {
      fields: "role,active,emailVerified",
    },
  });
  return {
    user: (data.user || {}) as User,
    error,
    refetch,
    isError,
    isLoading,
  };
};

export const useGetProducts = (params?: any) => {
  const { data, isLoading } = useQuery("/products", {
    params: {
      fields:
        "title,price,imageCover,images,colors,description,status,availableSizes,quantity,ratingsAverage,status",
      ...params,
    },
  });

  return { products: (data?.products || []) as Product[], isLoading };
};

export const useGetCart = () => {
  const isLogin = useAuthStore((state) => state.isLogin);

  const { data, isLoading, refetch } = useQuery("/carts", {
    skip: !isLogin,
  });

  return {
    cart: (data?.cart || { cartItems: [], totalCartPrice: 0 }) as CartType,
    isLoading,
    refetch,
  };
};

export const useGetCartCount = ({ skip }: { skip?: boolean }) => {
  const { data, isLoading, refetch } = useQuery("/carts/count", {
    skip,
  });

  return {
    cartItemsCount: (data?.cartItemsCount || 0) as number,
    refetchCartCount: refetch,
    isLoading,
  };
};
