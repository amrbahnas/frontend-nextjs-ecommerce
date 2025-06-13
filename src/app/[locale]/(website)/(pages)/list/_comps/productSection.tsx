import { useGetProducts } from "@/_api/query";
import ListItemsInfinityScroll from "@/components/shared/listItemsInfinityScroll";
import ProductCard from "@/components/shared/productCard";
import ProductCardSkeleton from "@/components/shared/productCard/productCard.skeleton";
import { useSearchParams } from "next/navigation";
import { memo } from "react";

const ProductSection = () => {
  const searchParams = useSearchParams();
  const { isLoading, products, pagination } = useGetProducts({
    search: searchParams.get("search") || undefined,
    categoryId: searchParams.get("category") || undefined,
    sort: searchParams.get("sort") || undefined,
    minPrice: searchParams.get("minPrice") || undefined,
    maxPrice: searchParams.get("maxPrice") || undefined,
    status: searchParams.get("status") || undefined,
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
