import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  cartItem: CartItemType[];
  totalCartPrice: number;
  setCartItem: (cartItem: CartItemType) => void;
};

const useCardStore = create<Store>(
  persist(
    (set) => ({
      cartItem: {} as CartItemType,
      totalCartPrice: 0,
      setCartItem: (cartItem: CartItemType) =>
        set((state: Store) => ({
          cartItem: cartItem,
          totalCartPrice: state.totalCartPrice + cartItem.price,
        })),
    }),
    {
      name: "user-cart",
    }
  ) as any
);

export default useCardStore;
