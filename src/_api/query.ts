import useInfiniteQuery from "@/hooks/apiHandler/useInfiniteQuery";
import usePagination from "@/hooks/apiHandler/usePagination";
import useQuery from "@/hooks/apiHandler/useQuery";
import useAuthStore from "@/store/useAuthStore";
import { cartDataPlaceholder } from "@/utils/responsePlaceholder";

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
  const { data, isLoading, pagination } = useInfiniteQuery<Product[]>(
    "/products",
    {
      params: {
        fields:
          "title,price,imageCover,images,colors,description,status,availableSizes,quantity,ratingsAverage,status",
        ...params,
      },
    }
  );

  return { products: (data || []) as Product[], isLoading, pagination };
};

export const useGetCart = ({ skip }: { skip?: boolean }) => {
  const isLogin = useAuthStore((state) => state.isLogin);

  const { data, isLoading, refetch } = useQuery<CartType>("/cart", {
    skip: !isLogin || skip,
  });

  return {
    cart: data || cartDataPlaceholder,
    isLoading,
    refetch,
  };
};

export const useGetCartCount = ({ skip }: { skip?: boolean }) => {
  const { data, isLoading, refetch } = useQuery<number>("/cart/count", {
    skip,
  });

  return {
    cartItemsCount: (data || 0) as number,
    refetchCartCount: refetch,
    isLoading,
  };
};
