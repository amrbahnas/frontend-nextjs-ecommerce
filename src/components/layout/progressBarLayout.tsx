"use client";
import React from "react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const ProgressBarLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="#F35C7A"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

export default ProgressBarLayout;
