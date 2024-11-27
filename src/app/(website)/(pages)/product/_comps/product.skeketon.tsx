"use client";

import Container from "@/components/container";
import { Skeleton } from "antd";

const ProductSkeleton = () => {
  return (
    <Container className="mt-8">
      <div className=" relative flex flex-col lg:flex-row gap-16">
        <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
          <Skeleton.Image className="!w-full !h-80" active />
        </div>

        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <Skeleton active />
          <div className="h-[2px] bg-gray-100" />

          <div className="flex items-center gap-4">
            <Skeleton.Button active />
          </div>

          <div className="h-[2px] bg-gray-100" />

          <Skeleton.Button active />
          <div className="h-[2px] bg-gray-100" />

          <div className="h-[2px] bg-gray-100" />

          <h1 className="text-2xl">User Reviews</h1>

          <div>
            <Skeleton active />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProductSkeleton;
