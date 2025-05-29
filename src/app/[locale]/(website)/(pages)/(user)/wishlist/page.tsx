"use client";
import Container from "@/components/container";
import ListItemsInfinityScroll from "@/components/listItemsInfinityScroll";
import ProductCard from "@/components/productCard";
import ProductCardSkeleton from "@/components/productCard/productCard.skeleton";
import useUserStore from "@/store/useUserStore";
import { Divider } from "antd";
import { useEffect } from "react";
import { useGetWishlist } from "./_api/query";

const WishlistPage = () => {
  const { isLoading, wishlist, refetch, pagination } = useGetWishlist();

  const storedWishlist = useUserStore((state) => state.user)?.wishlist || [];

  useEffect(() => {
    refetch();
  }, [storedWishlist]);

  return (
    <Container>
      <div>
        <Divider>
          <h1 className="text-3xl font-semibold text-primary">Wishlist</h1>
        </Divider>
        <ListItemsInfinityScroll<Product>
          data={wishlist}
          pagination={pagination}
          isLoading={isLoading}
          skeketonItem={(key) => <ProductCardSkeleton key={key} />}
          renderItem={(product) => <ProductCard product={product} />}
        />
      </div>
    </Container>
  );
};

export default WishlistPage;
