"use client";
import React from "react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import useUserStore from "@/store/useUserStore";

const ProgressBarLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const emailVerified = useUserStore((state) => state.user?.emailVerified);
  const active = useUserStore((state) => state.user?.active);
  return (
    <>
      {children}
      {emailVerified && active && (
        <ProgressBar
          height="4px"
          color="#F35C7A"
          options={{ showSpinner: false }}
          shallowRouting
        />
      )}
    </>
  );
};

export default ProgressBarLayout;
