"use client";
import Container from "@/components/ui/container";
import React, { useEffect } from "react";
import { ImBlocked } from "react-icons/im";
import useAuthStore from "@/store/useAuthStore";
import { useLogout } from "@/hooks/global/useLogout";

const InactiveAccount = () => {
  const { logout } = useLogout();

  const { isLogin } = useAuthStore();
  console.log("🚀 ~ file: page.tsx:12 ~ isLogin:", isLogin);
  useEffect(() => {
    if (isLogin) {
      console.log("🚀 ~ file: page.tsx:15 ~ isLogin:", isLogin);
      logout();
    }
  }, []);
  return (
    <Container className="flex flex-col items-center justify-center h-80 mt-6">
      <ImBlocked className="text-9xl text-red-500 mb-4" />
      <h1 className="text-2xl font-bold mb-4">Account is not active</h1>
      <div>
        <p className="text-lg">
          Your account is inactive. Please contact the administrator to activate
          your account.
        </p>
        <div className="">
          <p className="text-lg mt-4 ">Some cases can be happened:</p>
          <ul className="list-disc list-inside text-lg">
            <li>Account is disabled by the administrator</li>
            <li>Account Entered Wrong Credentials more than 5 times</li>
            <li>
              Account do Bad Activities. For example, write bad Reviews, etc
            </li>
            <li>
              Some Other reasons. Please contact the administrator for more
            </li>
          </ul>
        </div>
      </div>
    </Container>
  );
};

export default InactiveAccount;
