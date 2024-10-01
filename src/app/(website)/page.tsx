"use client";
import CategoryList from "@/components/categoryList";
import Container from "@/components/container";
import ProductList from "@/components/productList";
import Slider from "@/components/slider";

const HomePage = () => {
  return (
    <div>
      <Slider />
      <Container>
        <CategoryList />
        <ProductList />
      </Container>
    </div>
  );
};

export default HomePage;
