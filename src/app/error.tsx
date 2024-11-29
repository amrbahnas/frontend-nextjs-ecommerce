"use client";
import { Result } from "antd";

const Error = () => {
  return (
    <Result
      status="warning"
      title="There are some problems with your operation."
    />
  );
};

export default Error;
