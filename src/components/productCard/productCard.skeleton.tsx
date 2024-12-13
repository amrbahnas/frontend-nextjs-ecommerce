"use client";
import { Skeleton } from "antd";
import ImageSkeleton from "../ui/imageSkeleton";

const ProductCardSkeleton = () => {
  return (
    <div className=" flex flex-col gap-4  bg-gray-100   overflow-hidden rounded-md  hover:shadow-lg  relative">
      <div className="relative w-full h-40 md:h-72 overflow-hidden">
        <ImageSkeleton />
      </div>
      <div className="p-4">
        <Skeleton active />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
