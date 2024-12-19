"use client";
import { Spin } from "antd";
import Link from "next/link";
import { Suspense } from "react";
import CategoryFilter from "../_comps/categoryFilter";
import ProductsList from "./_comps/productsList";
import AdminPageTile from "../_comps/adminPageTile";

const AllProducts = () => {
  return (
    <div className="flex flex-col   text-white">
      <AdminPageTile>All Products</AdminPageTile>
      <span className=" block  text-black mb-1">All Categories:</span>
      <div className="flex  items-center justify-between flex-wrap mb-1">
        <CategoryFilter />

        <Link
          href="/admin/products/create"
          className="text-primary underline cursor-pointer flex items-center"
        >
          Add Product
        </Link>
      </div>

      <ProductsList />
    </div>
  );
};

export default AllProducts;
