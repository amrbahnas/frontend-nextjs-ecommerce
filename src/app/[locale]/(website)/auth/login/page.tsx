"use client";
import Item from "@/components/antd/item";
import Container from "@/components/container";
import { Error } from "@/components/ui/error";
import useParamsService from "@/hooks/global/useParamsService";
import { Button, Divider, Form, Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaGoogle } from "react-icons/fa";
import { useLogin } from "../_api/mutation";
import useAuthStore from "@/store/useAuthStore";
import { useLogout } from "@/hooks/global/useLogout";
const { Password } = Input;

const LoginPage = ({}) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const isLogin = useAuthStore((state) => state.isLogin);
  const { logout } = useLogout();
  const { login, loginError, loginPending, onLoginSuccess } = useLogin();
  const { getParams } = useParamsService({});

  useEffect(() => {
    const googleAuth = getParams("googleAuth");
    if (googleAuth) {
      const isActive = getParams("active");
      const jsonUser = getParams("user") || "";
      if (isActive === "true") {
        const user = JSON.parse(jsonUser);
        onLoginSuccess(user);
      } else {
        router.push("/inactiveAccount");
      }
    }
  }, []);

  useEffect(() => {
    if (isLogin) {
      logout();
    }
  }, []);

  return (
    <Container className=" flex items-center justify-center gap-4 mt-5">
      <div className="w-1/2 hidden md:block">
        <img src="/loginBg.png" alt="login" className=" w-[80%]" />
      </div>
      <div className=" w-full md:w-1/2 ">
        <div className=" w-full bg-white border !p-4 md:!p-8 rounded-md shadow-md ">
          <Divider orientation="center">
            <h1 className="text-2xl md:text-3xl font-semibold text-primary">
              Login
            </h1>
          </Divider>
          {/* <a href={`${process.env.NEXT_PUBLIC_BASE_URL}/auth/google`}>
            <Button size="large" className="!w-full" icon={<FaGoogle />}>
              Login with Google
            </Button>
          </a> */}
          <Divider>Or</Divider>
          {loginError && (
            <div className="flex items-center gap-2 mb-5">
              <Error error={loginError} />
              {loginError && loginError.includes("not active") && (
                <Link href="/inactiveAccount" className=" underline">
                  More Details
                </Link>
              )}
            </div>
          )}
          <Form
            validateTrigger="onBlur"
            className="flex flex-col gap-5 w-full  "
            form={form}
            layout="vertical"
            onFinish={login}
          >
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
              <Password
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
      </div>
    </Container>
  );
};

export default LoginPage;
