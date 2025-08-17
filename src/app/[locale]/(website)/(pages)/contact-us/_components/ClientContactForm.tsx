"use client";
import { Button, Divider, Form, Input } from "antd";
import Item from "@/components/antd/item";
import { useContactUs } from "../_api/mutation";
import { Error } from "@/components/ui/error";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

const { TextArea } = Input;
const compSize = "large";

const ClientContactForm = () => {
  const t = useTranslations("contactUs");
  const { sendContactUs, isPending, isError } = useContactUs();
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    sendContactUs(values, {
      onSuccess: () => {
        form.resetFields();
        toast.success(t("form.success"));
      },
    });
  };

  return (
    <Form
      validateTrigger="onSubmit"
      form={form}
      name="contact"
      onFinish={onFinish}
      className="w-full max-w-lg space-y-4"
    >
      <Item
        name="name"
        rules={[{ required: true, message: t("form.name.required") }]}
      >
        <Input
          size={compSize}
          placeholder={t("form.name.placeholder")}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </Item>
      <Item
        name="email"
        rules={[
          {
            required: true,
            type: "email",
            message: t("form.email.required"),
          },
          {
            pattern: new RegExp(/^[a-zA-Z0-9._%+-]+@gmail.com$/),
            message: t("form.email.gmailOnly"),
          },
        ]}
      >
        <Input
          size={compSize}
          placeholder={t("form.email.placeholder")}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </Item>
      <Item
        name="message"
        rules={[
          { required: true, message: t("form.message.required") },
          {
            min: 10,
            message: t("form.message.minLength"),
          },
        ]}
      >
        <TextArea
          size={compSize}
          placeholder={t("form.message.placeholder")}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </Item>
      <Error error={isError} />
      <Item>
        <Button
          size={compSize}
          disabled={isPending}
          loading={isPending}
          type="primary"
          htmlType="submit"
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
        >
          {t("form.submit")}
        </Button>
      </Item>
    </Form>
  );
};

export default ClientContactForm;
