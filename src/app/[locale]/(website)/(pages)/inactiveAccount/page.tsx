"use client";
import Container from "@/components/ui/container";
import React, { useEffect } from "react";
import { ImBlocked } from "react-icons/im";
import useAuthStore from "@/store/useAuthStore";
import { useLogout } from "@/hooks/global/useLogout";
import { useTranslations } from "next-intl";

const InactiveAccount = () => {
  const t = useTranslations("inactiveAccount");
  const { logout } = useLogout();
  const { isLogin } = useAuthStore();

  useEffect(() => {
    if (isLogin) {
      logout();
    }
  }, []);

  return (
    <Container className="flex flex-col items-center justify-center h-80 mt-6">
      <ImBlocked className="text-9xl text-red-500 mb-4" />
      <h1 className="text-2xl font-bold mb-4">{t("title")}</h1>
      <div>
        <p className="text-lg">{t("description")}</p>
        <div className="">
          <p className="text-lg mt-4">{t("cases.title")}</p>
          <ul className="list-disc list-inside text-lg">
            <li>{t("cases.list.disabled")}</li>
            <li>{t("cases.list.wrongCredentials")}</li>
            <li>{t("cases.list.badActivities")}</li>
            <li>{t("cases.list.otherReasons")}</li>
          </ul>
        </div>
      </div>
    </Container>
  );
};

export default InactiveAccount;
