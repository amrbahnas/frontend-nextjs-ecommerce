"use client";
import { useGetCartCount } from "@/api/query";
import useCardStore from "@/store/useCardStore";
import Cookies from "js-cookie";
import { useEffect } from "react";

export const UseCartCountHandler = () => {
  const { setCartItemsCount, storeCart } = useCardStore();
  const { cartItemsCount, isLoading } = useGetCartCount({
    skip: !Cookies.get("token") || storeCart.cartItems.length > 0,
  });
  useEffect(() => {
    const token = Cookies.get("token");
    // if login && storeCart has items => useMergeCartHandler will handle cartItemsCount, so we add storeCart.cartItems.length === 0 condition
    if (token && !isLoading && storeCart.cartItems.length === 0) {
      setCartItemsCount(cartItemsCount);
    } else if (!token) {
      setCartItemsCount(storeCart.cartItems.length);
    }
  }, [isLoading]); // note => don`t edit dependencies here
};
