import React from "react";
import DisableLink from "../ui/disableLink";
import { useTranslations } from "next-intl";

export const PageLinks = () => {
  const t = useTranslations("Navigation");

  return (
    <div className="hidden xl:flex gap-4">
      <DisableLink disabled href={"/"}>
        {t("home")}
      </DisableLink>
      <DisableLink disabled href={"/"}>
        {t("shop")}
      </DisableLink>
      <DisableLink disabled href={"/"}>
        {t("deals")}
      </DisableLink>
      <DisableLink disabled href={"/"}>
        {t("about")}
      </DisableLink>
      <DisableLink disabled href={"/"}>
        {t("contact")}
      </DisableLink>
    </div>
  );
};
