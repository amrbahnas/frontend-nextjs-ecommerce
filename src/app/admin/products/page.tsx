"use client";
import { Spin } from "antd";
import Link from "next/link";
import { Suspense } from "react";
import CategoryFilter from "./_comps/categoryFilter";
import ProductsList from "./_comps/productsList";

const AllProducts = () => {
  return (
    <div className="flex flex-col gap-3  text-white">
      <span className=" block mb-1 text-black">All Categories:</span>
      <div className="flex  items-center justify-between flex-wrap">
        <Suspense fallback={<Spin />}>
          <CategoryFilter />
        </Suspense>
        <Link
          href="/admin/products/create"
          className="text-primary underline cursor-pointer flex items-center"
        >
          Add Product
        </Link>
      </div>

      <Suspense fallback={<Spin />}>
        <ProductsList />
      </Suspense>
    </div>
  );
};

export default AllProducts;
