import Image from "next/image";
import Link from "next/link";
import { useQuery } from "../../hooks/useQuery";
import { CategoryType } from "../../types/category";
import { Spin } from "antd";

const CategoryList = () => {
  const { data: categories, isLoading } = useQuery("/categories");
  return (
    <Spin spinning={isLoading}>
      <div className="   px-4 overflow-x-scroll scrollbar-hide">
        <div className="flex gap-4 md:gap-8">
          {categories?.map((item: CategoryType) => (
            <Link
              href={`/list?cat=${item._id}`}
              className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6"
              key={item._id}
            >
              <div className="relative bg-slate-100 w-full h-96">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="20vw"
                  className="object-cover"
                />
              </div>
              <h1 className="mt-8 font-light text-xl tracking-wide">
                {item.name}
              </h1>
            </Link>
          ))}
        </div>
      </div>
    </Spin>
  );
};

export default CategoryList;
