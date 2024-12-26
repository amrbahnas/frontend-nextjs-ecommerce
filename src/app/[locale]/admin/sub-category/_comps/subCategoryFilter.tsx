import useParamsService from "@/hooks/global/useParamsService";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";

const { Search } = Input;

const SubCategoryFilter = () => {
  const { setParams } = useParamsService("");
  return (
    <div className="flex items-center gap-4 mb-4">
      <Search
        placeholder="Search by sub-category name"
        allowClear
        className="!w-full md:!w-[350px]"
        enterButton={<SearchOutlined />}
        onSearch={(value) => setParams("search", value)}
      />
    </div>
  );
};

export default SubCategoryFilter;
