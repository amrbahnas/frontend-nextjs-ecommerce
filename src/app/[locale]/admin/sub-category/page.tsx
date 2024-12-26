"use client";
import React from "react";

import { Button, Divider, Popconfirm, Spin } from "antd";
import toast from "react-hot-toast";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import AdminPageTile from "../_comps/adminPageTile";
import { useAdminDeleteSubCategory } from "./_api/action";
import SubCategoryModal from "./_comps/subCategoryModal";
import CategoryFilter from "../_comps/categoryFilter";
import { useGetAdminSubCategories } from "./_api/query";
import useParamsService from "@/hooks/global/useParamsService";
import SubCategoryCard from "./_comps/subCategoryCard";
import AddSubCategoryCard from "./_comps/addSubCategoryCard";

const Page = () => {
  const { getParams } = useParamsService("okay");
  const selectedCategory = getParams("category") || "";
  const { Subcategories, isLoading, refetch } = useGetAdminSubCategories({
    categoryId: selectedCategory,
  });
  const [visible, setVisible] = React.useState(false);
  const [subCategory, setSubCategory] = React.useState<SubCategoryType | null>(
    null
  );
  const [deleteSubCategoryLoading, setDeleteSubCategoryLoading] =
    React.useState(false);
  return (
    <div>
      <AdminPageTile>Sub Category</AdminPageTile>
      <CategoryFilter />
      <span className=" capitalize text-sm text-black my-4 block w-full text-right">
        {Subcategories.length} items found
      </span>
      <Spin
        spinning={isLoading || deleteSubCategoryLoading}
        tip="Loading..."
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
