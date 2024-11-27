"use client";
import { Button, Form, Input, Spin } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForgetPassword } from "../_api/mutation";
import { Error } from "@/components/ui/error";
import Item from "@/components/antd/item";
import { FORGET_PASSWORD_SCREENS as SCREENS } from "../../../../enum/pagesScreens";
import Container from "@/components/container";
import Link from "next/link";
import { toast } from "react-toastify";

const ForgetPasswordPage = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [screen, setScreen] = useState(SCREENS.SEND_RESET_CODE);
  const [email, setEmail] = useState("");
  const [resendCount, setResendCount] = useState(0);
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
              router.push("/login");
              toast.success("Password changed successfully");
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
      <div className="  justify-center flex items-center w-full md:w-auto min-w-[500px] -mt-12">
        <Form
          validateTrigger="onBlur"
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
                    size="large"
                    placeholder="Enter your email"
                    className=" rounded-md p-4"
                  />
                </Item>
                <Error error={error} />
              </div>
            )}
            {screen === SCREENS.VERIFICATION_RESET_CODE && (
              <div className="flex flex-col gap-4 ">
                {/*  check your email */}
                <div>
                  <div className="text-sm flex items-center flex-wrap">
                    <span>We have sent a code to your email:</span>
                    <span className="  font-semibold pl-1">{email}</span>
                  </div>
                  <Button
                    type="link"
                    className="!text-sm cursor-pointer  !p-0 self-start "
                    onClick={() => {
                      setScreen(SCREENS.SEND_RESET_CODE);
                    }}
                  >
                    Change Email
                  </Button>
                </div>
                <Error error={error} />
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
                  <Input.OTP size="large" length={5} />
                </Item>
                {/*  resend code  */}
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
                  Resend Code
                </Button>
                <Error
                  error={
                    resendCount >= 5
                      ? "You have reached the limit of resending code"
                      : null
                  }
                />
              </div>
            )}
            {screen === SCREENS.CREATE_NEW_PASSWORD && (
              <div className="flex flex-col gap-2 mb-4">
                <Error error={error} />
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
              className="bg-lama text-white p-2 rounded-md disabled:bg-pink-200 disabled:cursor-not-allowed mt-4"
              disabled={loading}
              loading={loading}
              htmlType="submit"
              type="primary"
              size="large"
            >
              {loading ? "Loading..." : buttonTitle}
            </Button>
            {screen === SCREENS.SEND_RESET_CODE && (
              <Link
                className="text-sm underline cursor-pointer block mt-4"
                href={"/login"}
              >
                Go back to Login
              </Link>
            )}
          </Spin>
        </Form>
      </div>
    </Container>
  );
};

export default ForgetPasswordPage;
