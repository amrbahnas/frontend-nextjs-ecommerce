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
import AdminPageTile from "../_comps/adminPageTile";
import { useTranslations } from "next-intl";

const { Search } = Input;

export default function ProductsPage() {
  const t = useTranslations("admin.products");
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
          toast.success(t("table.actions.delete.success"));
          refetchProduct();
        },
      }
    );
  };

  return (
    <Card className="overflow-hidden [&_.ant-card-body]:!p-0 !border-none sm:!border-1 [&_.ant-card-body]:sm:pt-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <AdminPageTile>{t("title")}</AdminPageTile>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => router.push("/admin/products/create")}
        >
          {t("add.button")}
        </Button>
      </div>

      <div className="mb-4 w-full flex gap-4 items-center flex-wrap">
        <Search
          placeholder={t("filter.search.placeholder")}
          allowClear
          className="!w-full md:!w-[350px]"
          enterButton={<SearchOutlined />}
          size="large"
          onSearch={(value) => setParams("search", value)}
        />
        <CategoriesSelector
          value={categoryId || null}
          onChange={(value) => setParams("categoryId", value)}
          className="!w-full md:!w-[250px]"
          placeholder={t("filter.category.placeholder")}
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
