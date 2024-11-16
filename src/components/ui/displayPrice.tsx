import React from "react";
import { MdLocalOffer } from "react-icons/md";

interface DisplayPriceProps {
  afterPrice: number;
  beforePrice: number;
  hideSavedPercentage?: boolean;
  afterPriceClassName?: string;
  beforePriceClassName?: string;
  priceContainerClassName?: string;
}

const DisplayPrice: React.FC<DisplayPriceProps> = ({
  afterPrice,
  beforePrice,
  hideSavedPercentage,
  afterPriceClassName,
  beforePriceClassName,
  priceContainerClassName,
}) => {
  const savedPercentage = Math.floor(
    ((beforePrice - afterPrice) / beforePrice) * 100
  );
  return (
    <div>
      <div className={"flex items-center gap-4 " + priceContainerClassName}>
        <h2 className={"font-bold text-2xl " + afterPriceClassName}>
          ${afterPrice}
        </h2>
        <h3
          className={
            "text-xl text-gray-500 line-through " + beforePriceClassName
          }
        >
          ${beforePrice}
        </h3>
      </div>
      {!hideSavedPercentage && (
        <div className="flex items-center gap-2 text-sm text-gray-600  mt-2">
          <MdLocalOffer />
          <span>Save {savedPercentage}% right now</span>
        </div>
      )}
    </div>
  );
};

export default DisplayPrice;
