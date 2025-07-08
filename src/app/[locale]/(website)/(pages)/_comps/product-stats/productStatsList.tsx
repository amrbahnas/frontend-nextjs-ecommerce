import ProductList from "@/components/shared/productList";
import React from "react";
import { useInView } from "react-intersection-observer";
import { useGetProductStats } from "./_api/query";
import { useTranslations } from "next-intl";

type Props = {
  type: "featured" | "trending" | "most-sold" | "new-arrivals" | "top-rated";
  displayType?: "grid" | "swiper";
};

const ProductStatsList = ({ type, displayType }: Props) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0,
  });

  const t = useTranslations("HomePage");
  const { isLoading, productStats } = useGetProductStats(type, !inView);

  const titleMap = {
    featured: t("featuredProducts"),
    trending: t("trendingProducts"),
    "most-sold": t("mostSoldProducts"),
    "new-arrivals": t("newArrivals"),
    "top-rated": t("topRatedProducts"),
  };

  if (productStats?.length === 0 && !isLoading && inView) return null;

  return (
    <div className="min-h-[200px]" ref={ref} id={type}>
      {inView && (
        <>
          <h1 className="text-2xl font-medium mb-4 ">{titleMap[type]}</h1>
          <ProductList
            products={productStats}
            isLoading={isLoading}
            displayType={displayType}
          />
        </>
      )}
    </div>
  );
};

export default ProductStatsList;
