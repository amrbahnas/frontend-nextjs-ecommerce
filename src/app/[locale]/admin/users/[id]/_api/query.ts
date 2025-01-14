//users/id
import useQuery from "@/hooks/apiHandler/useQuery";

export const useGetAdminUserReport = (id: string | undefined) => {
  const { data, isLoading, refetch } = useQuery<UserReportType>(
    `/users/${id}`,
    {
      skip: !id,
    }
  );
  return { userReport: data, isLoading, refetch };
};
