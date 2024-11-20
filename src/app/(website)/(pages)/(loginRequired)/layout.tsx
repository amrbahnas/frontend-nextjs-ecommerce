"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useVerifyToken } from "../../_api/query";

const LoginLayout = ({ children }: React.PropsWithChildren) => {
  const route = useRouter();

  const { tokenData } = useVerifyToken();

  useEffect(() => {
    if (!tokenData) {
      return route.push("/auth/login");
    }
  }, [tokenData]);

  return <div>{children}</div>;
};

export default LoginLayout;
