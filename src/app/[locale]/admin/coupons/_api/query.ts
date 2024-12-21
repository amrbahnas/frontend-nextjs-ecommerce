import usePagination from "@/hooks/apiHandler/usePagination";

export const useGetAdminCoupons = () => {
  const { data, isLoading, refetch, pagination } =
    usePagination<CouponType[]>("/coupons");

  return {
    coupons: (data || []) as CouponType[],
    isLoading,
    refetch,
    pagination,
  };
};
