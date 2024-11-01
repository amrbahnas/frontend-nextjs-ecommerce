"use client";
import useCheckCookies from "@/hooks/onceProjectRun/useCheckCookies";

const InitialChecks = () => {
  useCheckCookies();
  return null;
};

export default InitialChecks;
