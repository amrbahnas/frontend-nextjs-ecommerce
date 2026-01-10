import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  user: User | null;
  setUser: (user: any) => void;
  resetWishlist: () => void;
  demoVideoSeen: boolean;
  setDemoVideoSeen: (seen: boolean) => void;
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
      demoVideoSeen: false,
      setDemoVideoSeen: (seen: boolean) => set({ demoVideoSeen: seen }),
    }),
    {
      name: "user-store",
    }
  ) as any
);

export default useUserStore;
