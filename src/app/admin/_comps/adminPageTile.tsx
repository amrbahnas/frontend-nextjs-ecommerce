import { Divider } from "antd";
import React, { PropsWithChildren } from "react";

const AdminPageTile = ({ children }: PropsWithChildren) => {
  return (
    <Divider orientation="left" className="!mt-0">
      <h1 className=" text-3xl  sm:text-4xl font-bold text-primary">
        {children}
      </h1>
    </Divider>
  );
};

export default AdminPageTile;
