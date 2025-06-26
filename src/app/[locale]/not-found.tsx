"use client";
import { Button, Result } from "antd";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const route = useRouter();

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button onClick={() => route.push("/")} type="primary">
          Back Home
        </Button>
      }
    />
  );
};

export default NotFound;
