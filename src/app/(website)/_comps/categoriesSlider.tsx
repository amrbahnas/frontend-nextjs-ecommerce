import { useGetCategories } from "@/api/query";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { Spin } from "antd";
import Link from "next/link";
import NextImage from "../../../components/ui/nextImage";

const CategoriesSlider = () => {
  const { categories, isLoading } = useGetCategories();
  return (
    <Spin spinning={isLoading}>
      <div className="mt-4">
        <Swiper
          spaceBetween={25}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          breakpoints={{
            0: {
              slidesPerView: 4,
            },
            640: {
              slidesPerView: 5,
            },
            768: {
              slidesPerView: 6,
            },
            1024: {
              slidesPerView: 7,
            },
          }}
        >
          {categories?.map((category) => (
            <SwiperSlide key={category._id}>
              <CategoryCard category={category} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Spin>
  );
};

export default CategoriesSlider;

const CategoryCard = ({ category }: { category: CategoryType }) => {
  return (
    <Link
      href={`/list?cat=${category._id}`}
      key={category._id}
      className="flex flex-col justify-center items-center hover:scale-105 transform transition-transform  "
    >
      <NextImage
        src={category.image}
        alt=""
        width={80}
        height={80}
        className="object-cover rounded-full bg-gray-300"
      />
      <span className=" font-light text-sm sm:text-xl tracking-wide text-center text-black">
        {category.name}
      </span>
    </Link>
  );
};
