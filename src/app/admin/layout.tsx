"use client";
import React from "react";
import Link from "next/link";
import Container from "@/components/container";
import { IoArrowBackCircle } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { Button } from "antd";
const Admin = ({ children }: { children?: React.ReactNode }) => {
  const router = useRouter();
  return (
    <div className="bg-[#181826] p-5 h-screen overflow-hidden">
      <Container>{children}</Container>
      <Button
        type="text"
        onClick={() => router.back()}
        className="!fixed left-12 bottom-1/2 text-white cursor-pointer p-5 bg-[#181826] border-2 border-white rounded-full flex items-center justify-center"
      >
        <IoArrowBackCircle fontSize="large" color="white" size={50} />
      </Button>
    </div>
  );
};

export default Admin;
