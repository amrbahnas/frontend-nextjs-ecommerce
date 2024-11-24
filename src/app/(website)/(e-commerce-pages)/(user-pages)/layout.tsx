"use client";
import LoadingPage from "@/components/loadingPage";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const LoginLayout = ({ children }: React.PropsWithChildren) => {
  const route = useRouter();
  const isLogin = useAuthStore((state) => state.isLogin);

  useEffect(() => {
    if (!isLogin) {
      return route.push("/login");
    }
  }, [isLogin]);

  if (isLogin) {
    return <div>{children}</div>;
  }
  return <LoadingPage />;
};

export default LoginLayout;
