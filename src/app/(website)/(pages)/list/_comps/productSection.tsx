import { useGetProducts } from "@/_api/query";
import ProductList from "@/components/productList";
import { useSearchParams } from "next/navigation";
import React from "react";

const ProductSection = () => {
  const searchParams = useSearchParams();
  const { isLoading, products } = useGetProducts({
    search: searchParams.get("search") || "",
    category: searchParams.get("cat") || "",
    sort: searchParams.get("sort") || "",
    "price[gte]": searchParams.get("minPrice") || "",
    "price[lte]": searchParams.get("maxPrice") || "",
    status: searchParams.get("status") || "",
  });

  return <ProductList products={products} isLoading={isLoading} />;
};

export default ProductSection;
