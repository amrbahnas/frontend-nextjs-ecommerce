import ProductList from "@/components/productList";
import React from "react";
import { useGetProductStats } from "./_api/query";

type Props = {
  type: "featured" | "trending" | "most-sold" | "new-arrivals" | "top-rated";
};

const titleMap = {
  featured: "Featured Products",
  trending: "Trending Products",
  "most-sold": "Most Sold Products",
  "new-arrivals": "New Arrivals",
  "top-rated": "Top Rated Products",
};

const ProductStatsList = ({ type }: Props) => {
  const { isLoading, productStats } = useGetProductStats(type);
  if (!productStats?.length && !isLoading) return null;

  return (
    <div>
      <h1 className="text-2xl mt-6">{titleMap[type]}</h1>
      <ProductList products={productStats} isLoading={isLoading} />
    </div>
  );
};

export default ProductStatsList;
