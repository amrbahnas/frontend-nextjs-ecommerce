import Link from "next/link";

import { memo } from "react";
import WishlistButton from "../addProductToWishlist";
import CardBadge from "./bages/cardBadge";
import ProductStatusBadge from "./bages/productStatusBadge";
import PrAddToCart from "./sections/prAddToCart";
import PrDescription from "./sections/prDescription";
import PrImage from "./sections/prImage";

const ProductCard = ({ product }: { product: Product }) => {
  const {
    id,
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
      <div className="group bg-white rounded-lg border border-gray-100 hover:border-primary/20 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
        {/* Image Section - Made larger */}
        <div className="relative h-[300px] sm:h-[350px] md:h-[400px] overflow-hidden">
          <Link href={"/product/" + id} key={id} className="block h-full">
            <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-500">
              <PrImage imageCover={imageCover} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </Link>

          {/* Status Badge */}
          <div className="absolute top-3 left-3">
            <CardBadge productId={id} />
          </div>

          {/* Stock Status */}
          {quantity <= 0 && (
            <div className="absolute bottom-3 right-3 bg-red-500/90 text-white text-xs px-2 py-1 rounded-full">
              Out of Stock
            </div>
          )}
        </div>

        {/* Compact Info Section */}
        <div className="flex flex-col">
          <Link href={"/product/" + id} key={id} className="block">
            <PrDescription
              title={title}
              price={price}
              ratingsAverage={ratingsAverage}
              description={description}
            />
          </Link>

          {/* Action Bar - Horizontal layout */}
          <div className="px-3 pb-3">
            <div className="flex items-center gap-2">
              <div className="flex-grow min-w-0">
                <PrAddToCart
                  product={product}
                  availableSizes={availableSizes}
                  colors={colors}
                  quantity={quantity}
                />
              </div>
              <div className="flex-shrink-0">
                <WishlistButton productId={id} className="!p-1 " />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProductStatusBadge>
  );
};

export default memo(ProductCard);
