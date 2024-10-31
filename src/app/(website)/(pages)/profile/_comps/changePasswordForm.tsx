import React from "react";
import { useChangePassword } from "../_api/mutation";
import { Button, Form, Input, Spin } from "antd";
import Item from "@/components/antd/item";
import { Error } from "@/components/ui/error";

const ChangePasswordForm = () => {
  const { changePassword, changePasswordIsPending, changePasswordError } =
    useChangePassword();
  const [form] = Form.useForm();

  const changePasswordHandler = async (values: any) => {
    changePassword(values);
    form.resetFields();
  };

  return (
    <Spin spinning={changePasswordIsPending}>
      <Form
        onFinish={changePasswordHandler}
        form={form}
        layout="vertical"
        className="mt-12 flex flex-col gap-4"
      >
        <Item
          label="Current Password"
          name="currentPassword"
          rules={[
            {
              required: true,
              message: "Please input your Current password!",
            },
          ]}
        >
          <Input
            type="password"
            placeholder="Enter your Current password"
            className=" rounded-md p-4"
          />
        </Item>
        <Item
          label="New Password"
          name="newPassword"
          rules={[
            {
              required: true,
              message: "Please input your New password!",
            },
            {
              min: 6,
              message: "Password must be at least 6 characters",
            },
          ]}
        >
          <Input
            type="password"
            placeholder="Enter New password"
            className=" rounded-md p-4"
          />
        </Item>
        <Item
          label="confirm Password"
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: "Please input your confirmPassword!",
            },
            // must be the same as password
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  "The two passwords that you entered do not match!"
                );
              },
            }),
          ]}
        >
          <Input
            type="password"
            placeholder="Enter your confirmPassword"
            className=" rounded-md p-4"
          />
        </Item>
        <Button
          disabled={changePasswordIsPending}
          loading={changePasswordIsPending}
          htmlType="submit"
          className="bg-lama text-white p-2 rounded-md cursor-pointer disabled:bg-pink-200 disabled:cursor-not-allowed "
        >
          {changePasswordIsPending ? "Changing..." : "Change Password"}
        </Button>
        <Error error={changePasswordError} />
      </Form>
    </Spin>
  );
};

export default ChangePasswordForm;
