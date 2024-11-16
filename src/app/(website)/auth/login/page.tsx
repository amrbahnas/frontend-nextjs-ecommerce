"use client";
import Item from "@/components/antd/item";
import Container from "@/components/container";
import { Error } from "@/components/ui/error";
import { useLogout } from "@/hooks/global/useLogout";
import useAuthStore from "@/store/useAuthStore";
import { Button, Divider, Form, Input } from "antd";
import Link from "next/link";
import { useEffect } from "react";
import { useLogin } from "../_api/mutation";

const LoginPage = ({}) => {
  const [form] = Form.useForm();
  const { login, loginError, loginPending } = useLogin();
  const isLogin = useAuthStore((state) => state.isLogin);
  const { logout } = useLogout("");

  useEffect(() => {
    isLogin && logout();
  }, []); // do not change dependencies

  return (
    <Container className=" flex items-center justify-center gap-4 mt-5">
      <div className="w-1/2 hidden md:block">
        <img src="/loginBg.png" alt="login" className=" w-[80%]" />
      </div>
      <div className=" w-full md:w-1/2  bg-white">
        <Form
          className="flex flex-col gap-5 w-full  border !p-4 md:!p-8 rounded-md shadow-md "
          form={form}
          layout="vertical"
          onFinish={login}
        >
          <Divider orientation="center">
            <h1 className="text-2xl md:text-3xl font-semibold text-primary">
              Login
            </h1>
          </Divider>
          <div className="flex items-center gap-2">
            <Error error={loginError} />
            {loginError && loginError.includes("not active") && (
              <Link href="/inactiveAccount" className=" underline">
                More Details
              </Link>
            )}
          </div>
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
          <Link
            className="text-sm underline cursor-pointer"
            href={"/auth/forgot-password"}
          >
            Forgot Password?
          </Link>
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
          <Link
            className="text-sm underline cursor-pointer text-gray-600"
            href={"/auth/signup"}
          >
            {"Don't"} have an account?
          </Link>
        </Form>
      </div>
    </Container>
  );
};

export default LoginPage;
