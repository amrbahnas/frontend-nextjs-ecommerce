"use client";
import CategoriesSlider from "@/app/[locale]/(website)/(pages)/_comps/categoriesSlider";
import Slider from "@/components/home/slider";
import Container from "@/components/ui/container";
import ProductStatsList from "./(pages)/_comps/product-stats/productStatsList";

const HomePage = () => {
  return (
    <div>
      <Slider />
      <Container>
        <CategoriesSlider />
        <div className=" space-y-9 mt-8">
          <ProductStatsList type="most-sold" />
          <ProductStatsList type="new-arrivals" displayType="swiper" />
          <ProductStatsList type="top-rated" />
          <ProductStatsList type="trending" />
          <ProductStatsList type="featured" />
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
