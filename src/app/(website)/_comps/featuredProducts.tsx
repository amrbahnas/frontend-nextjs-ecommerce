import { useGetProducts } from "@/api/query";
import ProductList from "@/components/productList";
import React from "react";

const FeaturedProducts = () => {
  const { isLoading, products } = useGetProducts();

  return (
    <div>
      <h1 className="text-2xl mt-6">Featured Products</h1>
      <ProductList products={products} isLoading={isLoading} />
    </div>
  );
};

export default FeaturedProducts;
