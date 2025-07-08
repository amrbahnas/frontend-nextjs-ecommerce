"use client";

import Container from "@/components/ui/container";
import { Card } from "antd";
import ChangePasswordForm from "./_comps/changePasswordForm";
import { useTranslations } from "next-intl";

const SettingsPage = () => {
  const t = useTranslations("settings");

  return (
    <Container>
      <div className="my-6">
        <h1 className="text-2xl font-bold mb-2">{t("title")}</h1>
        <p className="text-gray-500">{t("description")}</p>
      </div>

      <div className="grid gap-6">
        <Card title={t("security.title")} className="shadow-sm w-full sm:w-2/3">
          <ChangePasswordForm />
        </Card>
      </div>
    </Container>
  );
};

export default SettingsPage;
