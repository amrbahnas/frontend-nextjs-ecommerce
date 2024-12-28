import React from "react";
import { Divider, Segmented } from "antd";
const SizeSelector = ({
  availableSizes = [],
  selectedSize,
  setSelectedSize,
}: {
  availableSizes: ProductSize[];
  selectedSize: ProductSize | "";
  setSelectedSize: (size: ProductSize) => void;
}) => {
  if (availableSizes.length === 0) return null;
  return (
    <div className="w-1/2">
      <h4 className="font-medium mb-2">Size</h4>
      <Segmented<ProductSize>
        size="large"
        value={selectedSize || availableSizes[0]}
        options={availableSizes}
        onChange={setSelectedSize}
        block
      />
      <Divider className="!my-2" />
    </div>
  );
};

export default SizeSelector;
