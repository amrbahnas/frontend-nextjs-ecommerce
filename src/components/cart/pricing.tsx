import React from "react";
import { useTranslations } from "next-intl";

const Pricing = ({
  totalCartPrice,
  totalPriceAfterDiscount,
}: {
  totalCartPrice: number;
  totalPriceAfterDiscount: number;
}) => {
  const t = useTranslations("Cart.pricing");
  const discountPercentage = Math.floor(
    ((totalCartPrice - totalPriceAfterDiscount) / totalCartPrice) * 100
  );
  const discountAmount = Math.floor(totalCartPrice - totalPriceAfterDiscount);

  return (
    <div>
      <div className="flex items-center justify-between font-semibold">
        <span className="">{t("totalPrice")}:</span>
        <span className="">
          {t("currency")}
          {totalCartPrice}
        </span>
      </div>
      {totalPriceAfterDiscount < totalCartPrice && (
        <>
          <div className="flex items-center justify-between font-semibold text-gray-500">
            <span className="">
              {t("couponDiscount")}:{" "}
              {t("discount.percentage", { percentage: discountPercentage })}
            </span>
            <span className="">
              {t("discount.amount", { amount: discountAmount })}
            </span>
          </div>
          <div className="flex items-center justify-between font-bold">
            <span className="">{t("finalPrice")}:</span>
            <span className="text-lg">
              {t("currency")}
              {totalPriceAfterDiscount?.toFixed(2)}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default Pricing;
