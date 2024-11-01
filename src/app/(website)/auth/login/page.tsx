"use client";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import { useLogin } from "../_api/mutation";
import Item from "@/components/antd/item";
import { Error } from "@/components/ui/error";
import { useLogout } from "@/hooks/global/useLogout";
import { useEffect } from "react";
import useAuthStore from "@/store/useAuthStore";

const LoginPage = ({}) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const { login, loginError, loginPending } = useLogin();
  const isLogin = useAuthStore((state) => state.isLogin);
  const { logout } = useLogout("");

  useEffect(() => {
    isLogin && logout();
  }, []); // do not change dependencies

  return (
    <div className="h-[calc(100dvh-80px)] mx-auto w-[80%]  lg:w-[30%]   mt-10 ">
      <Form
        className="flex flex-col gap-5 w-full"
        form={form}
        layout="vertical"
        onFinish={login}
      >
        <h1 className="text-2xl font-semibold">Login</h1>
        <Error error={loginError} />
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
            size="large"
            className=" rounded-md p-4"
          />
        </Item>
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
            name="password"
            size="large"
            placeholder="Enter your password"
            className=" rounded-md p-4"
          />
        </Item>

        <div
          className="text-sm underline cursor-pointer"
          onClick={() => router.push("/auth/forgot-password")}
        >
          Forgot Password?
        </div>

        <Button
          className="bg-lama text-white p-2 rounded-md disabled:bg-pink-200 disabled:cursor-not-allowed"
          disabled={loginPending}
          loading={loginPending}
          htmlType="submit"
          type="primary"
          size="large"
        >
          {loginPending ? "Loading..." : "Login"}
        </Button>

        <div
          className="text-sm underline cursor-pointer"
          onClick={() => router.push("/auth/signup")}
        >
          {"Don't"} have an account?
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;
