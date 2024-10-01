import Image from "next/image";
import Link from "next/link";

import AddProductToCard from "./addProductToCard";
import NextImage from "./nextImage";
import { Divider } from "antd";

const ProductCard = ({ product }: { product: Product }) => {
  console.log("🚀 ~ ProductCard ~ product:", product);
  return (
    <div className=" flex flex-col gap-4  bg-gray-100   overflow-hidden rounded-md  hover:shadow-lg">
      <Link href={"/product/" + product._id} key={product._id}>
        <div className="relative w-full h-72 overflow-hidden">
          <NextImage
            src={product?.imageCover || "/product.png"}
            alt=""
            fill
            sizes="25vw"
            className=" object-cover "
            // className="absolute object-cover z-10 hover:opacity-0 transition-opacity easy duration-500"
          />
          {/* {product.images[0] && (
            <NextImage
              src={product.images[0] || "/product.png"}
              alt=""
              fill
              sizes="25vw"
              className="absolute object-cover rounded-md"
            />
          )} */}
        </div>
        <div className="flex justify-between mt-2 px-3">
          <span className="font-medium ">{product.title}</span>
          <span className="font-semibold">${product.price}</span>
        </div>
        <span
          className="px-3 text-sm text-gray-700"
          style={{ height: "3rem", overflow: "hidden" }}
        >
          {product.description}
        </span>
      </Link>
      <Divider className="!my-0" />
      <div className="px-3 pb-3">
        <AddProductToCard
          product={product}
          options={{ color: product.colors[0], quantity: 1 }}
        />
      </div>
    </div>
  );
};

export default ProductCard;
