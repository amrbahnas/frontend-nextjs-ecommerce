import { useGetCategories } from "@/api/query";
import { Spin } from "antd";
import Image from "next/image";
import Link from "next/link";
import NextImage from "./nextImage";
// import { CategoryType } from "../types/category";

const CategoryList = () => {
  const { categories, isLoading } = useGetCategories();
  return (
    <Spin spinning={isLoading}>
      <div className="   px-4 overflow-x-scroll scrollbar-hide">
        <div className="flex gap-4 md:gap-8 justify-center h-36">
          {categories?.map((item) => (
            <Link
              href={`/list?cat=${item._id}`}
              key={item._id}
              className="flex flex-col justify-center items-center hover:scale-105 transform transition-transform"
            >
              <NextImage
                src={item.image}
                alt=""
                width={80}
                height={80}
                className="object-cover rounded-full bg-gray-300"
              />
              <span className=" font-light text-xl tracking-wide text-center text-black">
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </Spin>
  );
};

export default CategoryList;
