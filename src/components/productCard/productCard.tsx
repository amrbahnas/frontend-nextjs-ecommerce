import Link from "next/link";

import { Divider, Rate, Tag, Tooltip } from "antd";
import AddProductToCard from "../addProductToCard";
import WishlistButton from "../addProductToWishlist";
import NextImage from "../ui/nextImage";
import ProductStatusBadge from "./productStatusBadge";
import DisplayPrice from "../ui/displayPrice";
import SavingPercentage from "../ui/savingPercentage";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <ProductStatusBadge status={product.status}>
      <div className=" flex flex-col gap-4  bg-gray-100   overflow-hidden rounded-md  hover:shadow-lg  relative min-w-100">
        <Link href={"/product/" + product._id} key={product._id}>
          <div className="relative w-full h-40 md:h-72 overflow-hidden">
            <NextImage
              src={product?.imageCover || "/product.png"}
              alt=""
              fill
              sizes="25vw"
              className=" object-cover  md:object-cover"
            />
          </div>
          <div className="px-3 space-y-1 mt-2">
            <div className="flex justify-between flex-col md:flex-row">
              <span className="font-medium  text-lg  md:text-xl  truncate">
                {product.title}
              </span>
              <DisplayPrice
                afterPrice={product.price}
                beforePrice={product.price + 50}
                afterPriceClassName="text-xl md:text-2xl"
                beforePriceClassName="!text-md md:!text-lg"
              />
            </div>
            <Rate
              defaultValue={product.ratingsAverage}
              disabled
              className=" !text-sm !block"
            />
            <span className=" text-sm text-gray-700 !block truncate">
              {product.description}
            </span>
            <SavingPercentage
              beforePrice={product.price + 50}
              afterPrice={product.price}
            />
          </div>
        </Link>
        <WishlistButton
          productId={product._id}
          className="absolute top-4 left-4 "
        />
        <Divider className="!my-0" />
        <div className="px-3 pb-3">
          {product?.quantity === 0 ? (
            <div className=" h-8 flex items-center">
              <Tooltip
                title={
                  product.quantity === 0 &&
                  "No stock available for this product"
                }
              >
                <Tag color="red">Out of stock</Tag>
              </Tooltip>
            </div>
          ) : (
            <AddProductToCard
              product={product}
              productOptions={{
                color: product.colors[0],
                quantity: 1,
                size: product.availableSizes[0],
              }}
            />
          )}
        </div>
      </div>
    </ProductStatusBadge>
  );
};

export default ProductCard;
