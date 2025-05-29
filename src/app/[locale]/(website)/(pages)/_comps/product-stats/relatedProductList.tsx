import ProductList from "@/components/shared/productList";
import React from "react";
import { useInView } from "react-intersection-observer";

import { useGetRelatedProducts } from "./_api/query";

const RelatedProductList = ({ productId }: { productId: string }) => {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });
  const { isLoading, relatedProducts } = useGetRelatedProducts(
    productId,
    !inView
  );
  if (!relatedProducts?.length && !isLoading) return null;
  return (
    <div className="min-h-[200px]" ref={ref} id={productId}>
      {inView && (
        <>
          <h1 className="text-2xl mt-6">Related Products</h1>
          <ProductList
            products={relatedProducts}
            isLoading={isLoading}
            displayType="swiper"
            showNoData={false}
          />
        </>
      )}
    </div>
  );
};

export default RelatedProductList;
