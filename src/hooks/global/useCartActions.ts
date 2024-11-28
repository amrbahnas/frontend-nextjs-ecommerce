import { useCardCheckout, useCashCheckout, useResetCart } from "@/_api/actions";
import useAuthStore from "@/store/useAuthStore";
import useCardStore from "@/store/useCardStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const useCartActions = ({
  cart,
  refetch,
}: {
  cart: CartType;
  refetch: any;
}) => {
  const router = useRouter();
  const { cartItems = [], _id: cartId } = cart;
  const [deleting, setDeleting] = useState(false);
  const isLogin = useAuthStore((state) => state.isLogin);
  const {
    cartLoading,
    resetCart: resetStoreCart,
    setCartItemsCount,
  } = useCardStore();

  const { resetApiCart, resetApiCartLoading } = useResetCart();
  const [checkoutType, setCheckoutType] = useState<"card" | "cash">("card");
  const { cardCheckout, checkoutLoading } = useCardCheckout(cartId);
  const { cashCheckout } = useCashCheckout(cartId);

  const handleResetCart = async () => {
    if (isLogin) {
      resetApiCart(
        {},
        {
          onSuccess: () => {
            refetch();
            toast.success("Cart reset successfully");
            // setOpen(false);
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
      router.push("/login");
      //   setOpen(false);
      return;
    }
    if (checkoutType === "card") {
      cardCheckout(
        {},
        {
          onSuccess: (res) => {
            window.location.href = res.data.checkoutPage;
          },
        }
      );
    } else {
      cashCheckout(
        {},
        {
          onSuccess: (res) => {
            const orderId = res.data.orderId;
            toast.success("Order placed successfully");
            router.push("/orders/" + orderId);
            // setOpen(false);
            setCartItemsCount(0);
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
    deleting,
    setDeleting,
    cartItems,
  };
};

export default useCartActions;
