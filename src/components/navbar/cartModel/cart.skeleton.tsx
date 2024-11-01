import { Skeleton } from "antd";

const CartSkeleton = () => {
  return (
    <div className="  flex flex-col gap-6 z-20 w-64">
      {/* reset */}
      <div className=" w-full mt-2 flex gap-14 ">
        <Skeleton.Input active size="small" className="!w-full" />
      </div>
      {/* LIST */}
      <div className="flex flex-col gap-6">
        {/* ITEM */}
        <Skeleton.Input active className="!w-full !h-16" />
        <Skeleton.Input active className="!w-full !h-16" />
      </div>
      {/* BOTTOM */}
      <div className="w-full">
        <div className="  w-full flex gap-4 items-center">
          <Skeleton.Input active size="small" className=" !min-w-4" />
          <Skeleton.Input active size="small" className=" !min-w-4" />
        </div>

        <div className="mt-4">
          <Skeleton.Input active className="!w-full" />
        </div>
      </div>
    </div>
  );
};

export default CartSkeleton;
