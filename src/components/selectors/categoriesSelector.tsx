import React, { memo } from "react";
import { useGetCategories } from "./query";
import { Select } from "antd";

const CategoriesSelector = ({
  value,
  onChange,
  ...props
}: {
  value?: string | null;
  onChange?: (value: string | null, option: any) => void;
  [key: string]: any;
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
        value: el.id,
      }))}
      {...props}
    />
  );
};

export default memo(CategoriesSelector);
