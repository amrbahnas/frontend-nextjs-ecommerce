import React from "react";
import { Button, Form, Input, Spin } from "antd";
import Item from "@/components/antd/item";
import { Error } from "@/components/ui/error";
import { useChangePassword } from "../_api/mutation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
const { Password } = Input;

const ChangePasswordForm = () => {
  const route = useRouter();
  const t = useTranslations("settings.security.changePassword");
  const { changePassword, changePasswordIsPending, changePasswordError } =
    useChangePassword();
  const [form] = Form.useForm();

  const changePasswordHandler = async (values: any) => {
    changePassword(values, {
      onSuccess: (result) => {
        toast.success(t("success"));
        route.push("/profile");
        form.resetFields();
      },
    });
  };

  return (
    <Spin spinning={changePasswordIsPending}>
      <Form
        validateTrigger="onSubmit"
        onFinish={changePasswordHandler}
        form={form}
        layout="vertical"
        className="mt-12 flex flex-col gap-4"
      >
        <Item
          label={t("currentPassword")}
          name="currentPassword"
          rules={[
            {
              required: true,
              message: t("currentPasswordRequired"),
            },
          ]}
        >
          <Password
            size="large"
            type="password"
            placeholder={t("currentPasswordPlaceholder")}
            className=" rounded-md p-4"
          />
        </Item>
        <Item
          label={t("newPassword")}
          name="newPassword"
          rules={[
            {
              required: true,
              message: t("newPasswordRequired"),
            },
            {
              min: 6,
              message: t("newPasswordMinLength"),
            },
          ]}
        >
          <Password
            size="large"
            type="password"
            placeholder={t("newPasswordPlaceholder")}
            className=" rounded-md p-4"
          />
        </Item>
        <Item
          label={t("confirmPassword")}
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: t("confirmPasswordRequired"),
            },
            // must be the same as password
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(t("passwordMismatch"));
              },
            }),
          ]}
        >
          <Password
            size="large"
            placeholder={t("confirmPasswordPlaceholder")}
            className=" rounded-md p-4"
          />
        </Item>
        <Button
          disabled={changePasswordIsPending}
          loading={changePasswordIsPending}
          size="large"
          htmlType="submit"
          className="bg-lama text-white p-2 rounded-md cursor-pointer disabled:bg-pink-200 disabled:cursor-not-allowed "
        >
          {changePasswordIsPending ? t("button.changing") : t("button.change")}
        </Button>
        <Error error={changePasswordError} />
      </Form>
    </Spin>
  );
};

export default ChangePasswordForm;
