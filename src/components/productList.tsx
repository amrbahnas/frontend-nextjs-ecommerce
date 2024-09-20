import { useGetProducts } from "@/api/query";
import { Spin } from "antd";
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
        className={`mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4`}
      >
        {products?.map((product: Product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </Spin>
  );
};

export default ProductList;
