"use client";
import { UseCartCountHandler } from "@/hooks/useCartCountHandler";
import useCheckCookies from "@/hooks/useCheckCookies";
import useMergeCartHandler from "@/hooks/useMergeCartHandler";

const InitialChecks = () => {
  UseCartCountHandler();
  useCheckCookies();
  useMergeCartHandler();
  return null;
};

export default InitialChecks;
