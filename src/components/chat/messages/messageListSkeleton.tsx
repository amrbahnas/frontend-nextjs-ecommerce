import { Skeleton } from "antd";
import classNames from "classnames";

export const MessageListSkeleton = () => {
  return (
    <div className="flex-1  overflow-y-auto space-y-4 w-full">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div
          key={item}
          className={classNames(
            "flex",
            item % 2 === 0 ? "justify-end " : "justify-start"
          )}
        >
          <div
            key={item}
            className={classNames(
              "flex gap-2 w-full",
              item % 2 === 0 ? "flex-row-reverse" : "flex-row"
            )}
          >
            <Skeleton.Avatar active size="small" className="mt-1" />
            <div className="max-w-[70%] ">
              <Skeleton.Input
                active
                size="large"
                className="!w-[200px]  !bg-gray-50 "
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
