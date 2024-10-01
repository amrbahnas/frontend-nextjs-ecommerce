"use client";
import Container from "@/components/container";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import { IoArrowBackCircle } from "react-icons/io5";
const Admin = ({ children }: { children?: React.ReactNode }) => {
  const router = useRouter();

  return (
    <div className="py-4">
      <Container>{children}</Container>
      <Button
        type="text"
        onClick={() => router.back()}
        className="!fixed -left-8 lg:left-12 bottom-1/2 !w-fit"
      >
        <IoArrowBackCircle fontSize="large" size={50} />
      </Button>
    </div>
  );
};

export default Admin;
