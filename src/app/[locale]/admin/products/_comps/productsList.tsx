import { useSearchParams } from "next/navigation";
import React from "react";
import { useGetAdminProducts } from "../_api/query";
import { Spin } from "antd";
import AdminProductCard from "../../_comps/adminProductCard";
import NoData from "@/components/ui/noData";

const ProductsList = () => {
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
    <div>
      <span className=" capitalize text-sm text-black">
        {products.length} items found
      </span>
      <div className="mt-2 h-[calc(100vh-230px)] overflow-scroll flex flex-col gap-3  text-white ">
        {!ProductsLoading && products.length === 0 && <NoData />}
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

export default ProductsList;
