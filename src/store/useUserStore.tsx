import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  user: User | null;
  setUser: (user: any) => void;
};

const useUserStore = create<Store>(
  persist(
    (set) => ({
      user: null,
      setUser: (user: any) => set({ user }),
    }),
    {
      name: "user-store",
    }
  ) as any
);

export default useUserStore;
