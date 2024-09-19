import { useMergeLocalCart } from "@/api/actions";
import useAuthStore from "@/store/useAuthStore";
import useCardStore from "@/store/useCardStore";
import { useEffect } from "react";

const useMergeCartHandler = () => {
  const { mergeCart } = useMergeLocalCart();
  const { storeCart, resetCart, setCartItemsCount, setCartLoading } =
    useCardStore();
  const isLogin = useAuthStore((state) => state.isLogin);

  const mergeCartHandler = () => {
    if (storeCart.cartItems.length > 0) {
      setCartLoading(true);
      mergeCart(
        { cart: storeCart },
        {
          onSuccess: (res) => {
            const newCartItemsCount = res.data.cartItemsCount;
            setCartItemsCount(newCartItemsCount);
            resetCart();
            setCartLoading(false);
          },
          onError: () => {
            setCartLoading(false);
          },
        }
      );
    }
  };

  useEffect(() => {
    if (isLogin) mergeCartHandler();
  }, [isLogin]);
};

export default useMergeCartHandler;
