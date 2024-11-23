"use client";
import Container from "@/components/container";
import LoadingPage from "@/components/loadingPage";
import useAuthStore from "@/store/useAuthStore";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { IoArrowBackCircle } from "react-icons/io5";
const Admin = ({ children }: { children?: React.ReactNode }) => {
  const route = useRouter();
  const { isAdmin, isLogin } = useAuthStore();

  useEffect(() => {
    if (!isAdmin) {
      route.push("/");
    }
  }, [isAdmin]);

  if (!isLogin || !isAdmin) {
    return <LoadingPage />;
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
