import usePagination from "@/hooks/apiHandler/usePagination";
import useQuery from "@/hooks/apiHandler/useQuery";
import useAuthStore from "@/store/useAuthStore";

export const useMe = () => {
  const { data, error, refetch, isError, isLoading } =
    useQuery<User>("/users/me");
  return {
    user: data || ({} as User),
    error,
    refetch,
    isError,
    isLoading,
  };
};

export const useGetProducts = (params?: any) => {
  const { data, isLoading } = usePagination<Product[]>("/products", {
    params: {
      fields:
        "title,price,imageCover,images,colors,description,status,availableSizes,quantity,ratingsAverage,status",
      ...params,
    },
  });

  return { products: (data || []) as Product[], isLoading };
};

export const useGetCart = () => {
  const isLogin = useAuthStore((state) => state.isLogin);

  const { data, isLoading, refetch } = useQuery<CartType>("/carts", {
    skip: !isLogin,
  });

  return {
    cart: data || { cartItems: [], totalCartPrice: 0 },
    isLoading,
    refetch,
  };
};

export const useGetCartCount = ({ skip }: { skip?: boolean }) => {
  const { data, isLoading, refetch } = useQuery<number>("/carts/count", {
    skip,
  });

  return {
    cartItemsCount: (data || 0) as number,
    refetchCartCount: refetch,
    isLoading,
  };
};
