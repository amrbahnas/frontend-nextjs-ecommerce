"use client";
import React, { useState } from "react";
import { Card, Button, Input } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useGetAdminProducts } from "./_api/query";
import useBreakPoints from "@/hooks/global/userBreakPoints";
import { useAdminDeleteProduct } from "./_api/actions";
import toast from "react-hot-toast";
import CategoriesSelector from "@/components/selectors/categoriesSelector";
import ProductsTable from "./_comps/productsTable";
import ProductsList from "./_comps/productsList";
import useParamsService from "@/hooks/global/useParamsService";

const { Search } = Input;

export default function ProductsPage() {
  const router = useRouter();
  const { getParams, setParams } = useParamsService("");
  const search = getParams("search") || "";
  const categoryId = getParams("categoryId") || "";
  const lg = useBreakPoints("lg");
  const [productId, setProductId] = useState("");
  const { deleteProduct, deleteLoading } = useAdminDeleteProduct(productId);

  const { products, isLoading, pagination, refetchProduct } =
    useGetAdminProducts({
      search,
      categoryId,
    });

  const handleDelete = (id: string) => {
    setProductId(id);
    deleteProduct(
      {},
      {
        onSuccess: () => {
          toast.success("Product deleted successfully");
          refetchProduct();
        },
      }
    );
  };

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className=" text-lg md:text-2xl font-bold">Products Management</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => router.push("/admin/products/create")}
        >
          Add New Product
        </Button>
      </div>

      <div className="mb-4 w-full flex gap-4 items-center flex-wrap">
        <Search
          placeholder="Search by product name"
          allowClear
          className="!w-full md:!w-[350px]"
          enterButton={<SearchOutlined />}
          size="large"
          value={search}
          onSearch={(value) => setParams("search", value)}
        />
        <CategoriesSelector
          value={categoryId || null}
          onChange={(value) => setParams("categoryId", value)}
          className=" !w-full md:!w-[250px]"
          placeholder="Filter by category"
          size="large"
        />
      </div>

      {lg ? (
        <ProductsTable
          products={products}
          isLoading={isLoading}
          pagination={pagination}
          deleteLoading={deleteLoading}
          onDelete={handleDelete}
        />
      ) : (
        <ProductsList
          products={products}
          ProductsLoading={isLoading}
          pagination={pagination}
          refetchProduct={refetchProduct}
        />
      )}
    </Card>
  );
}
