import NoData from "@/components/ui/noData";
import { Pagination, Spin } from "antd";
import AdminProductCard from "../../_comps/adminProductCard";

const ProductsList = ({
  products,
  refetchProduct,
  pagination,
  ProductsLoading,
}: {
  products: Product[];
  refetchProduct: any;
  pagination: any;
  ProductsLoading: boolean;
}) => {
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
            <Pagination {...pagination} />
          </div>
        </Spin>
      </div>
    </div>
  );
};

export default ProductsList;
