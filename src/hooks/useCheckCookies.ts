import Cookies from "js-cookie";
import { useEffect } from "react";
import { useLogout } from "./useLogout";
import useAuthStore from "@/store/useAuthStore";

const useCheckCookies = () => {
  const { logout } = useLogout();
  const isLogin = useAuthStore((state) => state.isLogin);
  useEffect(() => {
    const token = Cookies.get("token");
    if (isLogin && !token) {
      logout();
    }
  }, []);
};

export default useCheckCookies;
