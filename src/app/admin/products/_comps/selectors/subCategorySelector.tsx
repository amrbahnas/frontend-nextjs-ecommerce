import { Select } from "antd";
import React from "react";
import { useGetAdminSubCategories } from "../../_api/query";

const SubCategorySelector = ({ categoryId }: { categoryId: string }) => {
  const { Subcategories, isLoading } = useGetAdminSubCategories(categoryId);
  return (
    <Select
      loading={isLoading}
      placeholder="Select a subCategory"
      allowClear
      options={Subcategories.map((subCategory) => ({
        label: subCategory.title,
        value: subCategory._id,
      }))}
    />
  );
};

export default SubCategorySelector;
