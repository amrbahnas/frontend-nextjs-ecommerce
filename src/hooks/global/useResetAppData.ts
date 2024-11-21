import useAuthStore from "@/store/useAuthStore";
import useCardStore from "@/store/useCardStore";
import useUserStore from "@/store/useUserStore";
import { useRouter } from "next/navigation";

export const useResetAppData = (customRoute?: string) => {
  const router = useRouter();
  const removeAuthData = useAuthStore((state) => state.removeAuthData);
  const setUser = useUserStore((state) => state.setUser);
  const { setCartItemsCount } = useCardStore();

  const reset = () => {
    removeAuthData();
    setUser(null);
    setCartItemsCount(0);
    router.refresh();
    router.push(customRoute || "/");
  };

  return reset;
};
