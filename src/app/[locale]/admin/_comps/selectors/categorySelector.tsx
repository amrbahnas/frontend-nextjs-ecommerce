import { Select, Form } from "antd";
import React from "react";
import { useGetAdminCategories } from "../../_api/query";

const { Item } = Form;
const CategorySelector = ({ name, label }: { name: string; label: string }) => {
  const { categories, isLoading } = useGetAdminCategories();
  return (
    <Item name={name} label={label} className={"!w-full"}>
      <Select
        loading={isLoading}
        placeholder="Select a category"
        allowClear
        filterOption={false}
        options={categories.map((category) => ({
          label: category.name,
          value: category.id,
        }))}
      />
    </Item>
  );
};

export default CategorySelector;
