"use client";
import { Button, Result } from "antd";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const NotAllowed = () => {
  const t = useTranslations("notAllowed");
  const route = useRouter();

  return (
    <div className="flex justify-center items-center h-96 mt-4">
      <Result
        status="403"
        title={t("title")}
        subTitle={t("subTitle")}
        extra={
          <Button onClick={() => route.push("/")} type="primary">
            {t("backHome")}
          </Button>
        }
      />
    </div>
  );
};

export default NotAllowed;
