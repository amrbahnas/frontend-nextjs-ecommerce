"use client";
import { useLogoutApi } from "@/app/[locale]/(website)/auth/_api/mutation";
import { useResetAppData } from "./useResetAppData";

export const useLogout = () => {
  const resetData = useResetAppData();
  const { mutate, isPending } = useLogoutApi();
  const logout = (pushTo ?: string) => {
    resetData(pushTo);
    mutate({});
  };

  return {
    logout,
    isPending,
  };
};
