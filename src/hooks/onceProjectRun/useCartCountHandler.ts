"use client";
import { useGetCartCount } from "@/_api/query";
import useAuthStore from "@/store/useAuthStore";
import useCardStore from "@/store/useCardStore";
import { useEffect } from "react";

export const UseCartCountHandler = () => {
  const { setCartItemsCount, storeCart } = useCardStore();
  const isLogin = useAuthStore((state) => state.isLogin);
  const { cartItemsCount, isLoading, refetchCartCount } = useGetCartCount({
    skip: !isLogin || storeCart.cartItems.length > 0,
  });

  useEffect(() => {
    if (cartItemsCount && isLogin) {
      setCartItemsCount(cartItemsCount);
    }
  }, [cartItemsCount]);

  useEffect(() => {
    if (isLogin) {
      refetchCartCount();
    }
  }, [isLogin]);
};
