import CategoriesSelector from "@/components/selectors/categoriesSelector";
import useParamsService from "@/hooks/global/useParamsService";
import { Button, Drawer, Form, InputNumber, Select } from "antd";
import { useEffect, useState } from "react";
import { CiFilter } from "react-icons/ci";
import { GrPowerReset } from "react-icons/gr";
import { IoMdClose } from "react-icons/io";

import Item from "@/components/antd/item";

const FilterDrawer = ({
  showFilter,
  setShowFilter,
  form,
}: {
  showFilter: boolean;
  setShowFilter: (value: boolean) => void;
  form: any;
}) => {
  const { setMultiParams, resetParams, getParams, getCurrentParams } =
    useParamsService("okay I will");

  useEffect(() => {
    const currentParams = getCurrentParams().reduce((acc, param) => {
      return { ...acc, [param.key]: param.value };
    }, {});
    form.setFieldsValue(currentParams);
  }, []);

  const handleFilterChange = () => {
    setShowFilter(false);
    const values = form.getFieldsValue();
    if (Object.keys(values).length === 0) return;
    setMultiParams(values);
  };

  const handleResetFilter = () => {
    setShowFilter(false);
    resetParams();
    form.resetFields();
  };
  return (
    <Drawer
      title={
        <div className="flex justify-between items-center w-full">
          <span className="font-semibold">Product Filters</span>
          <IoMdClose
            className="text-xl cursor-pointer"
            onClick={() => setShowFilter(false)}
          />
        </div>
      }
      placement="left"
      onClose={() => setShowFilter(false)}
      open={showFilter}
      width={320}
      closeIcon={null}
    >
      <Form form={form} layout="vertical" className="flex flex-col !gap-4 ">
        <Item name="status" label="Type">
          <Select
            allowClear
            options={[
              { label: "Trending", value: "trending" },
              { label: "Featured", value: "featured" },
              { label: "Popular", value: "popular" },
              { label: "Normal", value: "normal" },
            ]}
          />
        </Item>

        <Item name="minPrice" label="Minimum Price">
          <InputNumber className="!w-full" />
        </Item>

        <Item name="maxPrice" label="Maximum Price">
          <InputNumber className="!w-full" />
        </Item>

        <Item name="category" label="Category">
          <CategoriesSelector />
        </Item>

        <Item name="sort" label="Sort By">
          <Select
            allowClear
            options={[
              { label: "Price (low to high)", value: "price" },
              { label: "Price (high to low)", value: "-price" },
              { label: "Newest", value: "-createdAt" },
              { label: "Oldest", value: "createdAt" },
            ]}
          />
        </Item>

        <div className="flex flex-col gap-4 mt-4">
          <Button
            icon={<CiFilter />}
            type="primary"
            onClick={handleFilterChange}
            size="large"
          >
            Apply Filter
          </Button>
          <Button icon={<GrPowerReset />} onClick={handleResetFilter}>
            Reset Filter
          </Button>
        </div>
      </Form>
    </Drawer>
  );
};

export default FilterDrawer;
