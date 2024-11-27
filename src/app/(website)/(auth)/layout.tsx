"use client";
import LoadingPage from "@/components/loadingPage";
import useAuthStore from "@/store/useAuthStore";
import useUserStore from "@/store/useUserStore";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const AuthLayout = ({ children }: React.PropsWithChildren) => {
  const route = useRouter();
  const isLogin = useAuthStore((state) => state.isLogin);
  const user = useUserStore((state) => state.user);
  useEffect(() => {
    if (isLogin && user?.emailVerified) {
      route.push("/");
    }
  }, [isLogin, user?.emailVerified]);

  if (!isLogin) {
    return <div>{children}</div>;
  }

  return <LoadingPage />;
};

export default AuthLayout;
