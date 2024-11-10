import { Divider, Skeleton, Spin } from "antd";

const ReviewsSkeleton = () => {
  return (
    <>
      <h1 className="text-2xl">
        User Reviews
        <Skeleton.Button active size="small" shape="circle" className="ml-1" />
      </h1>

      <div className=" space-y-6 ">
        <Skeleton.Input active size="large" />
        <Divider />
        <div className=" flex flex-col gap-4 max-h-96 overflow-scroll">
          <Skeleton active />
        </div>
      </div>
    </>
  );
};

export default ReviewsSkeleton;
