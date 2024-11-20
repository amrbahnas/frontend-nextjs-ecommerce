"use client";
import { useGetCartCount } from "@/_api/query";
import useAuthStore from "@/store/useAuthStore";
import useCardStore from "@/store/useCardStore";
import Cookies from "js-cookie";
import { useEffect } from "react";

//  should fix this
export const UseCartCountHandler = () => {
  const { setCartItemsCount, storeCart } = useCardStore();
  const isLogin = useAuthStore((state) => state.isLogin);
  const { cartItemsCount, isLoading, refetchCartCount } = useGetCartCount({
    skip: !isLogin || storeCart.cartItems.length > 0,
    // skip: !Cookies.get("token") || storeCart.cartItems.length > 0,
  });

  useEffect(() => {
    if (cartItemsCount) {
      setCartItemsCount(cartItemsCount);
    }
  }, [cartItemsCount]); // note => don`t edit dependencies here
  // }, [isLoading]); // note => don`t edit dependencies here

  useEffect(() => {
    if (isLogin) {
      refetchCartCount();
    }
  }, [isLogin]);
};
