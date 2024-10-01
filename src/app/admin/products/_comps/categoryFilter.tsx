import { Radio, RadioChangeEvent, Spin } from "antd";
import { useGetAdminCategories } from "../_api/query";
import useParamsService from "@/hooks/useParamsService";
const { Group } = Radio;

const CategoryFilter = () => {
  const { categories, isLoading } = useGetAdminCategories();
  const { setParams, getParams } = useParamsService("okay");
  const selectedCategory = getParams("category") || "";
  return (
    <Spin spinning={isLoading}>
      <Group
        onChange={(e: RadioChangeEvent) =>
          setParams("category", e.target.value)
        }
        value={selectedCategory || ""}
        className="border-2 rounded-md !p-2"
      >
        <Radio value={""} className="!capitalize">
          All
        </Radio>
        {categories?.map((el) => (
          <Radio
            value={el._id}
            key={el._id}
            className="!capitalize "
            checked={selectedCategory === el._id}
          >
            {el.name}
          </Radio>
        ))}
      </Group>
    </Spin>
  );
};

export default CategoryFilter;
