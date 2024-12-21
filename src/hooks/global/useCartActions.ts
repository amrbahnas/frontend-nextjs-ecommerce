import { useCardCheckout, useCashCheckout, useResetCart } from "@/_api/actions";
import resSanatize from "@/services/sanatizeApiRes";
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
  const { cardCheckout, checkoutLoading } = useCardCheckout(cartId);
  const { cashCheckout, cashCheckoutLoading } = useCashCheckout(cartId);

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

  const handleCheckout = () => {
    if (!isLogin) {
      router.push("/auth/login");

      onSuccess && onSuccess();
      return;
    }
    if (checkoutType === "card") {
      cardCheckout(
        {
          address: "egypt cairo",
        },
        {
          onSuccess: (res) => {
            window.location.href = resSanatize(res);
          },
        }
      );
    } else {
      cashCheckout(
        {
          address: "egypt cairo",
        },
        {
          onSuccess: (res) => {
            resetStoreCart();
            const orderId = resSanatize(res)?.orderId;
            toast.success("Order placed successfully");
            router.push("/orders/" + orderId);
            onSuccess && onSuccess();
          },
        }
      );
    }
  };

  return {
    handleResetCart,
    handleCheckout,
    checkoutType,
    setCheckoutType,
    checkoutLoading,
    cartLoading,
    resetApiCartLoading,
    isLoading:
      cartLoading ||
      resetApiCartLoading ||
      checkoutLoading ||
      cashCheckoutLoading,
  };
};

export default useCartActions;
