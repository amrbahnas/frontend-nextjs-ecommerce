"use client";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import React from "react";

const ProgressBarLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <ProgressBar
        height="4px"
        color="#F35C7A"
        options={{ showSpinner: false }}
        shallowRouting
      />
      {children}
    </>
  );
};

export default ProgressBarLayout;
