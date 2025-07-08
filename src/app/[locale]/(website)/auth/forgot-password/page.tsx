"use client";
import { Button, Form, Input, Spin } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForgetPassword } from "../_api/mutation";
import { Error } from "@/components/ui/error";
import Item from "@/components/antd/item";
import { FORGET_PASSWORD_SCREENS as SCREENS } from "../../../../../enum/pagesScreens";
import Container from "@/components/ui/container";
import Link from "next/link";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
const { Password } = Input;

const ForgetPasswordPage = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [screen, setScreen] = useState(SCREENS.SEND_RESET_CODE);
  const [email, setEmail] = useState("");
  const [resendCount, setResendCount] = useState(0);
  const t = useTranslations("auth.forgotPassword");
  const {
    sendResetCode,
    verifyResetCode,
    createNewPassword,
    loading,
    data,
    error,
    isSuccess,
    isError,
  } = useForgetPassword();

  const formTitle =
    screen === SCREENS.SEND_RESET_CODE
      ? t("title")
      : screen === SCREENS.VERIFICATION_RESET_CODE
      ? t("verifyCode")
      : t("createNewPassword");

  const buttonTitle =
    screen === SCREENS.SEND_RESET_CODE
      ? t("sendResetCode")
      : screen === SCREENS.VERIFICATION_RESET_CODE
      ? t("verifyCode")
      : t("createNewPassword");

  const handleSubmit = async (values: any) => {
    switch (screen) {
      case SCREENS.SEND_RESET_CODE:
        setEmail(values.email);
        sendResetCode(values, {
          onSuccess: () => {
            setScreen(SCREENS.VERIFICATION_RESET_CODE);
            setResendCount(resendCount + 1);
          },
        });

        break;
      case SCREENS.VERIFICATION_RESET_CODE:
        verifyResetCode(values, {
          onSuccess: () => {
            setScreen(SCREENS.CREATE_NEW_PASSWORD);
          },
        });
        break;
      case SCREENS.CREATE_NEW_PASSWORD:
        createNewPassword(
          {
            email,
            ...values,
          },
          {
            onSuccess: () => {
              router.push("/auth/login");
              toast.success(t("success"));
            },
          }
        );
        break;
      default:
        break;
    }
  };

  return (
    <Container className="flex justify-center items-center h-[calc(100dvh-80px)] ">
      <div className="  justify-center flex items-center w-full -mt-12 max-w-[500px]">
        <Form
          validateTrigger="onSubmit"
          className="flex flex-col  border !p-4 md:!p-8 rounded-md shadow-md !-mt-14 !w-full "
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Spin spinning={loading}>
            <h1 className="text-2xl font-semibold mb-8">{formTitle}</h1>
            {screen === SCREENS.SEND_RESET_CODE && (
              <div className="flex flex-col gap-2 w-full md:w-96 mb-4">
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
                    name="email"
                    size="large"
                    placeholder={t("email.placeholder")}
                    className=" rounded-md p-4"
                  />
                </Item>
                <Error error={error} />
              </div>
            )}
            {screen === SCREENS.VERIFICATION_RESET_CODE && (
              <div className="flex flex-col gap-4 ">
                <div>
                  <div className="text-sm flex items-center flex-wrap">
                    <span>{t("verification.sentCode")}</span>
                    <span className="  font-semibold ps-1">{email}</span>
                  </div>
                  <Button
                    type="link"
                    className="!text-sm cursor-pointer  !p-0 self-start "
                    onClick={() => {
                      setScreen(SCREENS.SEND_RESET_CODE);
                    }}
                  >
                    {t("verification.changeEmail")}
                  </Button>
                </div>
                <Error error={error} />
                <Item
                  label={t("verification.code.label")}
                  name="resetCode"
                  rules={[
                    {
                      required: true,
                      message: t("verification.code.required"),
                    },
                  ]}
                >
                  <Input.OTP size="large" length={5} />
                </Item>
                <Button
                  type="link"
                  className="text-sm underline cursor-pointer  !p-0 self-start"
                  disabled={resendCount >= 5}
                  onClick={() => {
                    sendResetCode(
                      { email },
                      {
                        onSuccess: () => {
                          setResendCount(resendCount + 1);
                        },
                      }
                    );
                  }}
                >
                  {t("verification.code.resend")}
                </Button>
                <Error
                  error={
                    resendCount >= 5 ? t("verification.code.resendLimit") : null
                  }
                />
              </div>
            )}
            {screen === SCREENS.CREATE_NEW_PASSWORD && (
              <div className="flex flex-col gap-2 mb-4">
                <Error error={error} />
                <Item
                  label={t("newPassword.password.label")}
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: t("newPassword.password.required"),
                    },
                  ]}
                >
                  <Password
                    type="password"
                    placeholder={t("newPassword.password.placeholder")}
                    className=" rounded-md p-4"
                  />
                </Item>
                <Item
                  label={t("newPassword.confirmPassword.label")}
                  name="confirmPassword"
                  rules={[
                    {
                      required: true,
                      message: t("newPassword.confirmPassword.required"),
                    },
                  ]}
                >
                  <Password
                    type="password"
                    placeholder={t("newPassword.confirmPassword.placeholder")}
                    className=" rounded-md p-4"
                  />
                </Item>
              </div>
            )}
            <Button
              className="bg-lama text-white p-2 rounded-md disabled:bg-pink-200 disabled:cursor-not-allowed mt-4"
              disabled={loading}
              loading={loading}
              htmlType="submit"
              type="primary"
              size="large"
            >
              {loading ? t("loading") : buttonTitle}
            </Button>
            {screen === SCREENS.SEND_RESET_CODE && (
              <Link
                className="text-sm underline cursor-pointer block mt-4"
                href={"/auth/login"}
              >
                {t("backToLogin")}
              </Link>
            )}
          </Spin>
        </Form>
      </div>
    </Container>
  );
};

export default ForgetPasswordPage;
