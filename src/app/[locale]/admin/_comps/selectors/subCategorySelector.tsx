import { Form, Select } from "antd";
import React from "react";
import { useGetAdminSubCategoriesById } from "../../_api/query";

const { Item } = Form;

const SubCategorySelector = ({
  categoryId,
  name,
  label,
}: {
  categoryId: string;
  name: string;
  label: string;
}) => {
  const { Subcategories, isLoading } = useGetAdminSubCategoriesById(categoryId);
  console.log(
    "🚀 ~ file: subCategorySelector.tsx:17 ~ Subcategories:",
    Subcategories
  );
  return (
    <Item name={name} label={label} className={"!w-full"}>
      <Select
        loading={isLoading}
        placeholder="Select a subCategory"
        allowClear
        options={Subcategories.map((subCategory) => ({
          label: subCategory.name,
          value: subCategory.id,
        }))}
      />
    </Item>
  );
};

export default SubCategorySelector;
