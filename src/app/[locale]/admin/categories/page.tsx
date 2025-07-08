"use client";
import React from "react";

import { Pagination, Spin } from "antd";
import { useGetAdminCategories } from "../_api/query";
import AdminPageTile from "../_comps/adminPageTile";
import AddCategoryCard from "./_comps/addCategoryCard";
import CategoryCard from "./_comps/categoryCard";
import CategoryModal from "./_comps/categoryModal";
import { useTranslations } from "next-intl";

const Page = () => {
  const t = useTranslations("admin.categories");
  const { categories, isLoading, refetch, pagination } =
    useGetAdminCategories();
  const [visible, setVisible] = React.useState(false);
  const [category, setCategory] = React.useState(null);
  const [deleteCategoryLoading, setDeleteCategoryLoading] =
    React.useState(false);
  return (
    <div className=" flex flex-col gap-10 h-full">
      <AdminPageTile>{t("title")}</AdminPageTile>

      <Spin
        spinning={isLoading || deleteCategoryLoading}
        tip={t("loading")}
        size="large"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {categories?.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              setCategory={setCategory}
              setVisible={setVisible}
              refetch={refetch}
              setDeleteCategoryLoading={setDeleteCategoryLoading}
            />
          ))}
          <AddCategoryCard setVisible={setVisible} />
        </div>
      </Spin>
      {categories?.length > 0 && (
        <div className="flex justify-end  mt-10">
          <Pagination {...pagination} />
        </div>
      )}
      <CategoryModal
        category={category}
        refetch={refetch}
        visible={visible}
        setVisible={setVisible}
        setCategory={setCategory}
      />
    </div>
  );
};

export default Page;
