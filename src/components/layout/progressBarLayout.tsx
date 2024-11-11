"use client";
import React, { useMemo } from "react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import useUserStore from "@/store/useUserStore";
import useAuthStore from "@/store/useAuthStore";

const ProgressBarLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const emailVerified = useUserStore((state) => state.user?.emailVerified);
  const isLogin = useAuthStore((state) => state.isLogin);

  const renderProgressBar = useMemo(() => {
    if (!isLogin || emailVerified) {
      return (
        <ProgressBar
          height="4px"
          color="#F35C7A"
          options={{ showSpinner: false }}
          shallowRouting
        />
      );
    }
    return null;
  }, [emailVerified, isLogin]);

  return (
    <>
      {children}
      {renderProgressBar}
    </>
  );
};

export default ProgressBarLayout;
