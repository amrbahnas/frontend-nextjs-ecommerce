import { Select } from "antd";
import React from "react";
import { useGetAdminCategories } from "../../_api/query";

const { Option } = Select;

const CategorySelector = () => {
  const { categories, isLoading } = useGetAdminCategories();
  return (
    <Select loading={isLoading} placeholder="Select a category" allowClear>
      {categories?.map((el) => (
        <Option key={el._id} value={el._id}>
          {el.name}
        </Option>
      ))}
    </Select>
  );
};

export default CategorySelector;
