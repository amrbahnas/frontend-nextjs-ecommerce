"use client";
import { useLogoutApi } from "@/app/(website)/auth/_api/mutation";
import useAuthStore from "@/store/useAuthStore";
import useUserStore from "@/store/useUserStore";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const router = useRouter();
  const removeAuthData = useAuthStore((state) => state.removeAuthData);
  const setUser = useUserStore((state) => state.setUser);

  const { mutate, isPending } = useLogoutApi();
  const logout = () => {
    mutate(
      {},
      {
        onSuccess: () => {
          removeAuthData();
          setUser(null);
          router.push("/");
        },
      }
    );
  };

  return {
    logout,
    isPending,
  };
};
