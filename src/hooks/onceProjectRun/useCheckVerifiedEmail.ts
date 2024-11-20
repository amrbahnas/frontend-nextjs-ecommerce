import { useVerifyToken } from "@/app/(website)/_api/query";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const useCheckVerifiedEmail = () => {
  const route = useRouter();
  const pathName = usePathname();
  const { tokenData } = useVerifyToken();
  useEffect(() => {
    if (tokenData && !tokenData.emailVerified && pathName !== "/verifyEmail") {
      route.push("/verifyEmail");
    }
  }, [tokenData]);
};

export default useCheckVerifiedEmail;
