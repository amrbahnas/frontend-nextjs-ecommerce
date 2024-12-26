import ProductList from "@/components/productList";
import React from "react";
import { useGetRelatedProducts } from "./_api/query";

const RelatedProductList = ({ productId }: { productId: string }) => {
  const { isLoading, relatedProducts } = useGetRelatedProducts(productId);

  return (
    <div>
      <h1 className="text-2xl mt-6">Related Products</h1>
      <ProductList products={relatedProducts} isLoading={isLoading} />
    </div>
  );
};

export default RelatedProductList;
