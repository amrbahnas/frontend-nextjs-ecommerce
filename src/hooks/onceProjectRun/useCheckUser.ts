"use client";
import { useCheckMe, useMe } from "@/_api/query";
import useAuthStore from "@/store/useAuthStore";
import useUserStore from "@/store/useUserStore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useResetAppData } from "../global/useResetAppData";

const useCheckUser = () => {
  const route = useRouter();
  const pathName = usePathname();
  const isLogin = useAuthStore((state) => state.isLogin);
  const reset = useResetAppData();
  const { user, refetch, isLoading } = useCheckMe();

  useEffect(() => {
    if (!isLogin) return;
    const checkUser = async () => {
      await refetch();
      if (user._id && !isLoading) {
        if (!user.active && pathName !== "/inactiveAccount") {
          reset("/inactiveAccount");
        }
        if (!user.emailVerified && pathName !== "/verifyEmail") {
          return route.push("/verifyEmail");
        }
      }
    };

    checkUser();
  }, [pathName]);
};

export default useCheckUser;
