"use client";
import Item from "@/components/antd/item";
import { Button, Form, Input, Spin } from "antd";
import { useChangeEmailActions } from "../../_api/mutation";
import Image from "next/image";
import { Error } from "@/components/ui/error";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/useUserStore";
import resSanatize from "@/services/sanatizeApiRes";
import toast from "react-hot-toast";
const { OTP } = Input;
const EnterOTP = ({
  currentScreen,
  newEmail,
  setCurrentScreen,
  setNewEmail,
}: {
  currentScreen: string;
  newEmail: string;
  setCurrentScreen: Function;
  setNewEmail: Function;
}) => {
  const route = useRouter();
  const {
    changeEmail,
    changeEmailError,
    loading,
    sendChangeEmailCode,
    sendChangeEmailCodeError,
  } = useChangeEmailActions();
  const [resentCount, setResentCount] = useState(0);
  const setUser = useUserStore((state) => state.setUser);
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    changeEmail(
      {
        code: values.code,
        email: newEmail,
      },
      {
        onSuccess: (result) => {
          setUser(resSanatize(result));
          setCurrentScreen("enterEmail");
          toast.success("Email changed successfully");
          route.push("/profile");
        },
      }
    );
  };
  if (currentScreen !== "enterOTP") return null;
  return (
    <Spin spinning={loading}>
      <Form
        onFinish={onFinish}
        validateTrigger="onBlur"
        className="flex flex-col  border !p-4 md:!p-8 rounded-md shadow-md gap-5 !w-full "
        form={form}
        layout="vertical"
      >
        <div className="flex flex-col gap-4  justify-center items-center">
          {/*  check your email */}
          <Image src={"/email-send.svg"} width={150} height={150} alt="email" />
          <div className="text-lg flex flex-col items-center text-center">
            <span>check your email, we have sent a code to your </span>
            <div className="space-x-1">
              <span>Email:</span>
              <span className="  font-semibold pl-1">{newEmail}</span>
              <span
                onClick={() => {
                  setNewEmail("");
                  setCurrentScreen("enterEmail");
                }}
                className="text-blue-700 cursor-pointer underline text-sm w-full text-start"
              >
                change?
              </span>
            </div>
          </div>
          <Error error={changeEmailError || sendChangeEmailCodeError} />
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
            <OTP size="large" length={5} />
          </Item>
          {/*  resend code  */}
          <div className="flex w-full justify-start">
            <Button
              type="link"
              disabled={resentCount > 3}
              className="text-sm underline cursor-pointer self-start !px-0 "
              onClick={() => {
                sendChangeEmailCode({ email: newEmail });
                setResentCount((prev) => prev + 1);
                form.setFieldsValue({ code: "" });
              }}
            >
              Resend Code
            </Button>
            {resentCount > 3 && (
              <p className="text-sm text-red-500">
                You have reached the maximum limit of resending code. please try
                again later.
              </p>
            )}
          </div>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="!w-full"
            loading={loading}
            disabled={resentCount > 3 || loading}
          >
            Verify Email
          </Button>
        </div>
      </Form>
    </Spin>
  );
};

export default EnterOTP;
