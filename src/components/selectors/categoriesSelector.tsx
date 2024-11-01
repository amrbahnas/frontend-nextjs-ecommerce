import React from "react";
import { useGetCategories } from "./query";
import { Select } from "antd";

const CategoriesSelector = ({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (value: string) => void;
}) => {
  const { categories, isLoading } = useGetCategories();
  return (
    <Select
      placeholder="Category"
      value={categories.length > 0 ? value : undefined}
      loading={isLoading}
      dropdownStyle={{ minWidth: "150px" }}
      allowClear
      onChange={onChange}
      options={categories.map((el) => ({
        label: el.name,
        value: el._id,
      }))}
    />
  );
};

export default CategoriesSelector;
