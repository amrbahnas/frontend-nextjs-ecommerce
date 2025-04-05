import { useGetProducts } from "@/_api/query";
import ProductList from "@/components/productList";
import { useSearchParams } from "next/navigation";
import React, { memo } from "react";

const ProductSection = () => {
  const searchParams = useSearchParams();
  const { isLoading, products,pagination } = useGetProducts({
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "",
    sort: searchParams.get("sort") || "",
    "price[gte]": searchParams.get("minPrice") || "",
    "price[lte]": searchParams.get("maxPrice") || "",
    status: searchParams.get("status") || "",
  });

  return <ProductList products={products} isLoading={isLoading} pagination={pagination} />;
};

export default memo(ProductSection);
