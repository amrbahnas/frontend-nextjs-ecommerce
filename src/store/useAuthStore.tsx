import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";

type Store = {
  isLogin: boolean;
  setAuthData: (token: string) => void;
  removeAuthData: () => void;
};

const useAuthStore = create<Store>(
  persist(
    (set) => ({
      isLogin: false,
      setAuthData: (token: string) => {
        set({ isLogin: true });
        Cookies.set("token", "bearer " + token);
      },
      removeAuthData: () => {
        set({ isLogin: false });
        Cookies.remove("token");
      },
    }),
    {
      name: "auth-store",
    }
  ) as any
);

export default useAuthStore;
