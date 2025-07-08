"use client";
import ProductCard from "@/components/shared/productCard";
import ProductCardSkeleton from "@/components/shared/productCard/productCard.skeleton";
import Container from "@/components/ui/container";
import { InfiniteScroll } from "@/components/ui/InfiniteScroll";
import useUserStore from "@/store/useUserStore";
import { Divider } from "antd";
import { useEffect } from "react";
import { useGetWishlist } from "./_api/query";
import { useTranslations } from "next-intl";

const WishlistPage = () => {
  const { isLoading, wishlist, refetch, pagination } = useGetWishlist();
  const t = useTranslations("wishlist");

  const storedWishlist = useUserStore((state) => state.user)?.wishlist || [];

  useEffect(() => {
    refetch();
  }, [storedWishlist]);

  return (
    <Container>
      <div>
        <Divider className="!mb-8 !mt-4">
          <h1 className="text-3xl font-semibold text-primary">{t("title")}</h1>
        </Divider>
        <InfiniteScroll<Product>
          data={wishlist}
          renderItem={(product) => <ProductCard product={product} />}
          onLoadMore={pagination.fetchNextPage}
          hasMore={pagination?.hasMore}
          loading={isLoading}
          fetchingMoreLoading={pagination.isFetchingNextPage}
          skeketonItem={(key) => <ProductCardSkeleton key={key} />}
          threshold={500}
          reverse={false}
        />
      </div>
    </Container>
  );
};

export default WishlistPage;
