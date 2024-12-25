import { SearchOutlined } from "@ant-design/icons";
import { Badge, Button, DatePicker, Input } from "antd";
import React from "react";
import { useSearchParams } from "next/navigation";
import useParamsService from "@/hooks/global/useParamsService";

const { Search } = Input;

const OrdersFilter = () => {
  const { setParams } = useParamsService("");
  return (
    <div className="flex items-center gap-4 mb-4">
      <Search
        placeholder="Search by product name"
        allowClear
        className="!w-full md:!w-[350px]"
        enterButton={<SearchOutlined />}
        onSearch={(value) => setParams("search", value)}
      />
      <DatePicker
        className="!w-full md:!w-[350px]"
        placeholder="Select date"
        onChange={(date, dateString) =>
          setParams("createdAt", dateString.toLocaleString())
        }
      />
    </div>
  );
};

export default OrdersFilter;
