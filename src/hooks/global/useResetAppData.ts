import useAuthStore from "@/store/useAuthStore";
import useCardStore from "@/store/useCardStore";
import useUserStore from "@/store/useUserStore";
import { useRouter } from "next/navigation";

export const useResetAppData = () => {
  const router = useRouter();
  const removeAuthData = useAuthStore((state) => state.removeAuthData);
  const setUser = useUserStore((state) => state.setUser);
  const { setCartItemsCount, setCartLoading, setOnlineCart } = useCardStore();

  const reset = (customRoute = "/") => {
    removeAuthData();
    setUser(null);
    setCartItemsCount(0);
    setCartLoading(false);
    setOnlineCart({
      cartItems: [],
      totalCartPrice: 0,
    });
    router.refresh();
    router.push(customRoute);
  };

  return reset;
};
