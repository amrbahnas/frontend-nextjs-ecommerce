import useAuthStore from "@/store/useAuthStore";
import useCardStore from "@/store/useCardStore";
import useUserStore from "@/store/useUserStore";
import { useRouter } from "next/navigation";

export const useResetAppData = () => {
  const router = useRouter();
  const removeAuthData = useAuthStore((state) => state.removeAuthData);
  const setUser = useUserStore((state) => state.setUser);
  const { setCartLoading, setOnlineCart } = useCardStore();

  const reset = (pushTo?: string) => {
    removeAuthData();
    setUser(null);

    setCartLoading(false);
    setOnlineCart({
      id: "",
      cartItems: [],
      totalCartPrice: 0,
    });
    router.refresh();
    pushTo && router.push(pushTo);
  };

  return reset;
};
