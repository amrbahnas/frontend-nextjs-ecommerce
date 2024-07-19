import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">{children}</div>
  );
};

export default Container;
