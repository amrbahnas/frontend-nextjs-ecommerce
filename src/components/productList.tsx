import { memo } from "react";
import ProductCard from "./productCard/productCard";
import ProductCardSkeleton from "./productCard/productCard.skeleton";
import NoData from "./ui/noData";
import RenderedCardsGrid from "./ui/renderedCardsGrid";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./productList.module.css";

const ProductList = ({
  products,
  isLoading,
  displayType = "grid",
  slidesPerView = 4,
  spaceBetween = 30,
  showNoData = true,
  loop = true,
}: {
  products: Product[];
  isLoading: boolean;
  displayType?: "grid" | "swiper";
  slidesPerView?: number;
  spaceBetween?: number;
  showNoData?: boolean;
  loop?: boolean;
}) => {
  if (isLoading && displayType === "grid")
    return (
      <RenderedCardsGrid length={5}>
        {[1, 2, 3, 4].map((i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </RenderedCardsGrid>
    );

  if (products?.length === 0 && showNoData) return <NoData />;

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
    <RenderedCardsGrid length={products?.length}>
      {products?.map((product: Product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </RenderedCardsGrid>
  );
};

export default memo(ProductList);
