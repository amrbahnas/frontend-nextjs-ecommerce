import usePagination from "@/hooks/apiHandler/usePagination";

export const useGetAdminUsers = (params?: any) => {
  const { data, isLoading } = usePagination<User[]>("/users", {
    params,
  });
  return { users: data || [], isLoading };
};
