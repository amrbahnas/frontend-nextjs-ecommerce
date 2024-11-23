"use client";
import CategoriesSlider from "@/app/(website)/(e-commerce-pages)/_comps/categoriesSlider";
import Container from "@/components/container";
import Slider from "@/components/slider";
import FeaturedProducts from "./(e-commerce-pages)/_comps/featuredProducts";
import Image from "next/image";

const HomePage = () => {
  return (
    <div>
      <Slider />
      <Container>
        <CategoriesSlider />
        <FeaturedProducts />
      </Container>
    </div>
  );
};

export default HomePage;
