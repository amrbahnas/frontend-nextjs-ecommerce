import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";

type AuthData = {
  token: string;
  role: string;
};

type Store = {
  isLogin: boolean;
  setAuthData: ({ token, role }: AuthData) => void;
  removeAuthData: () => void;
};

const useAuthStore = create<Store>(
  persist(
    (set) => ({
      isLogin: false,
      setAuthData: (payload: AuthData) => {
        set({ isLogin: true });
        Cookies.set("token", payload.token, {
          // httpOnly: true, // The cookie is not accessible via JavaScript
          // sameSite: "strict", // The cookie is sent only to the same site
          // secure: process.env.NEXT_PUBLIC_ENV === "production", // The cookie is sent only over HTTPS
        });
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
