import { SearchOutlined } from "@ant-design/icons";
import { Badge, Button, DatePicker, Input } from "antd";
import React from "react";
import { useSearchParams } from "next/navigation";
import useParamsService from "@/hooks/global/useParamsService";

const { Search } = Input;

const UsersFilter = () => {
  const { setParams } = useParamsService("");
  return (
    <div className="flex items-center gap-4  mb-4 mt-10">
      <Search
        placeholder="Search by User name"
        allowClear
        className="!w-full md:!w-[350px]"
        enterButton={<SearchOutlined />}
        onSearch={(value) => setParams("search", value)}
      />
    </div>
  );
};

export default UsersFilter;
