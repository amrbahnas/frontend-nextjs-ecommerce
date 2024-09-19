import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";

type Store = {
  isLogin: boolean;
  makeUserLogin: (token: string) => void;
  logOut: () => void;
};

const useAuthStore = create<Store>(
  persist(
    (set) => ({
      isLogin: false,
      makeUserLogin: (token: string) => {
        set({ isLogin: true });
        Cookies.set("token", "bearer " + token);
        window.location.href = "/";
      },
      logOut: () => {
        set({ isLogin: false });
        Cookies.remove("token");
        window.location.href = "/";
      },
    }),
    {
      name: "auth-store",
    }
  ) as any
);

export default useAuthStore;
