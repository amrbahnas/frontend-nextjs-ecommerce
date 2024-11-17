"use client";
import useCheckCookies from "@/hooks/onceProjectRun/useCheckCookies";

const InitialChecks = ({ children }: React.PropsWithChildren) => {
  useCheckCookies();
  return <>{children}</>;
};

export default InitialChecks;
