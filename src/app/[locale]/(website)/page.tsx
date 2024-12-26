"use client";
import CategoriesSlider from "@/app/[locale]/(website)/(pages)/_comps/categoriesSlider";
import Container from "@/components/container";
import Slider from "@/components/slider";
import { useTranslations } from "next-intl";
import ProductStatsList from "./(pages)/_comps/product-stats/productStatsList";

const HomePage = () => {
  const t = useTranslations("HomePage");

  return (
    <div>
      <Slider />
      <Container>
        <CategoriesSlider />
        <ProductStatsList type="featured" />
      </Container>
    </div>
  );
};

export default HomePage;
