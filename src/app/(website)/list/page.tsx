"use client";
import Container from "@/components/container";
import Filter from "@/components/filter";
import ProductList from "@/components/productList";
import { Button, Skeleton } from "antd";
import Image from "next/image";
import React, { Suspense } from "react";
import ProductListSection from "./_comps/productList";

const ListPage = () => {
  return (
    <Container>
      {/* CAMPAIGN */}
      <div className="hidden bg-pink-50 px-4 sm:flex justify-between h-64">
        <div className="w-2/3 flex flex-col items-center justify-center gap-8">
          <h1 className="text-4xl font-semibold leading-[48px] text-gray-700">
            Grab up to 50% off on
            <br /> Selected Products
          </h1>
          <Button className="rounded-3xl !bg-lama !text-white w-max !py-4 px-5 text-sm">
            Buy Now
          </Button>
        </div>
        <div className="relative w-1/3">
          <Image src="/woman.png" alt="" fill className="object-contain" />
        </div>
      </div>
      {/* FILTER */}
      <Filter />
      {/* PRODUCTS */}
      <h1 className="mt-12 text-xl font-semibold">For You!</h1>
      <Suspense fallback={"loading"}>
        <ProductListSection />
      </Suspense>
    </Container>
  );
};

export default ListPage;
