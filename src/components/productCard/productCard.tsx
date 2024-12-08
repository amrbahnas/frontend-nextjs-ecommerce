import Link from "next/link";
import { Divider } from "antd";
import WishlistButton from "../addProductToWishlist";
import CardBadge from "./bages/cardBadge";
import ProductStatusBadge from "./bages/productStatusBadge";
import PrAddToCart from "./sections/prAddToCart";
import PrDescription from "./sections/prDescription";
import PrImage from "./sections/prImage";
import { memo } from "react";

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
      <div className=" flex flex-col gap-4  bg-gray-100   hover:shadow-lg  relative min-w-100">
        <Link href={"/product/" + _id} key={_id}>
          <PrImage imageCover={imageCover} />
          <PrDescription
            title={title}
            price={price}
            ratingsAverage={ratingsAverage}
            description={description}
          />
        </Link>
        <Divider className="!my-0" />
        <PrAddToCart
          product={product}
          availableSizes={availableSizes}
          colors={colors}
          quantity={quantity}
        />

        {/* left badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 ">
          <WishlistButton productId={_id} />
          <CardBadge productId={_id} />
        </div>
        {/* Right Badges */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 "></div>
      </div>
    </ProductStatusBadge>
  );
};

export default memo(ProductCard);
