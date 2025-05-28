import { memo } from "react";
import ProductCard from "./productCard";

import "swiper/css";
import "swiper/css/navigation";
import ProductCardSkeleton from "./productCard/productCard.skeleton";
import { InfiniteScroll } from "./ui/InfiniteScroll";
import NoData from "./ui/noData";
import RenderedCardsGrid from "./ui/renderedCardsGrid";
import { Spin } from "antd";

const ProductListInfinityScroll = ({
  products,
  isLoading,
  pagination,
}: {
  products: Product[];
  isLoading: boolean;
  pagination?: InfinitePaginationType;
}) => {
  if (isLoading && products?.length === 0)
    return (
      <RenderedCardsGrid length={5}>
        {Array.from({ length: pagination?.pageSize || 5 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </RenderedCardsGrid>
    );

  if (products?.length === 0 && !isLoading) return <NoData />;

  return (
    <InfiniteScroll
      onLoadMore={pagination?.hasMore ? pagination.fetchNextPage : undefined}
      threshold={500}
    >
      <RenderedCardsGrid length={products?.length}>
        {products?.map((product: Product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </RenderedCardsGrid>
      {pagination?.isFetchingNextPage && (
        <div className="flex justify-center items-center mt-4">
          <Spin />
        </div>
      )}
      {!pagination?.hasMore && (
        <div className="text-center py-4 text-muted-foreground ">
          No more items to load
        </div>
      )}
    </InfiniteScroll>
  );
};

export default memo(ProductListInfinityScroll);
