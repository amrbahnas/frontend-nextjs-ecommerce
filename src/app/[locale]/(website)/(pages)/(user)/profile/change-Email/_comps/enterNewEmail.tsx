"use client";
import Item from "@/components/antd/item";
import { Button, Form, Input, Spin } from "antd";
import { useChangeEmailActions } from "../../_api/mutation";
import { Error } from "@/components/ui/error";

const EnterNewEmail = ({
  setCurrentScreen,
  setNewEmail,
  currentScreen,
}: {
  setCurrentScreen: any;
  setNewEmail: any;
  currentScreen: string;
}) => {
  const { sendChangeEmailCode, sendChangeEmailCodeError, loading } =
    useChangeEmailActions();
  console.log("🚀 ~ sendChangeEmailCodeError:", sendChangeEmailCodeError);
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    sendChangeEmailCode(values, {
      onSuccess: (result) => {
        setCurrentScreen("enterOTP");
        setNewEmail(values.email);
      },
    });
  };
  if (currentScreen !== "enterEmail") return null;
  return (
    <Spin spinning={loading}>
      <Form
        onFinish={onFinish}
        validateTrigger="onSubmit"
        className="flex flex-col  border !p-4 md:!p-8 rounded-md shadow-md gap-8 !w-full min-h-80"
        form={form}
        layout="vertical"
      >
        <div>
          <p className="text-center text-lg capitalize">
            please enter your new email
          </p>
          <span>
            <p className="text-center text-xs">
              we will send you a verification email to this address
            </p>
          </span>
        </div>
        <Item
          name="email"
          label="New Email"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
            {
              pattern: new RegExp(/^[a-zA-Z0-9._%+-]+@gmail.com$/),
              message: "Please input a valid Gmail address",
            },
          ]}
        >
          <Input size="large" placeholder="Enter your new email" allowClear />
        </Item>
        <Error error={sendChangeEmailCodeError} />
        <Button
          disabled={loading}
          type="primary"
          htmlType="submit"
          size="large"
          className="!mt-6"
        >
          Change Email
        </Button>
      </Form>
    </Spin>
  );
};

export default EnterNewEmail;
