import AddProductToCard from "@/components/addProductToCard";
import { Tag, Tooltip } from "antd";
import React, { memo } from "react";

const PrAddToCart = ({
  product,
  availableSizes,
  colors,
  quantity,
}: {
  product: Product;
  availableSizes: ProductSize[];
  colors: string[];
  quantity: number;
}) => {
  return (
    <div className="">
      {quantity === 0 ? (
        <div className=" h-8 flex items-center">
          <Tooltip
            title={quantity === 0 && "No stock available for this product"}
          >
            <Tag color="red">Out of stock</Tag>
          </Tooltip>
        </div>
      ) : (
        <AddProductToCard
          product={product}
          productOptions={{
            color: colors[0],
            quantity: 1,
            size: availableSizes[0],
          }}
          buttonStyle={{
            buttonClassName: " !w-26",
          }}
        />
      )}
    </div>
  );
};

export default memo(PrAddToCart);
