import { useGetProducts } from "@/_api/query";
import ListItemsInfinityScroll from "@/components/shared/listItemsInfinityScroll";
import ProductCard from "@/components/shared/productCard";
import ProductCardSkeleton from "@/components/shared/productCard/productCard.skeleton";
import { useSearchParams } from "next/navigation";
import { memo } from "react";

const ProductSection = () => {
  const searchParams = useSearchParams();
  const { isLoading, products, pagination } = useGetProducts({
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "",
    sort: searchParams.get("sort") || "",
    "price[gte]": searchParams.get("minPrice") || "",
    "price[lte]": searchParams.get("maxPrice") || "",
    status: searchParams.get("status") || "",
  });

  return (
    <ListItemsInfinityScroll<Product>
      data={products}
      pagination={pagination}
      isLoading={isLoading}
      skeketonItem={(key) => <ProductCardSkeleton key={key} />}
      renderItem={(product) => <ProductCard product={product} />}
    />
  );
};

export default memo(ProductSection);
