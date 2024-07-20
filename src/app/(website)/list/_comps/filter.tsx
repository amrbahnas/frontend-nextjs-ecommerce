"use client";
import { InputNumber, Select } from "antd";
import useParamsService from "../../../../../hooks/useParamsService";

const Filter = () => {
  const { setParams } = useParamsService("okay I will");

  const handleFilterChange = ({
    name,
    value,
  }: {
    name: string;
    value: string | undefined;
  }) => {
    setParams(name, value);
  };

  return (
    <div className="mt-12 flex justify-between">
      <div className="flex gap-6 flex-wrap">
        <Select
          placeholder="Type"
          dropdownStyle={{ minWidth: "150px" }}
          allowClear
          onChange={(value) => {
            handleFilterChange({ name: "type", value });
          }}
          options={[
            { label: "Physical", value: "physical" },
            { label: "Digital", value: "digital" },
          ]}
        />

        <InputNumber
          className="!w-24"
          placeholder="min price"
          onChange={(value) => {
            handleFilterChange({ name: "min", value: value?.toString() });
          }}
        />

        <InputNumber
          className="!w-24"
          placeholder="max price"
          onChange={(value) => {
            handleFilterChange({ name: "max", value: value?.toString() });
          }}
        />
        {/* TODO: Filter Categories */}
        <Select
          placeholder="Category"
          dropdownStyle={{ minWidth: "150px" }}
          allowClear
          onChange={(value) => {
            handleFilterChange({ name: "cat", value });
          }}
          options={[
            { label: "New Arrival", value: "new" },
            { label: "Popular", value: "popular" },
          ]}
        />
        <Select
          placeholder="All Filters"
          allowClear
          dropdownStyle={{ minWidth: "150px" }}
          options={[{ label: "All Filters", value: "all" }]}
        />
      </div>
      <div className="">
        <Select
          placeholder="Sort By"
          allowClear
          onChange={(value) => {
            handleFilterChange({ name: "sort", value });
          }}
          dropdownStyle={{ minWidth: "150px" }}
          options={[
            { label: "Price (low to high)", value: "asc price" },
            { label: "Price (high to low)", value: "desc price" },
            { label: "Newest", value: "asc lastUpdated" },
            { label: "Oldest", value: "desc lastUpdated" },
          ]}
        />
      </div>
    </div>
  );
};

export default Filter;
