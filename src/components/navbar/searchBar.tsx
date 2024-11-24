"use client";
import type { GetProps } from "antd";
import { Form, Input } from "antd";
import { useRouter } from "next/navigation";
import useParamsService from "../../hooks/global/useParamsService";
import { useEffect } from "react";
type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;
const { Item } = Form;

const SearchBar = () => {
  const { setParams, getParams } = useParamsService("okay I will");
  const router = useRouter();
  const search = getParams("search");
  const [form] = Form.useForm();

  const onSearch: SearchProps["onSearch"] = (value) => {
    if (value) {
      return router.push(`/list?search=${value}`);
    }
    setParams("search", value);
  };

  useEffect(() => {
    if (!search) {
      form.resetFields();
    }
  }, [search]);

  return (
    <Form
      validateTrigger="onBlur"
      className="flex-1"
      form={form}
      layout="inline"
      initialValues={{ search }}
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
