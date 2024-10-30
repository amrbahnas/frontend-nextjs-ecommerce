"use client";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import { useSignUp } from "../_api/mutation";
import { Error } from "@/components/error";
import Item from "@/components/antd/item";

const SignUpPage = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const { signUp, signUpError, signUpPending } = useSignUp();
  console.log("🚀 ~ SignUpPage ~ signUpError:", signUpError);
  return (
    <div className="h-[calc(100dvh-80px)] mx-auto w-[80%] lg:w-[30%] mt-10">
      <Form
        className="flex flex-col gap-5 w-full"
        form={form}
        layout="vertical"
        onFinish={signUp}
      >
        <h1 className="text-2xl font-semibold">Register</h1>
        <div className="flex flex-col gap-2">
          <Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your Name!",
              },
            ]}
          >
            <Input
              placeholder="Enter your Name"
              className=" rounded-md p-4"
              size="large"
            />
          </Item>
        </div>
        <div className="flex flex-col gap-2">
          <Item
            label="E-mail"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input
              type="email"
              placeholder="Enter your email"
              className=" rounded-md p-4"
              size="large"
            />
          </Item>
        </div>

        <div className="flex flex-col gap-2">
          <Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input
              type="password"
              placeholder="Enter your password"
              className=" rounded-md p-4"
              size="large"
            />
          </Item>
        </div>
        <div className="flex flex-col gap-2">
          <Item
            label="confirm Password"
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Please input your confirmPassword!",
              },
            ]}
          >
            <Input
              type="password"
              placeholder="Enter your confirmPassword"
              className=" rounded-md p-4"
              size="large"
            />
          </Item>
        </div>

        <Button
          className="bg-lama text-white p-2 rounded-md disabled:bg-pink-200 disabled:cursor-not-allowed"
          disabled={signUpPending}
          loading={signUpPending}
          htmlType="submit"
          type="primary"
          size="large"
        >
          {signUpPending ? "Loading..." : "Register"}
        </Button>

        <Error error={signUpError} />

        <div
          className="text-sm underline cursor-pointer"
          onClick={() => {
            router.push("/auth/login");
          }}
        >
          Have and account?
        </div>
      </Form>
    </div>
  );
};

export default SignUpPage;
