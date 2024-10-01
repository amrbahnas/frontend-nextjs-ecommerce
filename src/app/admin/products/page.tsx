"use client";
import { Suspense } from "react";
import { Spin } from "antd";
import { useSearchParams } from "next/navigation";
import { useGetAdminProducts } from "./_api/query";
import AdminProductCard from "../_comps/adminProductCard";
import CategoryFilter from "./_comps/categoryFilter";

const AllProducts = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "";
  const {
    products,
    isLoading: ProductsLoading,
    refetchProduct,
  } = useGetAdminProducts({
    category,
  });

  return (
    <div className="flex flex-col gap-3  text-white">
      <Suspense fallback={<Spin />}>
        <CategoryFilter />
      </Suspense>
      <span className=" capitalize text-sm text-black">
        {products.length} items found
      </span>
      <div className="mt-2 h-[calc(100vh-230px)] overflow-scroll flex flex-col gap-3  text-white ">
        {!ProductsLoading && products.length === 0 && (
          <div className=" text-center capitalize">no Products found</div>
        )}
        <Spin spinning={ProductsLoading}>
          <div className=" !space-y-4 ">
            {products?.map((item) => {
              return (
                <AdminProductCard
                  key={item.id}
                  product={item}
                  refetchProduct={refetchProduct}
                />
              );
            })}
          </div>
        </Spin>
      </div>
    </div>
  );
};

export default AllProducts;
