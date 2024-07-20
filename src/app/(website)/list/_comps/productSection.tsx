import ProductList from "@/components/productList";
import { useSearchParams } from "next/navigation";
import React from "react";

const ProductSection = () => {
  const searchParams = useSearchParams();

  return <ProductList search={searchParams.get("search") || ""} />;
};

export default ProductSection;
