import React from "react";

const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={" px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 " + className}>
      {children}
    </div>
  );
};

export default Container;
