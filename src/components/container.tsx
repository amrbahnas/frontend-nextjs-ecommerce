import React from "react";

const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={" px-4 md:px-8 lg:px-12 xl:px-24 2xl:px-40 " + className}>
      {children}
    </div>
  );
};

export default Container;
