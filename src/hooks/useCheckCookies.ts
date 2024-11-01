import useAuthStore from "@/store/useAuthStore";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useCheckCookies = () => {
  const route = useRouter();
  const isLogin = useAuthStore((state) => state.isLogin);

  useEffect(() => {
    const token = Cookies.get("token");
    if (isLogin && !token) {
      route.push("/auth/login");
    }
  }, [isLogin]);
};

export default useCheckCookies;
