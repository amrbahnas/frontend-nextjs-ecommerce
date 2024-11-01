import useAuthStore from "@/store/useAuthStore";
import useUserStore from "@/store/useUserStore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const useCheckUserEmailVerification = () => {
  const route = useRouter();
  const pathName = usePathname();
  const isLogin = useAuthStore((state) => state.isLogin);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (isLogin && !user?.emailVerified) {
      route.push("/verifyEmail");
    }
  }, [isLogin, user?.emailVerified, pathName]);

  return null;
};

export default useCheckUserEmailVerification;
