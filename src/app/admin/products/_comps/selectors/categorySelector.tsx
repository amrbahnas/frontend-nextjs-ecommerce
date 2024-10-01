import { Select } from "antd";
import React from "react";
import { useGetAdminCategories } from "../../_api/query";

const CategorySelector: React.FC = () => {
  const { categories, isLoading } = useGetAdminCategories();
  return (
    <Select
      loading={isLoading}
      placeholder="Select a category"
      allowClear
      filterOption={false}
      options={categories.map((category) => ({
        label: category.name,
        value: category._id,
      }))}
    />
  );
};

export default CategorySelector;
