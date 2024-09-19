"use client";
import { useEffect } from "react";
import { useGetCartCount } from "@/api/query";
import useAuthStore from "@/store/useAuthStore";
import useCardStore from "@/store/useCardStore";

export const UseCartCountHandler = () => {
  const { setCartItemsCount, storeCart } = useCardStore();
  const isLogin = useAuthStore((state) => state.isLogin);
  const { cartItemsCount, isLoading } = useGetCartCount({
    skip: !isLogin || storeCart.cartItems.length > 0,
  });
  useEffect(() => {
    // if login && storeCart has items => useMergeCartHandler will handle cartItemsCount, so we add storeCart.cartItems.length === 0 condition
    if (isLogin && !isLoading && storeCart.cartItems.length === 0) {
      setCartItemsCount(cartItemsCount);
    } else if (!isLogin) {
      setCartItemsCount(storeCart.cartItems.length);
    }
  }, [isLogin, isLoading]); // note => don`t edit dependencies here
};
