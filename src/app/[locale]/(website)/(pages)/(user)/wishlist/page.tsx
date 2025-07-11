"use client";
import ProductCard from "@/components/shared/productCard";
import ProductCardSkeleton from "@/components/shared/productCard/productCard.skeleton";
import Container from "@/components/ui/container";
import { InfiniteScroll } from "@/components/ui/InfiniteScroll";
import useUserStore from "@/store/useUserStore";
import { Button, Divider, Popconfirm } from "antd";
import { useEffect } from "react";
import { useGetWishlist } from "./_api/query";
import { useTranslations } from "next-intl";
import { useResetWishlist } from "./_api/mutations";
import { Error } from "@/components/ui/error";

const WishlistPage = () => {
  const { isLoading, wishlist, refetch, pagination } = useGetWishlist();
  const { resetWishlist, isPending, error } = useResetWishlist();
  const t = useTranslations("wishlist");
  const resetStoredWishlist = useUserStore((state) => state.resetWishlist);
  const storedWishlist = useUserStore((state) => state.wishlist);

  useEffect(() => {
    refetch();
  }, [storedWishlist]);

  return (
    <Container>
      <div className="flex justify-end">
        <Error error={error} hideOkButton />
        <Popconfirm
          title={t("areYouSureResetWishlist")}
          okText={t("delete")}
          cancelText={t("cancel")}
          onConfirm={() =>
            resetWishlist(
              {},
              {
                onSuccess: () => {
                  resetStoredWishlist();
                  refetch();
                },
              }
            )
          }
        >
          <Button
            type="link"
            className="underline"
            loading={isPending}
            disabled={isPending}
            role="none"
          >
            {t("resetWishlist")}
          </Button>
        </Popconfirm>
      </div>
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
    </Container>
  );
};

export default WishlistPage;
