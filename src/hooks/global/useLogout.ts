"use client";
import { useLogoutApi } from "@/app/(website)/(auth-pages)/_api/mutation";
import { useResetAppData } from "./useResetAppData";

export const useLogout = () => {
  const resetData = useResetAppData();
  const { mutate, isPending } = useLogoutApi();
  const logout = (customRoute = "/") => {
    resetData(customRoute);
    mutate({});
  };

  return {
    logout,
    isPending,
  };
};
