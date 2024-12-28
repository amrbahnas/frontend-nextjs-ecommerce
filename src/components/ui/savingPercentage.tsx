import React from "react";
import { MdLocalOffer } from "react-icons/md";
import { useTranslations } from "next-intl";

const SavingPercentage = ({
  percentage,
  beforePrice = 1,
  afterPrice = 1,
  small = false,
}: {
  percentage?: number;
  beforePrice?: number;
  afterPrice?: number;
  small?: boolean;
}) => {
  const savedPercentage = Math.floor(
    ((beforePrice - afterPrice) / beforePrice) * 100
  );
  const t = useTranslations("SavingPercentage");
  return (
    <div
      className={`flex items-center gap-2 ${
        small ? "text-xs" : "text-sm"
      } text-gray-600 `}
    >
      <MdLocalOffer />
      <span className=" truncate">
        {t("saveNow", { percentage: percentage || savedPercentage })}
      </span>
    </div>
  );
};

export default SavingPercentage;
