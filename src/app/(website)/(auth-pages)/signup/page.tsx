"use client";
import { Button, Checkbox, Divider, Form, Input, Radio } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import { useSignUp } from "../_api/mutation";
import { Error } from "@/components/ui/error";
import Item from "@/components/antd/item";
import Container from "@/components/container";
import { FaGoogle } from "react-icons/fa";
const { Password } = Input;

const SignUpPage = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const { signUp, signUpError, signUpPending } = useSignUp();
  console.log("🚀 ~ SignUpPage ~ signUpError:", signUpError);
  return (
    <Container className="h-[calc(100dvh-80px)] flex items-center justify-center">
      <div className=" w-full md:w-7/12   border p-4 md:p-8 !pt-0 rounded-md shadow-md mt-3">
        <Divider orientation="center">
          <h1 className="text-2xl md:text-3xl font-semibold text-primary">
            Register
          </h1>
        </Divider>
        <a
          className="mt-8 block"
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/auth/google`}
        >
          <Button size="large" className="!w-full" icon={<FaGoogle />}>
            Register with Google
          </Button>
        </a>
        <Divider>Or</Divider>
        <Form
          className="flex flex-col gap-3 w-full "
          form={form}
          layout="vertical"
          onFinish={signUp}
        >
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
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  validator(_, value) {
                    if (value && value.endsWith("@gmail.com")) {
                      return Promise.resolve();
                    }
                    return Promise.reject("The email must be a Gmail address!");
                  },
                },
              ]}
            >
              <Input
                type="email"
                placeholder="example@gmail.com"
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
              <Password
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
                // must be the same as password
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      "The two passwords that you entered do not match!"
                    );
                  },
                }),
              ]}
            >
              <Password
                type="password"
                placeholder="Enter your confirmPassword"
                className=" rounded-md p-4"
                size="large"
              />
            </Item>
          </div>
          <div className="flex flex-col gap-2">
            <Item
              name="sex"
              initialValue={"male"}
              rules={[
                {
                  required: true,
                  message: "Please input your Sex!",
                },
              ]}
            >
              <Radio.Group>
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
              </Radio.Group>
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
              router.push("/login");
            }}
          >
            Have and account?
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default SignUpPage;
