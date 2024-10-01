"use client";
import Container from "@/components/container";
import { Button, Skeleton } from "antd";
import Image from "next/image";
import React, { Suspense } from "react";
import ProductSection from "./_comps/productSection";
import Filter from "./_comps/filter";
import NextImage from "@/components/nextImage";

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
          <NextImage src="/woman.png" alt="" fill className="object-contain" />
        </div>
      </div>
      {/* FILTER */}
      {/* using Suspense because Filter using useParamsService() hook */}
      <Suspense fallback={<Skeleton active />}>
        <Filter />
      </Suspense>
      {/* PRODUCTS */}
      <h1 className="mt-12 text-xl font-semibold">For You!</h1>
      {/* using Suspense because ProductSection using useSearchParams() hook */}
      <Suspense fallback={<Skeleton active />}>
        <ProductSection />
      </Suspense>
    </Container>
  );
};

export default ListPage;
