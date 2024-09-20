"use client";
import { Form, Input } from "antd";
import type { GetProps } from "antd";
import React from "react";
import useParamsService from "../../hooks/useParamsService";
import { usePathname, useRouter } from "next/navigation";
type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;
const { Item } = Form;

const SearchBar = () => {
  const { setParams } = useParamsService("okay I will");
  const pathname = usePathname();
  const router = useRouter();

  const onSearch: SearchProps["onSearch"] = (value) => {
    if (value) {
      return router.push(`/list?search=${value}`);
    }
    setParams("search", value);
  };

  return (
    <Form
      className="flex-1"
      layout="inline"
      initialValues={{ search: "" }}
      onFinish={(values) => onSearch(values.search)}
    >
      <Item name="search" className="!w-full">
        <Search
          allowClear
          size="large"
          placeholder="input search text"
          onSearch={onSearch}
        />
      </Item>
    </Form>
  );
};

export default SearchBar;
