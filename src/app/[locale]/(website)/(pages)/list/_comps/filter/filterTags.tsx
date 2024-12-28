import useParamsService from "@/hooks/global/useParamsService";
import { Button, Tag } from "antd";
import { GrPowerReset } from "react-icons/gr";
import { useGetCategories } from "../../../_api/query";

const FilterTags = ({ form }: { form: any }) => {
  const { getCurrentParams, removeParams, resetParams } =
    useParamsService("okay I will");
  const { categories } = useGetCategories();
  const params = getCurrentParams();

  if (params.length === 0) return null;

  return (
    <div className="flex gap-1 w-[80%] flex-wrap justify-end items-center">
      {params.map((param) => (
        <Tag
          key={param.key}
          closable
          onClose={() => {
            form.setFieldValue(param.key, undefined);
            removeParams(param.key);
          }}
        >
          <span className="capitalize mr-1">{param.key}:</span>
          <span className="capitalize text-blue-600 font-semibold">
            {param.key === "category"
              ? categories.find((cat) => cat.id === param.value)?.name || "..."
              : param.value}
          </span>
        </Tag>
      ))}
      {params.length > 0 && (
        <Button
          type="link"
          icon={<GrPowerReset />}
          onClick={() => {
            resetParams();
            form.resetFields();
          }}
          size="small"
        >
          Reset
        </Button>
      )}
    </div>
  );
};

export default FilterTags;
