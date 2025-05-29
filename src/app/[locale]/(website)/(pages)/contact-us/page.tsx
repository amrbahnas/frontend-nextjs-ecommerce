"use client";
import Container from "@/components/ui/container";
import React from "react";
import { Button, Divider, Form, Input } from "antd";
import Item from "@/components/antd/item";
import { useContactUs } from "./_api/mutation";
import { Error } from "@/components/ui/error";
import toast from "react-hot-toast";
const { TextArea } = Input;
const compSize = "large";
const ContactUs = () => {
  const { sendContactUs, isPending, isError } = useContactUs();
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    sendContactUs(values, {
      onSuccess: () => {
        form.resetFields();
        toast.success(
          "Message sent successfully Check your email for Confirmation"
        );
      },
    });
  };
  return (
    <Container className="flex flex-col items-center justify-center  min-h-96  py-16 ">
      <Divider className=" mb-4">
        <h3 className="text-4xl font-bold text-gray-800">Contact Us</h3>
      </Divider>
      <p className="text-lg text-gray-600 mb-6 max-w-2xl text-center">
        For any questions, feedback, or inquiries, please feel free to reach out
        to us. We are here to help!
      </p>
      <Form
        validateTrigger="onBlur"
        form={form}
        name="contact"
        onFinish={onFinish}
        className="w-full max-w-lg space-y-4"
      >
        <Item
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input
            size={compSize}
            placeholder="Your Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </Item>
        <Item
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please input a valid email!",
            },
            {
              pattern: new RegExp(/^[a-zA-Z0-9._%+-]+@gmail.com$/),
              message: "Please input a valid Gmail address",
            },
          ]}
        >
          <Input
            size={compSize}
            placeholder="Your Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </Item>
        <Item
          name="message"
          rules={[
            { required: true, message: "Please input your message!" },
            {
              min: 10,
              message: "Message must be at least 10 characters long",
            },
          ]}
        >
          <TextArea
            size={compSize}
            placeholder="Your Message"
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
            Send Message
          </Button>
        </Item>
      </Form>
    </Container>
  );
};

export default ContactUs;
