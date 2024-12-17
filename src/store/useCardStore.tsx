import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  storeCart: CartType;
  onlineCart: CartStoreType;
  cartLoading: boolean;
  setOnlineCart: (cart: CartStoreType) => void;
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
      current.id === item.id &&
      current.color === item.color &&
      current.size === item.size
  );

  if (isItemExist) {
    const newCart = cartItems.map((current) =>
      current.id === item.id
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
      onlineCart: {
        cartItems: [],
        totalCartPrice: 0,
      },
      cartLoading: false,
      setOnlineCart: (cart: CartStoreType) => set({ onlineCart: cart }),

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
              (current) => current.id !== item.id
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
          cartItemsCount: 0,
          cartLoading: false,
          onlineCart: {
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
