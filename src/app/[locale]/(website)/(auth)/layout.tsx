"use client";
import LoadingPage from "@/components/loadingPage";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const AuthLayout = ({ children }: React.PropsWithChildren) => {
  const route = useRouter();
  const isLogin = useAuthStore((state) => state.isLogin);

  useEffect(() => {
    if (isLogin) {
      route.push("/");
    }
  }, [isLogin]);

  if (!isLogin) {
    return <div>{children}</div>;
  }

  return <LoadingPage />;
};

export default AuthLayout;
