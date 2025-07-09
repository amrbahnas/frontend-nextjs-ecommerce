import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  user: User | null;
  setUser: (user: any) => void;
  resetWishlist: () => void;
};

const useUserStore = create<Store>(
  persist(
    (set, get: () => Store) => ({
      user: null,
      setUser: (user: any) => set({ user }),
      resetWishlist: () =>
        set((state) => ({
          user: state.user ? { ...state.user, wishlist: [] } : null,
        })),
    }),
    {
      name: "user-store",
    }
  ) as any
);

export default useUserStore;
