import { useLogoutApi } from "@/app/auth/_api/mutation";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const router = useRouter();
  const removeAuthData = useAuthStore((state) => state.removeAuthData);
  const { mutate, isPending } = useLogoutApi();
  const logout = () => {
    mutate(
      {},
      {
        onSuccess: () => {
          removeAuthData();
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
