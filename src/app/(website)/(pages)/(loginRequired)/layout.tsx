"use client";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import React from "react";

const LoginLayout = ({ children }: React.PropsWithChildren) => {
  const route = useRouter();
  const isLogin = useAuthStore((state) => state.isLogin);

  if (!isLogin) {
    return route.push("/auth/login");
  }

  return <div>{children}</div>;
};

export default LoginLayout;
