"use client";
import CategoryList from "@/components/categoryList";
import Container from "@/components/container";
import ProductList from "@/components/productList";
import Slider from "@/components/slider";

import type { Metadata } from "next";

const HomePage = () => {
  return (
    <div>
      <Slider />
      <Container>
        <h1 className="text-2xl mt-24">Featured Products</h1>
        <ProductList />
      </Container>
      <div className="mt-24">
        <Container>
          <h1 className="text-2xl mb-12">Categories</h1>
        </Container>
        <CategoryList />
      </div>
    </div>
  );
};

export default HomePage;
