"use client";
import { useMe } from "@/_api/query";
import useAuthStore from "@/store/useAuthStore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const useCheckUser = () => {
  const route = useRouter();
  const pathName = usePathname();
  const isLogin = useAuthStore((state) => state.isLogin);
  const { user, refetch, isLoading } = useMe(true);

  useEffect(() => {
    if (!isLogin) return;
    const checkUser = async () => {
      await refetch();
      if (user._id) {
        console.log("🚀 ~ checkUser ~ user:", user);
        if (!user.active && pathName !== "/inactiveAccount") {
          return route.push("/inactiveAccount");
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
