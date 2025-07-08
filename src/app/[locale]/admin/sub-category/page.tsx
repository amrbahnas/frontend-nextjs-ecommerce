"use client";
import React from "react";
import useParamsService from "@/hooks/global/useParamsService";
import { Pagination, Spin } from "antd";
import AdminPageTile from "../_comps/adminPageTile";
import CategoryFilter from "../_comps/categoryFilter";
import { useGetAdminSubCategories } from "./_api/query";
import AddSubCategoryCard from "./_comps/addSubCategoryCard";
import SubCategoryCard from "./_comps/subCategoryCard";
import SubCategoryModal from "./_comps/subCategoryModal";
import SubCategoryFilter from "./_comps/subCategoryFilter";
import { useTranslations } from "next-intl";

const Page = () => {
  const t = useTranslations("admin.sub_categories");
  const { getParams } = useParamsService("okay");
  const selectedCategory = getParams("category") || "";
  const search = getParams("search") || "";
  const { Subcategories, isLoading, refetch, pagination } =
    useGetAdminSubCategories({
      categoryId: selectedCategory,
      search,
    });
  const [visible, setVisible] = React.useState(false);
  const [subCategory, setSubCategory] = React.useState<SubCategoryType | null>(
    null
  );
  const [deleteSubCategoryLoading, setDeleteSubCategoryLoading] =
    React.useState(false);

  return (
    <div>
      <AdminPageTile>{t("title")}</AdminPageTile>
      <div className="flex items-center justify-between flex-wrap gap-4 mt-8 mb-4">
        <SubCategoryFilter />
        <span className="capitalize text-sm text-black sm:my-4 block w-full text-right">
          {t("items_found", { count: Subcategories.length })}
        </span>
      </div>
      <Spin
        spinning={isLoading || deleteSubCategoryLoading}
        tip={t("loading")}
        size="large"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Subcategories?.map((subCategory) => (
            <SubCategoryCard
              key={subCategory.id}
              subCategory={subCategory}
              setSubCategory={setSubCategory}
              setVisible={setVisible}
              refetch={refetch}
              setDeleteSubCategoryLoading={setDeleteSubCategoryLoading}
            />
          ))}
          <AddSubCategoryCard setVisible={setVisible} />
        </div>
      </Spin>
      {Subcategories?.length > 0 && (
        <div className="flex justify-end mt-10">
          <Pagination {...pagination} />
        </div>
      )}
      <SubCategoryModal
        subCategory={subCategory}
        refetch={refetch}
        visible={visible}
        setVisible={setVisible}
        setSubCategory={setSubCategory}
      />
    </div>
  );
};

export default Page;
