import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";

type AuthData = {
  role?: string;
};

type Store = {
  isLogin: boolean;
  isAdmin: boolean;
  setAuthData: ({ role }: AuthData) => void;
  removeAuthData: () => void;
};

const useAuthStore = create<Store>(
  persist(
    (set) => ({
      isLogin: false,
      setAuthData: (payload: AuthData) => {
        set({ isLogin: true, isAdmin: payload.role === "admin" });
      },
      removeAuthData: () => {
        set({ isLogin: false, isAdmin: false });
      },
    }),
    {
      name: "auth-store",
    }
  ) as any
);

export default useAuthStore;
