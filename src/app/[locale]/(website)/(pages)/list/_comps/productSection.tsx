import { useGetProducts } from "@/_api/query";
import ProductCard from "@/components/shared/productCard";
import ProductCardSkeleton from "@/components/shared/productCard/productCard.skeleton";
import { InfiniteScroll } from "@/components/ui/InfiniteScroll";
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
    <InfiniteScroll<Product>
      data={products}
      renderItem={(product) => <ProductCard product={product} />}
      onLoadMore={pagination.fetchNextPage}
      hasMore={pagination?.hasMore}
      loading={isLoading}
      fetchingMoreLoading={pagination.isFetchingNextPage}
      skeketonItem={(key) => <ProductCardSkeleton key={key} />}
      threshold={500}
      reverse={false}
    />
  );
};

export default memo(ProductSection);
