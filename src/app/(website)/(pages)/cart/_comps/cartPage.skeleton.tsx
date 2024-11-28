import Container from "@/components/container";
import { Skeleton } from "antd";
import React from "react";

const CartPageSkeleton = () => {
  return (
    <Container>
      <div className="flex flex-col md:flex-row mt-6 gap-4 md:gap-32 items-center">
        <div className="flex flex-col gap-8 h-80 overflow-scroll w-full md:flex-1">
          <Skeleton.Input active className="!w-full !h-16" />
          <Skeleton.Input active className="!w-full !h-16" />
          <Skeleton.Input active className="!w-full !h-16" />
        </div>
        <div className="w-full md:w-72 flex flex-col gap-4">
          <Skeleton.Input active size="small" className="!w-full" />
          <Skeleton.Input active size="small" className="!w-full" />
          <Skeleton.Input active size="small" className="!w-full" />
          <Skeleton.Input active size="small" className="!w-full" />
          <Skeleton.Input active size="small" className="!w-full" />
          <Skeleton.Input active size="small" className="!w-full" />
          <Skeleton.Input active size="small" className="!w-full" />
          <Skeleton.Input active size="small" className="!w-full" />
          <Skeleton.Input active size="small" className="!w-full" />
          <Skeleton.Input active size="small" className="!w-full" />
        </div>
      </div>
    </Container>
  );
};

export default CartPageSkeleton;
