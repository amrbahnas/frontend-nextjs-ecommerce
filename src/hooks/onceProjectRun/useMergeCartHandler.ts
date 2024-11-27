import { useMergeLocalCart } from "@/_api/actions";
import useAuthStore from "@/store/useAuthStore";
import useCardStore from "@/store/useCardStore";
import { useEffect } from "react";

const useMergeCartHandler = () => {
  const { mergeCart } = useMergeLocalCart();
  const {
    storeCart,
    resetCart,
    setCartItemsCount,
    setCartLoading,
    setOnlineCart,
  } = useCardStore();
  const isLogin = useAuthStore((state) => state.isLogin);

  const mergeCartHandler = () => {
    if (storeCart.cartItems.length > 0) {
      setCartLoading(true);
      mergeCart(
        { cart: storeCart },
        {
          onSuccess: (res) => {
            console.log("🚀 ~ mergeCartHandler ~ res:", res);
            const newCartItemsCount = res.data.cartItemsCount;
            const cart = res.data.cart;
            setOnlineCart({
              cartItems: cart.cartItems,
              totalCartPrice: cart.totalCartPrice,
            });
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
    // const token = Cookies.get("token");
    // if (isLogin && token) mergeCartHandler();
    if (isLogin) mergeCartHandler();
  }, [isLogin]);
};

export default useMergeCartHandler;
