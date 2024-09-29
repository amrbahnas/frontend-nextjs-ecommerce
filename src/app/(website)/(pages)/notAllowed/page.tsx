"use client";
import { useSearchParams } from "next/navigation";
import React from "react";

const NotAllowed = () => {
  const searchParams = useSearchParams();

  const targetPage = searchParams.get("page");

  if (targetPage) {
    return (
      <div className="flex justify-center items-center  h-96">
        <div className="text-2xl">
          You are not allowed to access
          <span className="text-red-500"> {targetPage} </span> page
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-96">
      <div className="text-2xl">You are not allowed to access this page</div>
    </div>
  );
};

export default NotAllowed;
