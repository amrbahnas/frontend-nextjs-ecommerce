"use client";
import { Spin } from "antd";
import { Suspense } from "react";
import RenderNotAllowMessage from "./_comps/renderNotAllowMessage";

const NotAllowed = () => {
  return <RenderNotAllowMessage />;
};

export default NotAllowed;
