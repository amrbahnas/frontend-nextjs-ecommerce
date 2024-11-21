"use client";
import React, { useEffect } from "react";
import { useVerifyToken } from "../_api/query";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";

const AuthLayout = ({ children }: React.PropsWithChildren) => {
  const route = useRouter();
  // const { tokenData } = useVerifyToken();
  const isLogin = useAuthStore((state) => state.isLogin);

  // useEffect(() => {
  //   if (tokenData) {
  //     route.push("/");
  //   }
  // }, [tokenData]);

  if (isLogin) {
    return route.push("/");
  }

  return <div>{children}</div>;
};

export default AuthLayout;
