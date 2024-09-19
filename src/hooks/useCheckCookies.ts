import Cookies from "js-cookie";
import { useEffect } from "react";
import { useLogout } from "./useLogout";

const useCheckCookies = () => {
  const { logout } = useLogout();
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      logout();
    }
  }, []);
};

export default useCheckCookies;
