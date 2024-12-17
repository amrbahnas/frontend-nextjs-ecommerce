import usePagination from "@/hooks/apiHandler/usePagination";
import useQuery from "@/hooks/apiHandler/useQuery";
import useAuthStore from "@/store/useAuthStore";

export const useGetCategories = (params?: any) => {
  const { data: categories, isLoading } = usePagination<CategoryType[]>(
    "/categories",
    {
      params,
      staleTime: "1d",
    }
  );

  return { categories, isLoading };
};

export const useVerifyToken = () => {
  const isLogin = useAuthStore((state) => state.isLogin);
  const { data, isLoading, refetch, error } = useQuery<TokenPayload>(
    "/auth/verify-token",
    {
      skip: !isLogin,
    }
  );

  return { tokenData: data, isLoading, refetch, error };
};
