import ProductList from "@/components/productList";
import React from "react";
import { useGetRelatedProducts } from "./_api/query";

const RelatedProductList = ({ productId }: { productId: string }) => {
  const { isLoading, relatedProducts } = useGetRelatedProducts(productId);
  if (!relatedProducts?.length && !isLoading) return null;
  return (
    <div>
      <h1 className="text-2xl mt-6">Related Products</h1>
      <ProductList
        products={relatedProducts}
        isLoading={isLoading}
        displayType="swiper"
        showNoData={false}
      />
    </div>
  );
};

export default RelatedProductList;
