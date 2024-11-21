"use client";
import CategoriesSlider from "@/app/(website)/_comps/categoriesSlider";
import Container from "@/components/container";
import Slider from "@/components/slider";
import FeaturedProducts from "./_comps/featuredProducts";
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
