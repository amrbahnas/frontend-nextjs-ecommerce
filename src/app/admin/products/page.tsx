"use client";
import { useState } from "react";

import { Radio, RadioChangeEvent, Spin } from "antd";
import { useGetAdminCategories, useGetAdminProducts } from "../_api/query";
import AdminProductCard from "../_comps/adminProductCard";

const { Group } = Radio;
const AllProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const { categories, isLoading } = useGetAdminCategories();
  const {
    products,
    isLoading: ProductsLoading,
    refetchProduct,
  } = useGetAdminProducts({
    category: selectedCategory,
  });

  return (
    <div className="flex flex-col gap-3 p-4  text-white">
      <span>All Categories:</span>
      <Group
        onChange={(e: RadioChangeEvent) => setSelectedCategory(e.target.value)}
        value={selectedCategory}
      >
        <Radio value={""} className="!capitalize !text-white">
          All
        </Radio>
        {categories?.map((el) => (
          <Radio
            value={el._id}
            key={el._id}
            className="!capitalize !text-white"
            checked={selectedCategory === el._id}
          >
            {el.name}
          </Radio>
        ))}
      </Group>
      <span className=" capitalize text-sm">{products.length} items found</span>
      <div className="mt-2 h-[calc(100vh-230px)] overflow-scroll flex flex-col gap-3  text-white ">
        {!ProductsLoading && products.length === 0 && (
          <div className=" text-center capitalize">no Products found</div>
        )}
        <Spin spinning={ProductsLoading} className=" !mt-20">
          {products?.map((item) => {
            return (
              <AdminProductCard
                key={item.id}
                product={item}
                refetchProduct={refetchProduct}
              />
            );
          })}
        </Spin>
      </div>
    </div>
  );
};

export default AllProducts;
