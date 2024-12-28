import ProductList from "@/components/productList";
import React from "react";
import { useGetProductStats } from "./_api/query";

type Props = {
  type: "featured" | "trending" | "most-sold" | "new-arrivals" | "top-rated";
  displayType?: "grid" | "swiper";
};

const titleMap = {
  featured: "Featured Products",
  trending: "Trending Products",
  "most-sold": "Most Sold Products",
  "new-arrivals": "New Arrivals",
  "top-rated": "Top Rated Products",
};

const ProductStatsList = ({ type, displayType }: Props) => {
  const { isLoading, productStats } = useGetProductStats(type);
  if (!productStats?.length && !isLoading) return null;

  return (
    <div>
      <h1 className="text-2xl  ">{titleMap[type]}</h1>
      <ProductList
        products={productStats}
        isLoading={isLoading}
        displayType={displayType}
      />
    </div>
  );
};

export default ProductStatsList;
