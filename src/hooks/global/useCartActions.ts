import { useResetCart } from "@/_api/actions";
import useAuthStore from "@/store/useAuthStore";
import useCardStore from "@/store/useCardStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const useCartActions = ({
  cartId,
  refetch,
  onSuccess,
}: {
  cartId: string;
  refetch: any;
  onSuccess?: any;
}) => {
  const router = useRouter();

  const isLogin = useAuthStore((state) => state.isLogin);
  const { cartLoading, resetCart: resetStoreCart } = useCardStore();

  const { resetApiCart, resetApiCartLoading } = useResetCart();
  const [checkoutType, setCheckoutType] = useState<"card" | "cash">("card");

  const handleResetCart = async () => {
    if (isLogin) {
      resetApiCart(
        {},
        {
          onSuccess: () => {
            refetch();
            toast.success("Cart reset successfully");

            onSuccess && onSuccess();
            resetStoreCart();
          },
        }
      );
    } else {
      resetStoreCart();
    }
  };

  return {
    handleResetCart,

    checkoutType,
    setCheckoutType,

    cartLoading,
    resetApiCartLoading,
    isLoading: cartLoading || resetApiCartLoading,
  };
};

export default useCartActions;
