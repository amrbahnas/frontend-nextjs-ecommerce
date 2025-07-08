"use client";
import { Button } from "antd";
import Link from "next/link";
import { Pagination, Autoplay } from "swiper/modules";
import { useTranslations } from "next-intl";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

const Slider = () => {
  const t = useTranslations("HomePage.slider");

  const slides = [
    {
      id: 1,
      title: t("springSale"),
      description: t("saleOff"),
      url: "/list",
      bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
    },
    {
      id: 2,
      title: t("summerSale"),
      description: t("saleOff"),
      url: "/list",
      bg: "bg-gradient-to-r from-yellow-50 to-pink-50",
    },
    {
      id: 3,
      title: t("winterSale"),
      description: t("saleOff"),
      url: "/list",
      bg: "bg-gradient-to-r from-pink-50 to-blue-50",
    },
  ];

  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      loop={true}
      autoplay={{ delay: 3000 }}
      modules={[Pagination, Autoplay]}
      pagination={{
        clickable: true,
        bulletActiveClass: "!bg-primary",
        renderBullet: function (index: number, className: string) {
          return `<div class="!w-3 !h-3    ${className}"></div>`;
        },
      }}
      className="h-screen max-h-[500px]"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div
            className={` w-screen h-full flex flex-col gap-16 xl:flex-row items-center justify-center  ${slide.bg}`}
          >
            <div className=" flex flex-col items-center justify-center gap-8 2xl:gap-12 text-center ">
              <h2 className="text-xl lg:text-3xl 2xl:text-5xl">
                {slide.description}
              </h2>
              <h1 className="text-5xl lg:text-6xl 2xl:text-8xl font-semibold">
                {slide.title}
              </h1>
              <Link href={slide.url}>
                <Button
                  type="primary"
                  size="large"
                  className="rounded-md !bg-black !text-white !py-5 !px-4"
                >
                  {t("shopNow")}
                </Button>
              </Link>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
