"use client";
import { Button, Result } from "antd";
import { useRouter } from "next/navigation";
import Container from "@/components/ui/container";
import useParamsService from "@/hooks/global/useParamsService";
import { useTranslations } from "next-intl";

const ErrorOperations = () => {
  const t = useTranslations("oops");
  const router = useRouter();
  const { getParams } = useParamsService({});
  const redirect = getParams("redirect");

  return (
    <Container className="flex justify-center items-center min-h-[calc(100dvh-200px)]">
      <Result
        status="warning"
        title={t("title")}
        subTitle={
          <div className="text-gray-600 max-w-lg text-center">
            <p>{t("description.main")}</p>
            <p className="mt-2">{t("description.suggestion")}</p>
            <ul className="list-disc list-inside mt-2 text-left">
              <li>{t("description.actions.refresh")}</li>
              <li>{t("description.actions.cache")}</li>
              <li>{t("description.actions.wait")}</li>
            </ul>
          </div>
        }
        extra={
          <div className="flex items-center gap-4 justify-center flex-wrap">
            <Button
              type="primary"
              onClick={() => {
                if (redirect) {
                  router.push(redirect);
                } else {
                  window.location.reload();
                }
              }}
              size="large"
            >
              {t("buttons.refresh")}
            </Button>
            {/* <Button onClick={() => router.back()} size="large">
              {t("buttons.back")}
            </Button>
            <Button onClick={() => router.push("/")} size="large">
              {t("buttons.home")}
            </Button> */}
          </div>
        }
      />
    </Container>
  );
};

export default ErrorOperations;
