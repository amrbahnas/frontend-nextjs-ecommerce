"use client";
import React, { useEffect } from "react";
import { useGetWishlist } from "./_api/query";
import ProductList from "@/components/productList";
import Container from "@/components/container";
import { Divider } from "antd";
import useUserStore from "@/store/useUserStore";

const WishlistPage = () => {
  const { isLoading, wishlist, refetch } = useGetWishlist();

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
        <ProductList products={wishlist} isLoading={isLoading} />
      </div>
    </Container>
  );
};

export default WishlistPage;
