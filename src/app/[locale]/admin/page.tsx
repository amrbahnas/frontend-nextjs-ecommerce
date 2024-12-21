"use client";

import Container from "@/components/container";
import Link from "next/link";

const Admin = () => {
  return (
    <div className=" mb-10">
      <div className="flex flex-col gap-3 p-4  text-white items-center justify-center  mb-20">
        <h1 className=" text-3xl  truncate sm:text-4xl font-bold text-primary">
          Welcome to Admin Page
        </h1>
      </div>
      <div className="  flex flex-col gap-4  w-full sm:w-[60%] mx-auto ">
        <ActionBox title="All Products" href="/admin/products" />
        <ActionBox title="Categories" href="/admin/categories" />
        <ActionBox title="Sub-Category" href="/admin/sub-category" />
        <ActionBox title="Orders" href="/admin/orders" />
        <ActionBox title="Coupons" href="/admin/coupons" />
        <ActionBox title="Create New Product" href="/admin/products/create" />
      </div>
    </div>
  );
};

const ActionBox = ({ title, href }: { title: string; href: string }) => {
  return (
    <Link href={href}>
      <div className=" border h-28 flex justify-center items-center  rounded-md  bg-gray-100  hover:scale-105 shadow-md transition-all text-xl">
        {title}
      </div>
    </Link>
  );
};

export default Admin;
