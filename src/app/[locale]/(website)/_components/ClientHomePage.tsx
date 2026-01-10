"use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import CategoriesSlider from "@/app/[locale]/(website)/(pages)/_comps/categoriesSlider";
import SliderFallback from "@/components/home/SliderFallback";
import Container from "@/components/ui/container";
import ProductStatsList from "../(pages)/_comps/product-stats/productStatsList";

// Dynamically import Slider to improve LCP - Swiper loads after initial render
const Slider = dynamic(() => import("@/components/home/slider"), {
  ssr: false,
  loading: () => <SliderFallback />,
});

const ClientHomePage = () => {
  return (
    <div>
      <Suspense fallback={<SliderFallback />}>
        <Slider />
      </Suspense>
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

export default ClientHomePage;
