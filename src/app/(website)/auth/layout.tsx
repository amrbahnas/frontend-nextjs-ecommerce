"use client";
import React, { useEffect } from "react";
import { useVerifyToken } from "../_api/query";
import { useRouter } from "next/navigation";

const AuthLayout = ({ children }: React.PropsWithChildren) => {
  const route = useRouter();
  const { tokenData } = useVerifyToken();

  useEffect(() => {
    if (tokenData) {
      route.push("/");
    }
  }, [tokenData]);

  return <div>{children}</div>;
};

export default AuthLayout;
