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
  const [resentCount, setResentCount] = useState(0);

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
      ? "Enter Verify Code"
      : "Congratulations! You are almost there.";

  const buttonTitle =
    screen === SCREENS.SEND_Email_CODE
      ? "Send Verify Code"
      : screen === SCREENS.VERIFICATION_Email_CODE
      ? "Verify Email"
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
          <Spin spinning={loading}>
            <h1 className="text-2xl font-semibold mb-8">{formTitle}</h1>
            {screen === SCREENS.SEND_Email_CODE && (
              <div className="flex flex-col gap-2 w-full md:w-96 mb-4  text-lg">
                <div className=" text-lg flex  items-center flex-wrap ">
                  <span>Your email:</span>
                  <span className="font-semibold pl-1">{user?.email}</span>
                </div>
                <p className=" mt-2">is not verified yet.</p>
                <p>Please verify your email to continue.</p>

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
                <div>
                  <Button
                    type="link"
                    disabled={resentCount > 3}
                    className="text-sm underline cursor-pointer self-start !px-0 "
                    onClick={() => {
                      sendVerificationEmailCode({ email: user?.email });
                      setResentCount((prev) => prev + 1);
                    }}
                  >
                    Resend Code
                  </Button>
                  {resentCount > 3 && (
                    <p className="text-sm text-red-500">
                      You have reached the maximum limit of resending code.
                      please try again later.
                    </p>
                  )}
                </div>
              </div>
            )}
            {screen === SCREENS.EMAIL_VERIFIED && (
              <div className="flex flex-col gap-2 mb-4">
                <p className="text-lg ">Your email is verified successfully.</p>
              </div>
            )}
            <div
              className={`mt-2 flex justify-start  ${
                screen === SCREENS.EMAIL_VERIFIED && " justify-end mt-8"
              } `}
            >
              <Button
                className="bg-lama text-white p-2 rounded-md disabled:bg-pink-200 disabled:cursor-not-allowed"
                disabled={loading}
                loading={loading}
                htmlType="submit"
                type="primary"
                size="large"
              >
                {loading ? "Loading..." : buttonTitle}
              </Button>
            </div>
          </Spin>
        </Form>
      </div>
    </Container>
  );
};

export default VerifyEmail;
