import React from "react";
import { MdLocalOffer } from "react-icons/md";

const SavingPercentage = ({
  percentage,
  beforePrice = 1,
  afterPrice = 1,
}: {
  percentage?: number;
  beforePrice?: number;
  afterPrice?: number;
}) => {
  const savedPercentage = Math.floor(
    ((beforePrice - afterPrice) / beforePrice) * 100
  );
  return (
    <div className="flex items-center gap-2 text-sm text-gray-600 ">
      <MdLocalOffer />
      <span>Save {percentage || savedPercentage}% right now</span>
    </div>
  );
};

export default SavingPercentage;
