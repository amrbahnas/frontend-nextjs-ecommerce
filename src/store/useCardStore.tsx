import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  storeCart: CartType;
  cartItemsCount: number;
  cartLoading: boolean;
  setCartItemsCount: (count: number) => void;
  increaseCartItemsCount: () => void;
  decreaseCartItemsCount: () => void;
  addCartItem: (cartItem: CartItemType) => boolean;
  deleteCartItem: (cartItem: CartItemType) => void;
  resetCart: () => void;
  setCartLoading: (loading: boolean) => void;
};

const newCartItemsHandler = (
  cartItems: CartItemType[],
  item: CartItemType
): { newCart: CartItemType[]; isItemExist: boolean } => {
  const isItemExist = cartItems.find(
    (current) =>
      current._id === item._id &&
      (current.color === item.color || current.size === item.size)
  );

  if (isItemExist) {
    const newCart = cartItems.map((current) =>
      current._id === item._id
        ? {
            ...current,
            quantity: current.quantity + item.quantity,
            price: current.price + item.price,
          }
        : current
    );
    return { newCart, isItemExist: true };
  }

  return { newCart: [...cartItems, item], isItemExist: false };
};

const useCardStore = create<Store>(
  persist(
    (set) => ({
      storeCart: {
        cartItems: [],
        totalCartPrice: 0,
      },
      cartItemsCount: 0,
      cartLoading: false,
      setCartItemsCount: (count: number) => set({ cartItemsCount: count }),
      increaseCartItemsCount: () =>
        set((state: Store) => ({ cartItemsCount: state.cartItemsCount + 1 })),
      decreaseCartItemsCount: () =>
        set((state: Store) => ({ cartItemsCount: state.cartItemsCount - 1 })),

      addCartItem: (item: CartItemType) => {
        let isExist = false;
        set((state: Store) => {
          const { isItemExist, newCart } = newCartItemsHandler(
            state.storeCart.cartItems,
            item
          );
          isExist = isItemExist;
          return {
            storeCart: {
              cartItems: newCart,
              totalCartPrice: state.storeCart.totalCartPrice + item.price,
            },
          };
        });
        return isExist;
      },

      deleteCartItem: (item: CartItemType) =>
        set((state: Store) => ({
          storeCart: {
            cartItems: state.storeCart.cartItems.filter(
              (current) => current._id !== item._id
            ),
            totalCartPrice: state.storeCart.totalCartPrice - item.price,
          },
        })),

      resetCart: () =>
        set({
          storeCart: {
            cartItems: [],
            totalCartPrice: 0,
          },
        }),

      setCartLoading: (loading: boolean) => set({ cartLoading: loading }),
    }),
    {
      name: "user-cart",
    }
  ) as any
);

export default useCardStore;
