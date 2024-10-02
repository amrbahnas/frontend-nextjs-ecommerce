import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const AuthLayout = ({ children }: React.PropsWithChildren) => {
  const router = useRouter();
  const isLogin = useAuthStore((state) => state.isLogin);

  useEffect(() => {
    if (isLogin) {
      router.push("/");
    }
  }, [isLogin]);

  return <>{children}</>;
};

export default AuthLayout;
