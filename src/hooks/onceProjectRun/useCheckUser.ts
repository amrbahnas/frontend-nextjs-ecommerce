"use client";
import { useMe } from "@/_api/query";
import useAuthStore from "@/store/useAuthStore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const useCheckUser = () => {
  const route = useRouter();
  const pathName = usePathname();
  const isLogin = useAuthStore((state) => state.isLogin);
  const { user, refetch } = useMe();

  useEffect(() => {
    if (isLogin) {
      refetch();
    }
  }, [pathName]);

  useEffect(() => {
    if (isLogin && user) {
      if (!user.emailVerified && pathName !== "/verifyEmail") {
        route.push("/verifyEmail");
      }
      if (!user.active && pathName !== "/inactiveAccount") {
        route.push("/inactiveAccount");
      }
    }
  }, [user]);
};

export default useCheckUser;
