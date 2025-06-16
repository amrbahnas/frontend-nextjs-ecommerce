"use client";

import { Button, Form, Input } from "antd";
import Container from "../ui/container";
import { useTranslations } from "next-intl";
import { useSubscribe } from "@/_api/actions";
import toast from "react-hot-toast";
const { Item } = Form;
const Newsletter = () => {
  const t = useTranslations("Footer");
  const [form] = Form.useForm();
  const { subscribe, isPending } = useSubscribe();

  const handleSubscribe = async (values: { email: string }) => {
    subscribe(values, {
      onSuccess: () => {
        toast.success("Successfully subscribed to newsletter!");
        form.resetFields();
      },
      onError: () => {
        // toast.error("Failed to subscribe. Please try again.");
      },
    });
  };

  return (
    <div className="bg-primary/5 py-12">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              {t("subscribeNewsletter")}
            </h3>
            <p className="text-gray-500">{t("newsletterDescription")}</p>
          </div>
          <div className="w-full md:w-1/3">
            <Form
              form={form}
              onFinish={handleSubscribe}
              className="relative !flex"
              size="large"
              layout="horizontal"
            >
              <Item
                name="email"
                rules={[
                  { required: true, message: "Please enter your email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <Input
                  size="large"
                  placeholder={t("enterEmail")}
                  disabled={isPending}
                  className="!border-r-0 !rounded-r-none"
                  allowClear
                />
              </Item>
              <Button
                htmlType="submit"
                type="primary"
                size="large"
                loading={isPending}
                disabled={isPending}
                className="!px-3 !py-2 !border-l-0 !rounded-l-none"
              >
                {t("subscribe")}
              </Button>
            </Form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Newsletter;
