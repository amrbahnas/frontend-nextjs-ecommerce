"use client";
import { useState } from "react";

import { Radio, RadioChangeEvent, Spin } from "antd";
import {
  useGetAdminCategories,
  useGetAdminProducts,
} from "./products/_api/query";
import AdminProductCard from "./_comps/adminProductCard";
import Link from "next/link";
const { Group } = Radio;
const Admin = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const { categories, isLoading } = useGetAdminCategories();
  const {
    products,
    isLoading: ProductsLoading,
    refetchProduct,
  } = useGetAdminProducts({
    category: selectedCategory,
  });

  return (
    <div className="">
      <div className="flex flex-col gap-3 p-4  text-white items-center justify-center  mb-20">
        <h1 className=" text-3xl  truncate sm:text-4xl font-bold text-primary">
          Welcome to Admin Page
        </h1>
      </div>
      <div className="  flex flex-col gap-4  w-full sm:w-[60%] mx-auto ">
        <ActionBox title="All Products" href="/admin/products" />
        <ActionBox title="Categories" href="/admin/categories" />
        <ActionBox title="Create New Product" href="/admin/products/create" />
      </div>
    </div>
  );
};

const ActionBox = ({ title, href }: { title: string; href: string }) => {
  return (
    <Link href={href}>
      <div className=" border h-28 flex justify-center items-center  rounded-md   hover:scale-105 shadow-md transition-all text-xl">
        {title}
      </div>
    </Link>
  );
};

export default Admin;
