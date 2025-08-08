import DisplayPrice from "@/components/ui/displayPrice";
import SavingPercentage from "@/components/ui/savingPercentage";
import { Rate } from "antd";
import React from "react";
import { useTranslations } from "next-intl";

const PrDescription = ({
  title,
  price,
  ratingsAverage,
  description,
}: {
  title: string;
  price: number;
  ratingsAverage: number;
  description: string;
}) => {
  const t = useTranslations("Product");

  return (
    <div className="p-3 space-y-2">
      {/* Title */}
      <h3 className="font-medium  line-clamp-1 text-gray-900 dark:text-dark-text text-sm leading-tight sm:line-clamp-2 hover:text-primary transition-colors duration-200">
        {t("title", { title })}
      </h3>

      {/* Price Section - More compact and responsive */}
      <div className="flex  flex-col gap-1.5">
        <DisplayPrice
          afterPrice={price}
          beforePrice={price + 50}
          afterPriceClassName="text-base font-semibold text-primary"
          beforePriceClassName="text-xs text-gray-400 dark:text-gray-500 line-through"
        />
        <div className="inline-block px-2 py-0.5 bg-green-50 dark:bg-green-900/20 rounded-full  w-fit">
          <span className="text-[10px] font-medium text-green-600 dark:text-green-400 whitespace-nowrap ">
            <SavingPercentage
              small
              beforePrice={price + 50}
              afterPrice={price}
            />
          </span>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1.5">
        <Rate
          defaultValue={ratingsAverage}
          disabled
          className="!text-xs"
          tooltips={[
            t("terrible"),
            t("bad"),
            t("normal"),
            t("good"),
            t("wonderful"),
          ]}
        />
        <span className="text-xs text-gray-500 dark:text-dark-text-secondary">
          ({ratingsAverage})
        </span>
      </div>

      {/* Description - Optional, can be removed if too crowded */}
      <p className="text-xs text-gray-600 dark:text-dark-text-secondary line-clamp-1 h-4">
        {t("description", { description })}
      </p>
    </div>
  );
};

export default PrDescription;
