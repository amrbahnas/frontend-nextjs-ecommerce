"use client";
import LoadingPage from "@/components/loadingPage";
import useParamsService from "@/hooks/global/useParamsService";
import useUserStore from "@/store/useUserStore";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const VerifyEmailLayout = ({ children }: React.PropsWithChildren) => {
  const route = useRouter();
  const user = useUserStore((state) => state.user);
  const { getParams } = useParamsService({});
  const status = getParams("status");
  useEffect(() => {
    if (user?.emailVerified && status !== "success") {
      return route.push("/");
    }
  }, [user?.emailVerified]);

  if (!user?.emailVerified || status === "success") {
    return <div>{children}</div>;
  }
  return <LoadingPage />;
};

export default VerifyEmailLayout;
