import { Select } from "antd";
import React from "react";
import { useGetAdminSubCategories } from "../../_api/query";

const { Option } = Select;

const SubCategorySelector = ({ categoryId }: { categoryId: string }) => {
  const { Subcategories, isLoading } = useGetAdminSubCategories(categoryId);
  return (
    <Select loading={isLoading} placeholder="Select a subCategory" allowClear>
      {Subcategories?.map((el) => (
        <Option key={el._id} value={el._id}>
          {el.title}
        </Option>
      ))}
    </Select>
  );
};

export default SubCategorySelector;
