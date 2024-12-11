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
  const t = useTranslations('Product');
  
  return (
    <div className="px-3 space-y-1 mt-2">
      <div className="flex justify-between flex-col md:flex-row">
        <span className="font-medium  text-lg  md:text-xl  truncate">
          {t('title', { title })}
        </span>
        <DisplayPrice
          afterPrice={price}
          beforePrice={price + 50}
          afterPriceClassName="text-xl md:text-2xl"
          beforePriceClassName="!text-md md:!text-lg"
        />
      </div>
      <Rate
        defaultValue={ratingsAverage}
        disabled
        className="!text-sm"
        tooltips={[
          t('terrible'),
          t('bad'),
          t('normal'),
          t('good'),
          t('wonderful')
        ]}
      />
      <p className="text-gray-500 text-sm line-clamp-2">{t('description', { description })}</p>
      <SavingPercentage beforePrice={price + 50} afterPrice={price} />
    </div>
  );
};

export default PrDescription;
