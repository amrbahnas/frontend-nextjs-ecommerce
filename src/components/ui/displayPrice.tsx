import React from "react";

interface DisplayPriceProps {
  afterPrice: number;
  beforePrice: number;
  afterPriceClassName?: string;
  beforePriceClassName?: string;
  priceContainerClassName?: string;
}

const DisplayPrice: React.FC<DisplayPriceProps> = ({
  afterPrice,
  beforePrice,
  afterPriceClassName,
  beforePriceClassName,
  priceContainerClassName,
}) => {
  return (
    <div className={"flex items-center gap-4 " + priceContainerClassName}>
      <h2 className={"font-bold text-2xl " + afterPriceClassName}>
        ${afterPrice}
      </h2>
      <h3
        className={"text-xl text-gray-500 line-through " + beforePriceClassName}
      >
        ${beforePrice}
      </h3>
    </div>
  );
};

export default DisplayPrice;
