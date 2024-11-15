"use client";
import { Button } from "antd";
import Link from "next/link";
import { Pagination, Autoplay } from "swiper/modules";
const slides = [
  {
    id: 1,
    title: "Spring Sale Collections",
    description: "Sale! Up to 50% off!",
    // img: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800",
    url: "/",
    bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
  },
  {
    id: 2,
    title: "Summer Sale Collections",
    description: "Sale! Up to 50% off!",
    // img: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800",
    url: "/",
    bg: "bg-gradient-to-r from-yellow-50 to-pink-50",
  },
  {
    id: 3,
    title: "Winter Sale Collections",
    description: "Sale! Up to 50% off!",
    // img: "https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800",
    url: "/",
    bg: "bg-gradient-to-r from-pink-50 to-blue-50",
  },
];

import "swiper/css";
import "swiper/css/pagination";

import { Swiper, SwiperSlide } from "swiper/react";

const Slider = () => {
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
        renderBullet: function (index, className) {
          return `<div class="!w-3 !h-3    ${className}"></div>`;
        },
      }}
      className="h-screen max-h-[500px]"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div
            className={` w-screen h-full flex flex-col gap-16 xl:flex-row items-center justify-center  ${slide.bg}`}
            style={
              {
                // backgroundImage: `url(${slide.img})`,
                // backgroundSize: "cover",
                // backgroundPosition: "top",
                // backgroundRepeat: "no-repeat",
              }
            }
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
                  SHOP NOW
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

{
  /* <div
            className={`w-3 h-3  rounded-full ring-1 ring-gray-600 cursor-pointer flex items-center justify-center ${
              current === index ? "scale-150" : ""
            }`}
            key={slide.id}
            onClick={() => setCurrent(index)}
          >
            {current === index && (
              <div className="w-[6px] h-[6px] bg-gray-600 rounded-full"></div>
            )}
          </div> */
}
