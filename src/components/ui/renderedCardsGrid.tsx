import React from "react";
import classnames from "classnames";

const RenderedCardsGrid = ({
  children,
  length,
  minCardWidth,
  customColsNum,
}: {
  children: React.ReactNode;
  length: number;
  minCardWidth?: number;
  customColsNum?: number;
}) => {
  return (
    <div
      className={classnames("grid gap-4", {
        "grid-cols-2 md:grid-cols-3 lg:grid-cols-4": !customColsNum,
        [`grid-cols-${customColsNum}`]: customColsNum,
      })}
    >
      {children}
    </div>
  );
};

export default RenderedCardsGrid;
