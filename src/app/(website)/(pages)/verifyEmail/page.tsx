"use client";
import { Button, Form, Input, Spin } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Error } from "@/components/ui/error";
import Item from "@/components/antd/item";
import { VERIFY_EMAIL_SCREENS as SCREENS } from "../../../../enum/pagesScreens";
import Container from "@/components/container";
import { useSendVerificationEmailCode, useVerifyEmail } from "./_api/action";
import useUserStore from "@/store/useUserStore";

const VerifyEmail = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const { user, setUser } = useUserStore();
  const [screen, setScreen] = useState(SCREENS.SEND_Email_CODE);

  const {
    sendVerificationEmailCode,
    sendVerificationEmailCodeLoading,
    sendVerificationEmailCodeError,
  } = useSendVerificationEmailCode();
  const { verifyEmail, verifyEmailLoading, verifyEmailError } =
    useVerifyEmail();

  const formTitle =
    screen === SCREENS.SEND_Email_CODE
      ? "Verify Your Email"
      : SCREENS.VERIFICATION_Email_CODE
      ? "Verify Code"
      : "Email Verified";

  const buttonTitle =
    screen === SCREENS.SEND_Email_CODE
      ? "Send Verify Code"
      : screen === SCREENS.VERIFICATION_Email_CODE
      ? "Verify Code"
      : "Continue";
  const loading = sendVerificationEmailCodeLoading || verifyEmailLoading;

  const handleSubmit = async (values: any) => {
    switch (screen) {
      case SCREENS.SEND_Email_CODE:
        sendVerificationEmailCode(
          { email: user?.email },
          {
            onSuccess: () => {
              setScreen(SCREENS.VERIFICATION_Email_CODE);
            },
          }
        );
        break;
      case SCREENS.VERIFICATION_Email_CODE:
        verifyEmail(values, {
          onSuccess: (res) => {
            const newUser = res.data.user;
            setUser(newUser);
            setScreen(SCREENS.EMAIL_VERIFIED);
          },
        });
        break;
      default:
        router.push("/");
        break;
    }
  };

  return (
    <Container className="flex justify-center items-center h-[calc(100dvh-80px)] ">
      <div className="  justify-center flex items-center w-full md:w-auto -mt-12">
        <Form
          className="flex flex-col  border !p-4 md:!p-8 rounded-md shadow-md !-mt-14 !w-full "
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Spin spinning={verifyEmailLoading || verifyEmailLoading}>
            <h1 className="text-2xl font-semibold mb-8">{formTitle}</h1>
            {screen === SCREENS.SEND_Email_CODE && (
              <div className="flex flex-col gap-2 w-full md:w-96 mb-4">
                <span>Your email: {user?.email}</span>
                <p>
                  is not verified yet. Please verify your email to continue.
                </p>
                <Error error={sendVerificationEmailCodeError} />
              </div>
            )}
            {screen === SCREENS.VERIFICATION_Email_CODE && (
              <div className="flex flex-col gap-4">
                {/*  check your email */}
                <div className="text-sm flex items-center flex-wrap">
                  <span>We have sent a Verify code to your email:</span>
                  <span className="  font-semibold pl-1">{user?.email}</span>
                </div>
                <Error error={verifyEmailError} />
                <Item
                  label="Code"
                  name="code"
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
                <div
                  className="text-sm underline cursor-pointer  "
                  onClick={() =>
                    sendVerificationEmailCode({ email: user?.email })
                  }
                >
                  Resend Code
                </div>
              </div>
            )}
            {screen === SCREENS.EMAIL_VERIFIED && (
              <div className="flex flex-col gap-2 mb-4">
                <span>Your email is verified successfully.</span>
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
          </Spin>
        </Form>
      </div>
    </Container>
  );
};

export default VerifyEmail;
