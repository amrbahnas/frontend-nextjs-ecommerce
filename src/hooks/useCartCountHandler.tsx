"use client";
import { useEffect } from "react";
import { useGetCartCount } from "@/api/query";
import useAuthStore from "@/store/useAuthStore";
import useCardStore from "@/store/useCardStore";

export const UseCartCountHandler = () => {
  const { setCartItemsCount, storeCart } = useCardStore();
  const isLogin = useAuthStore((state) => state.isLogin);
  const { cartItemsCount, refetchCartCount } = useGetCartCount({
    skip: !isLogin,
  });

  useEffect(() => {
    if (isLogin) {
      setCartItemsCount(cartItemsCount);
    } else {
      setCartItemsCount(storeCart.cartItems.length);
    }
  }, [
    isLogin,
    refetchCartCount,
    cartItemsCount,
    storeCart.cartItems.length,
    setCartItemsCount,
  ]);
};
