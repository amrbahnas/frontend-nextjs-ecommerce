"use client";
import { Button, Checkbox, Divider, Form, Input, Radio } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import { useSignUp } from "../_api/mutation";
import { Error } from "@/components/ui/error";
import Item from "@/components/antd/item";
import Container from "@/components/ui/container";
import { FaGoogle } from "react-icons/fa";
import { thirdpartAuth } from "@/constant/thirdpartAuth";
import { useTranslations } from "next-intl";
const { Password } = Input;

const SignUpPage = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const { signUp, signUpError, signUpPending } = useSignUp();
  const t = useTranslations("auth.signup");

  return (
    <Container className="h-[calc(100dvh-80px)] flex items-center justify-center">
      <div className=" w-full md:w-7/12   border p-4 md:p-8 !pt-0 rounded-md shadow-md mt-3 dark:bg-dark-bg dark:border-dark-border dark:shadow-dark-bg-secondary">
        <Divider orientation="center">
          <h1 className="text-2xl md:text-3xl font-semibold text-primary">
            {t("title")}
          </h1>
        </Divider>
        <a className="mt-8 block" href={thirdpartAuth.google}>
          <Button size="large" className="!w-full" icon={<FaGoogle />}>
            {t("withGoogle")}
          </Button>
        </a>
        <Divider>{t("or")}</Divider>
        <Form
          className="flex flex-col gap-3 w-full "
          form={form}
          layout="vertical"
          onFinish={signUp}
          validateTrigger="onSubmit"
        >
          <div className="flex flex-col gap-2">
            <Item
              label={t("name.label")}
              name="name"
              rules={[
                {
                  required: true,
                  message: t("name.required"),
                },
                {
                  min: 3,
                  message: t("name.minLength"),
                },
              ]}
            >
              <Input
                placeholder={t("name.placeholder")}
                className=" rounded-md p-4"
                size="large"
              />
            </Item>
          </div>
          <div className="flex flex-col gap-2">
            <Item
              label={t("email.label")}
              name="email"
              rules={[
                {
                  required: true,
                  message: t("email.required"),
                },
                {
                  type: "email",
                  message: t("email.invalid"),
                },
                {
                  pattern: new RegExp(/^[a-zA-Z0-9._%+-]+@gmail.com$/),
                  message: t("email.gmailOnly"),
                },
              ]}
            >
              <Input
                type="email"
                placeholder={t("email.placeholder")}
                className=" rounded-md p-4"
                size="large"
              />
            </Item>
          </div>

          <div className="flex flex-col gap-2">
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
                placeholder={t("password.placeholder")}
                className=" rounded-md p-4"
                size="large"
              />
            </Item>
          </div>
          <div className="flex flex-col gap-2">
            <Item
              label={t("confirmPassword.label")}
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: t("confirmPassword.required"),
                },
                // must be the same as password
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(t("confirmPassword.mismatch"));
                  },
                }),
              ]}
            >
              <Password
                type="password"
                placeholder={t("confirmPassword.placeholder")}
                className=" rounded-md p-4"
                size="large"
              />
            </Item>
          </div>
          <div className="flex flex-col gap-2">
            <Item
              name="sex"
              initialValue={"male"}
              rules={[
                {
                  required: true,
                  message: t("sex.required"),
                },
              ]}
            >
              <Radio.Group>
                <Radio value="male">{t("sex.male")}</Radio>
                <Radio value="female">{t("sex.female")}</Radio>
              </Radio.Group>
            </Item>
          </div>

          <Button
            className="bg-lama text-white p-2 rounded-md disabled:bg-pink-200 disabled:cursor-not-allowed"
            disabled={signUpPending}
            loading={signUpPending}
            htmlType="submit"
            type="primary"
            size="large"
          >
            {signUpPending ? t("loading") : t("registerButton")}
          </Button>

          <Error error={signUpError} />

          <div
            className="text-sm underline cursor-pointer"
            onClick={() => {
              router.push("/auth/login");
            }}
          >
            {t("haveAccount")}
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default SignUpPage;
