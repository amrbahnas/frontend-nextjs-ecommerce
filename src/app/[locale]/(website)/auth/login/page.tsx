"use client";
import Item from "@/components/antd/item";
import Container from "@/components/ui/container";
import { Error } from "@/components/ui/error";
import useParamsService from "@/hooks/global/useParamsService";
import { Button, Divider, Form, Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useLogout } from "@/hooks/global/useLogout";
import useAuthStore from "@/store/useAuthStore";
import { useLogin } from "../_api/mutation";
import { FaGoogle } from "react-icons/fa";
import { thirdpartAuth } from "@/constant/thirdpartAuth";
import { useTranslations } from "next-intl";
const { Password } = Input;

const LoginPage = ({}) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const isLogin = useAuthStore((state) => state.isLogin);
  const { logout } = useLogout();
  const { login, loginError, loginPending } = useLogin();
  const t = useTranslations("auth.login");

  useEffect(() => {
    if (isLogin) {
      logout();
    }
  }, []);

  return (
    <Container className=" flex items-center justify-center gap-4 mt-5">
      <div className="w-1/2 hidden md:block">
        <img src="/loginBg.png" alt="login" className=" w-[80%]" />
      </div>
      <div className=" w-full md:w-1/2 ">
        <div className=" w-full bg-white border !p-4 md:!p-8 rounded-md shadow-md ">
          <Divider orientation="center">
            <h1 className="text-2xl md:text-3xl font-semibold text-primary">
              {t("title")}
            </h1>
          </Divider>
          <a href={thirdpartAuth.google}>
            <Button size="large" className="!w-full" icon={<FaGoogle />}>
              {t("withGoogle")}
            </Button>
          </a>
          <Divider>{t("or")}</Divider>
          {loginError && (
            <div className="flex items-center gap-2 mb-5">
              <Error error={loginError} hideOkButton={true} />
              {loginError && loginError.includes("not active") && (
                <Link href="/inactiveAccount" className=" underline">
                  {t("moreDetails")}
                </Link>
              )}
            </div>
          )}
          <Form
            validateTrigger="onSubmit"
            className="flex flex-col gap-5 w-full  "
            form={form}
            layout="vertical"
            onFinish={login}
          >
            <Item
              label={t("email.label")}
              name="email"
              rules={[
                {
                  required: true,
                  message: t("email.required"),
                },
              ]}
            >
              <Input
                type="email"
                placeholder={t("email.placeholder")}
                size="large"
                className=" rounded-md p-4"
              />
            </Item>
            <Item
              label={t("password.label")}
              name="password"
              rules={[
                {
                  required: true,
                  message: t("password.required"),
                },
              ]}
            >
              <Password
                type="password"
                name="password"
                size="large"
                placeholder={t("password.placeholder")}
                className=" rounded-md p-4"
              />
            </Item>
            <Link
              className="text-sm underline cursor-pointer"
              href={"/auth/forgot-password"}
            >
              {t("forgotPassword")}
            </Link>
            <Button
              className="bg-lama text-white p-2 rounded-md disabled:bg-pink-200 disabled:cursor-not-allowed"
              disabled={loginPending}
              loading={loginPending}
              htmlType="submit"
              type="primary"
              size="large"
            >
              {loginPending ? t("loading") : t("loginButton")}
            </Button>
            <Link
              className="text-sm underline cursor-pointer text-gray-600"
              href={"/auth/signup"}
            >
              {t("noAccount")}
            </Link>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default LoginPage;
