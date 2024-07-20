import { useGetProducts } from "@/api/query";
import { Spin } from "antd";
import { Product } from "../types/product";
import ProductCard from "./productCard";

const ProductList = ({
  category,
  search,
}: {
  category?: string;
  search?: string;
}) => {
  const { isLoading, products } = useGetProducts({ category, search });

  if (products?.length === 0)
    return (
      <p className="text-center text-2xl font-semibold mt-12">
        No products found
      </p>
    );

  return (
    <Spin spinning={isLoading}>
      <div
        className={`mt-12 gap-x-9 gap-y-16 items-center grid ${
          products?.length > 2 ? "grid-cols-autoFit" : ""
        }`}
      >
        {products?.map((product: Product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </Spin>
  );
};

export default ProductList;
