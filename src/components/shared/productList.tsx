import { memo } from "react";
import ProductCard from "./productCard";

import NoData from "../ui/noData";
import RenderedCardsGrid from "../ui/renderedCardsGrid";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./productList.module.css";
import ProductCardSkeleton from "./productCard/productCard.skeleton";
import { Pagination } from "antd";

const ProductList = ({
  products,
  isLoading,
  displayType = "grid",
  slidesPerView = 4,
  spaceBetween = 30,
  showNoData = true,
  loop = true,
  pagination,
}: {
  products: Product[];
  isLoading: boolean;
  displayType?: "grid" | "swiper";
  slidesPerView?: number;
  spaceBetween?: number;
  showNoData?: boolean;
  loop?: boolean;
  pagination?: Pagination;
}) => {
  if (isLoading && displayType === "grid")
    return (
      <RenderedCardsGrid length={5}>
        {Array.from({ length: pagination?.pageSize || 5 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </RenderedCardsGrid>
    );

  if (products?.length === 0 && showNoData && !isLoading) return <NoData />;

  if (displayType === "swiper") {
    return (
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={true}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        loop={loop}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        className={`w-full   ${styles["product-swiper"]}`}
        // resposice
        breakpoints={{
          0: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 4,
          },
          1280: {
            slidesPerView: 5,
          },
        }}
      >
        {isLoading &&
          [1, 2, 3, 4, 5, 6].map((i) => (
            <SwiperSlide key={i}>
              <ProductCardSkeleton />
            </SwiperSlide>
          ))}
        {products?.map((product: Product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }

  return (
    <>
      <RenderedCardsGrid length={products?.length}>
        {products?.map((product: Product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </RenderedCardsGrid>
      {pagination && (
        <div className="flex justify-center mt-8">
          <Pagination {...pagination} />
        </div>
      )}
    </>
  );
};

export default memo(ProductList);
