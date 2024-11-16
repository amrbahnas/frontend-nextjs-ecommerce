"use client";
import { Button, Result } from "antd";
import { useRouter } from "next/navigation";

const NotAllowed = () => {
  const route = useRouter();

  return (
    <div className="flex justify-center items-center h-96 mt-4">
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Button onClick={() => route.push("/")} type="primary">
            Back Home
          </Button>
        }
      />
    </div>
  );
};

export default NotAllowed;
