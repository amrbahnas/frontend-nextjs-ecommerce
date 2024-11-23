"use client";
import Item from "@/components/antd/item";
import Container from "@/components/container";
import { Error } from "@/components/ui/error";
import useParamsService from "@/hooks/global/useParamsService";
import useUserStore from "@/store/useUserStore";
import { Button, Form, Input, Result, Spin } from "antd";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { VERIFY_EMAIL_SCREENS as SCREENS } from "../../../../../enum/pagesScreens";
import { useSendVerificationEmailCode, useVerifyEmail } from "./_api/action";
import { MdMarkEmailUnread } from "react-icons/md";
import Image from "next/image";

const VerifyEmail = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const { user, setUser } = useUserStore();
  const [screen, setScreen] = useState(SCREENS.SEND_Email_CODE);
  const [resentCount, setResentCount] = useState(0);
  const { getParams } = useParamsService({});
  const {
    sendVerificationEmailCode,
    sendVerificationEmailCodeLoading,
    sendVerificationEmailCodeError,
  } = useSendVerificationEmailCode();
  const { verifyEmail, verifyEmailLoading, verifyEmailError } =
    useVerifyEmail();

  const getTitleAndButtonText = useCallback((screen: string) => {
    switch (screen) {
      case SCREENS.SEND_Email_CODE:
        return { formTitle: "Verify Your Email", buttonTitle: "Verify Now" };
      case SCREENS.VERIFICATION_Email_CODE:
        return { formTitle: "Enter Verify Code", buttonTitle: "Verify Email" };
      case SCREENS.EMAIL_VERIFIED:
        return {
          formTitle: "Congratulations! You are almost there.",
          buttonTitle: "Continue",
        };
      default:
        return { formTitle: "", buttonTitle: "" };
    }
  }, []);

  const { formTitle, buttonTitle } = getTitleAndButtonText(screen);
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
        const redirect = getParams("redirect");
        router.refresh();
        router.push(redirect || "/");
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
            {!SCREENS.EMAIL_VERIFIED && (
              <h1 className="text-2xl font-semibold mb-8">{formTitle}</h1>
            )}
            {screen === SCREENS.SEND_Email_CODE && (
              <div className="flex flex-col gap-2 w-full md:w-[500px] mb-4 ">
                <div className=" text-lg flex  items-center justify-center">
                  <Image
                    src={"/Confirmed-email.svg"}
                    width={200}
                    height={200}
                    alt="email"
                  />
                </div>
                <div className=" text-center">
                  <span className="mt-2 text-sm">YOU ARE ONE STEP AWAY</span>
                  <h6 className="text-3xl font-semibold mt-2 capitalize">
                    Verify your email address
                  </h6>
                  <p className="text-sm text-gray-500 mt-2">
                    To complete you profile and start shopping, you`ll need to
                    verify your email address.
                  </p>
                </div>

                <Error error={sendVerificationEmailCodeError} />
              </div>
            )}
            {screen === SCREENS.VERIFICATION_Email_CODE && (
              <div className="flex flex-col gap-4  justify-center items-center">
                {/*  check your email */}
                <Image
                  src={"/email-send.svg"}
                  width={200}
                  height={200}
                  alt="email"
                />
                <div className="text-lg flex flex-col items-center">
                  <span>
                    check your email, we have sent a code to your email:
                  </span>
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
                      form.setFieldsValue({ code: "" });
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
              <Result
                status="success"
                title="Your email has been verified successfully!"
                subTitle="Happy shopping with us."
                extra={[
                  <Button
                    onClick={handleSubmit}
                    type="primary"
                    key="console"
                    size="large"
                  >
                    Continue
                  </Button>,
                ]}
              />
            )}
            <div
              className={`mt-2 flex justify-center  ${
                screen === SCREENS.EMAIL_VERIFIED && " hidden"
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
