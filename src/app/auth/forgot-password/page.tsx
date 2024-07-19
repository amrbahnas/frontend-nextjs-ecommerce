"use client";
import { Button, Form, Input, Spin } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForgetPassword } from "../_api/mutation";
import { Error } from "@/components/error";
import Item from "@/components/item";

export enum SCREENS {
  SEND_RESET_CODE = "SEND_RESET_CODE",
  VERIFICATION_RESET_CODE = "VERIFICATION_RESET_CODE",
  CREATE_NEW_PASSWORD = "CREATE_NEW_PASSWORD",
}

const LoginPage = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [screen, setScreen] = useState(SCREENS.SEND_RESET_CODE);
  const [email, setEmail] = useState("");
  const {
    sendResetCode,
    verifyResetCode,
    createNewPassword,
    loading,
    data,
    error,
    isSuccess,
    isError,
  } = useForgetPassword(setScreen);

  const formTitle =
    screen === SCREENS.SEND_RESET_CODE
      ? "Forgot Password"
      : screen === SCREENS.VERIFICATION_RESET_CODE
      ? "Verify Code"
      : "Create New Password";

  const buttonTitle =
    screen === SCREENS.SEND_RESET_CODE
      ? "Send Reset Code"
      : screen === SCREENS.VERIFICATION_RESET_CODE
      ? "Verify Code"
      : "Create New Password";

  const handleSubmit = async (values: any) => {
    switch (screen) {
      case SCREENS.SEND_RESET_CODE:
        setEmail(values.email);
        sendResetCode(values);
        break;
      case SCREENS.VERIFICATION_RESET_CODE:
        verifyResetCode(values);
        break;
      case SCREENS.CREATE_NEW_PASSWORD:
        createNewPassword({
          email,
          ...values,
        });
        break;
      default:
        break;
    }
  };

  return (
    <div className="h-[calc(100vh-80px)] px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex items-center justify-center">
      <Spin spinning={loading}>
        <Form
          className="flex flex-col gap-8"
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <h1 className="text-2xl font-semibold">{formTitle}</h1>

          {screen === SCREENS.SEND_RESET_CODE && (
            <div className="flex flex-col gap-2">
              <Item
                label="E-mail"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className=" rounded-md p-4"
                />
              </Item>
            </div>
          )}

          {screen === SCREENS.VERIFICATION_RESET_CODE && (
            <div className="flex flex-col gap-2">
              {/*  check your email */}
              <div className="text-sm">
                We have sent a code to your email: {email}
              </div>
              <Item
                label="Code"
                name="resetCode"
                rules={[
                  {
                    required: true,
                    message: "Please input your code!",
                  },
                ]}
              >
                <Input
                  placeholder="Enter your code"
                  className=" rounded-md p-4"
                />
              </Item>
              {/*  resend code  */}
              <div
                className="text-sm underline cursor-pointer"
                onClick={() => sendResetCode({ email })}
              >
                Resend Code
              </div>
            </div>
          )}

          {screen === SCREENS.CREATE_NEW_PASSWORD && (
            <div className="flex flex-col gap-2">
              <Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input
                  type="password"
                  placeholder="Enter your new password"
                  className=" rounded-md p-4"
                />
              </Item>
              <Item
                label="Password"
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: "Please input  confirmPassword",
                  },
                ]}
              >
                <Input
                  type="password"
                  placeholder="Enter your new password"
                  className=" rounded-md p-4"
                />
              </Item>
            </div>
          )}

          <Button
            className="bg-lama text-white p-2 rounded-md disabled:bg-pink-200 disabled:cursor-not-allowed"
            disabled={loading}
            loading={loading}
            htmlType="submit"
          >
            {loading ? "Loading..." : buttonTitle}
          </Button>
          <Error error={error} />

          {screen === SCREENS.SEND_RESET_CODE && (
            <div
              className="text-sm underline cursor-pointer"
              onClick={() => router.push("/auth/login")}
            >
              Go back to Login
            </div>
          )}
        </Form>
      </Spin>
    </div>
  );
};

export default LoginPage;
