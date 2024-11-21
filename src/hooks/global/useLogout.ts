"use client";
import { useLogoutApi } from "@/app/(website)/auth/_api/mutation";
import { useResetAppData } from "./useResetAppData";

export const useLogout = (customRoute?: string) => {
  const resetData = useResetAppData(customRoute);
  const { mutate, isPending } = useLogoutApi();
  const logout = () => {
    resetData();
    mutate({});
  };

  return {
    logout,
    isPending,
  };
};
