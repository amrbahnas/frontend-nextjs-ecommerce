import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Skeleton, Spin } from "antd";
import Link from "next/link";
import NextImage from "../../../../../components/ui/nextImage";
import { useGetCategories } from "../_api/query";
import { useTranslations } from "next-intl";

const CategoriesSlider = () => {
  const { categories, isLoading } = useGetCategories();
  const t = useTranslations("HomePage");

  if (isLoading) {
    return (
      <div className="mt-4 flex justify-between gap-4 overflow-scroll scrollbar-hide ">
        {[1, 2, 3, 4, 5, 6, 7].map((value, i) => (
          <Skeleton.Avatar size={80} active key={value} />
        ))}
      </div>
    );
  }
  return (
    <div className="mt-4">
      <h2 className="text-xl mb-4">{t("categories")}</h2>
      <Swiper
        spaceBetween={25}
        // onSlideChange={() => console.log("slide change")}
        // onSwiper={(swiper) => console.log(swiper)}
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
          <SwiperSlide key={category.id}>
            <CategoryCard category={category} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategoriesSlider;

const CategoryCard = ({ category }: { category: CategoryType }) => {
  return (
    <Link
      href={`/list?cat=${category.id}`}
      key={category.id}
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
