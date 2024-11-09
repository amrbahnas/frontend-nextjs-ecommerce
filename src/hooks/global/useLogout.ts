"use client";
import { useLogoutApi } from "@/app/(website)/auth/_api/mutation";
import useAuthStore from "@/store/useAuthStore";
import useCardStore from "@/store/useCardStore";
import useUserStore from "@/store/useUserStore";
import { useRouter } from "next/navigation";

export const useLogout = (customRoute = "/") => {
  const router = useRouter();
  const removeAuthData = useAuthStore((state) => state.removeAuthData);
  const setUser = useUserStore((state) => state.setUser);
  const { setCartItemsCount } = useCardStore();

  const { mutate, isPending } = useLogoutApi();
  const logout = () => {
    removeAuthData();
    setUser(null);
    setCartItemsCount(0);
    router.push(customRoute);
    mutate({});
  };

  return {
    logout,
    isPending,
  };
};
