"use client";
import Container from "@/components/container";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { IoArrowBackCircle } from "react-icons/io5";
import { useVerifyToken } from "../(website)/_api/query";
import useAuthStore from "@/store/useAuthStore";
const Admin = ({ children }: { children?: React.ReactNode }) => {
  const route = useRouter();
  // const { tokenData } = useVerifyToken();
  const { isAdmin, isLogin } = useAuthStore();

  // useEffect(() => {
  //   if (!tokenData?.isAdmin) {
  //     route.push("/");
  //   }
  // }, [tokenData]);

  if (!isLogin || !isAdmin) {
    return route.push("/");
  }

  return (
    <div className="py-4">
      <Container>{children}</Container>
      <Button
        type="text"
        onClick={() => route.back()}
        className="!fixed -left-8 lg:left-12 bottom-8 !w-fit"
      >
        <IoArrowBackCircle fontSize="large" size={50} />
      </Button>
    </div>
  );
};

export default Admin;
