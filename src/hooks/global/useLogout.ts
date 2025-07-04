"use client";
import { useLogoutApi } from "@/app/[locale]/(website)/auth/_api/mutation";
import { useResetAppData } from "./useResetAppData";
import toast from "react-hot-toast";

export const useLogout = () => {
  const resetData = useResetAppData();
  const { mutate, isPending } = useLogoutApi();
  const logout = (pushTo?: string) => {
    mutate(
      {},
      {
        onSuccess: () => {
          resetData(pushTo);
        },
        onError: () => {
          toast.error("Failed to logout");
        },
      }
    );
  };

  return {
    logout,
    isPending,
  };
};
