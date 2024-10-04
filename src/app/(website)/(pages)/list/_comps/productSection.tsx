import { useGetProducts } from "@/api/query";
import ProductList from "@/components/productList";
import { useSearchParams } from "next/navigation";
import React from "react";

const ProductSection = () => {
  const searchParams = useSearchParams();
  const { isLoading, products } = useGetProducts({
    search: searchParams.get("search") || "",
  });

  return <ProductList products={products} isLoading={isLoading} />;
};

export default ProductSection;
