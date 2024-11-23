"use client";
import AddProductToCard from "@/components/addProductToCard";
import WishlistButton from "@/components/addProductToWishlist";
import { Divider } from "antd";
import { useState } from "react";
import ColorSelector from "./colorSelector";
import SizeSelector from "./sizeSelector";

const Add = ({ product }: { product: Product }) => {
  const {
    _id,
    colors = [],
    availableSizes = [],
    quantity: productQuantity,
  } = product;
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState(colors[0]);
  const [size, setSize] = useState(availableSizes[0] || "");
  const stockNumber = productQuantity - quantity;

  const handleQuantity = (type: "i" | "d") => {
    if (type === "d" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
    if (type === "i" && quantity < productQuantity) {
      setQuantity((prev) => prev + 1);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="w-1/2">
        <SizeSelector
          availableSizes={availableSizes}
          selectedSize={size}
          setSelectedSize={setSize}
        />
      </div>
      <Divider className="!my-2" />
      <ColorSelector
        availableColors={colors}
        selectedColor={color}
        setSelectedColor={setColor}
      />
      <Divider className="!my-2" />
      <h4 className="font-medium">Quantity</h4>
      <div className="flex  flex-col gap-6">
        <div className="flex items-center gap-4">
          <div className="bg-gray-100 py-2 px-4 rounded-3xl flex items-center justify-between w-32">
            <button
              className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
              onClick={() => handleQuantity("d")}
              disabled={quantity === 1}
            >
              -
            </button>
            {quantity}
            <button
              className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
              onClick={() => handleQuantity("i")}
              disabled={quantity === productQuantity}
            >
              +
            </button>
          </div>
          {productQuantity === 0 ? (
            <div className="text-lg text-red-500 font-bold">
              Product is out of stock
            </div>
          ) : (
            <div className="text-xs">
              Only <span className="text-orange-500">{stockNumber} items</span>{" "}
              left!
              <br /> {"Don't"} miss it
            </div>
          )}
        </div>
        <div className=" flex items-center gap-5">
          <AddProductToCard
            disabled={stockNumber < 1 || productQuantity === 0}
            product={product}
            buttonStyle={{
              buttonClassName: "!w-[50%]",
              buttonSize: "large",
              buttonType: "primary",
            }}
            productOptions={{
              color: color || "black",
              quantity: quantity,
              size: size,
            }}
          />
          <WishlistButton
            productId={_id}
            className=" border p-2 rounded-md  border-gray-300"
          />
        </div>
      </div>
    </div>
  );
};

export default Add;
