import React from "react";

const Pricing = ({
  totalCartPrice,
  totalPriceAfterDiscount,
}: {
  totalCartPrice: number;
  totalPriceAfterDiscount: number;
}) => {
  return (
    <div>
      <div className="flex items-center justify-between font-semibold">
        <span className="">Total Price:</span>
        <span className="">${totalCartPrice}</span>
      </div>
      {totalPriceAfterDiscount < totalCartPrice && (
        <>
          <div className="flex items-center justify-between font-semibold text-gray-500">
            <span className="">
              Coupon Discount:{" "}
              {Math.floor(
                ((totalCartPrice - totalPriceAfterDiscount) / totalCartPrice) *
                  100
              )}
              %
            </span>
            <span className="">
              ${Math.floor(totalCartPrice - totalPriceAfterDiscount)} -
            </span>
          </div>
          <div className="flex items-center justify-between font-bold">
            <span className="">Final Price:</span>
            <span className=" text-lg">${totalPriceAfterDiscount}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default Pricing;
