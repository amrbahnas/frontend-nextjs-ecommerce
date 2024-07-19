"use client";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import { useLogin } from "../_api/mutation";
import Item from "@/components/item";

const LoginPage = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const { login, loginError, loginPending } = useLogin();

  return (
    <div className="h-[calc(100vh-80px)] px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex items-center justify-center">
      <Form
        className="flex flex-col gap-5 "
        form={form}
        layout="vertical"
        onFinish={login}
      >
        <h1 className="text-2xl font-semibold">Login</h1>
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
        >
          {loginPending ? "Loading..." : "Login"}
        </Button>
        {loginError && <div className="text-red-600">{String(loginError)}</div>}

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
console.log("🚀 ~ LoginPage ~ process.env.BASE_URL:", process.env.BASE_URL);
console.log("🚀 ~ LoginPage ~ process.env.BASE_URL:", process.env.BASE_URL);
console.log("🚀 ~ LoginPage ~ process.env.BASE_URL:", process.env.BASE_URL);
console.log("🚀 ~ LoginPage ~ process.env.BASE_URL:", process.env.BASE_URL);
console.log("🚀 ~ LoginPage ~ process.env.BASE_URL:", process.env.BASE_URL);
console.log("🚀 ~ LoginPage ~ process.env.BASE_URL:", process.env.BASE_URL);
console.log("🚀 ~ LoginPage ~ process.env.BASE_URL:", process.env.BASE_URL);
console.log("🚀 ~ LoginPage ~ process.env.BASE_URL:", process.env.BASE_URL);
console.log("🚀 ~ LoginPage ~ process.env.BASE_URL:", process.env.BASE_URL);
console.log("🚀 ~ LoginPage ~ process.env.BASE_URL:", process.env.BASE_URL);
console.log("🚀 ~ LoginPage ~ process.env.BASE_URL:", process.env.BASE_URL);

export default LoginPage;
