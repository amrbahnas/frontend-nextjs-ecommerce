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
      className={classnames(" mt-2 md:mt-12 grid  gap-4", {
        // " grid-cols-autoFit-150  md:grid-cols-autoFit-250": length > 1,
        // "grid-cols-1  md:grid-cols-3 lg:grid-cols-4  ": length === 1,
        "grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl::grid-cols-5  ": true,
      })}
    >
      {children}
    </div>
  );
};

export default RenderedCardsGrid;
