import Link from "next/link";

import { Divider, Rate, Tag, Tooltip } from "antd";
import AddProductToCard from "../addProductToCard";
import WishlistButton from "../addProductToWishlist";
import NextImage from "../ui/nextImage";
import ProductStatusBadge from "./productStatusBadge";
import DisplayPrice from "../ui/displayPrice";
import SavingPercentage from "../ui/savingPercentage";

const ProductCard = ({ product }: { product: Product }) => {
  const {
    _id,
    title,
    description,
    price,
    ratingsAverage,
    quantity,
    colors = [],
    availableSizes = [],
    imageCover,
    status,
  } = product;
  return (
    <ProductStatusBadge status={status}>
      <div className=" flex flex-col gap-4  bg-gray-100   overflow-hidden rounded-md  hover:shadow-lg  relative min-w-100">
        <Link href={"/product/" + _id} key={_id}>
          <div className="relative w-full h-40 md:h-72 overflow-hidden">
            <NextImage
              src={imageCover || "/product.png"}
              alt=""
              fill
              sizes="25vw"
              className=" object-cover  md:object-cover"
            />
          </div>
          <div className="px-3 space-y-1 mt-2">
            <div className="flex justify-between flex-col md:flex-row">
              <span className="font-medium  text-lg  md:text-xl  truncate">
                {title}
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
              className=" !text-sm !block"
            />
            <span className=" text-sm text-gray-700 !block truncate">
              {description}
            </span>
            <SavingPercentage beforePrice={price + 50} afterPrice={price} />
          </div>
        </Link>
        <WishlistButton productId={_id} className="absolute top-4 left-4 " />
        <Divider className="!my-0" />
        <div className="px-3 pb-3">
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
            />
          )}
        </div>
      </div>
    </ProductStatusBadge>
  );
};

export default ProductCard;
