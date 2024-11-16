import React from "react";
import classnames from "classnames";

const RenderedCardsGrid = ({
  children,
  length,
  minCardWidth,
}: {
  children: React.ReactNode;
  length: number;
  minCardWidth?: number;
}) => {
  return (
    <div
      className={classnames(" mt-12 grid  gap-4", {
        " grid-cols-autoFit-150  md:grid-cols-autoFit-250": length > 1,
        "grid-cols-1  md:grid-cols-3 lg:grid-cols-4  ": length === 1,
      })}
    >
      {children}
    </div>
  );
};

export default RenderedCardsGrid;
