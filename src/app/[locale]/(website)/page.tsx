"use client";
import CategoriesSlider from "@/app/[locale]/(website)/(pages)/_comps/categoriesSlider";
import Container from "@/components/container";
import Slider from "@/components/slider";
import FeaturedProducts from "./(pages)/_comps/featuredProducts";
import Image from "next/image";
import { useTranslations } from "next-intl";

const HomePage = () => {
  const t = useTranslations("HomePage");

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
