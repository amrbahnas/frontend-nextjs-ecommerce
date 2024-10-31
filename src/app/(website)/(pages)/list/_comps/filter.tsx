"use client";
import CategoriesSelector from "@/components/selectors/categoriesSelector";
import useParamsService from "@/hooks/useParamsService";
import { Button, InputNumber, Select } from "antd";
import { useState } from "react";
import { CiFilter } from "react-icons/ci";
import { GrPowerReset } from "react-icons/gr";

type FilterProps = {
  type?: string;
  min?: string;
  max?: string;
  cat?: string;
  sort?: string;
};

const Filter = () => {
  const { setMultiParams, resetParams } = useParamsService("okay I will");
  const [filters, setFilters] = useState<FilterProps>({});

  const handleFilterChange = () => {
    if (Object.keys(filters).length === 0) return;
    setMultiParams(filters);
  };

  const handleResetFilter = () => {
    resetParams();
    setFilters({});
  };

  return (
    <div>
      <div className=" grid   gap-4 mt-12 grid-cols-autoFit-150">
        <Select
          placeholder="Type"
          dropdownStyle={{ minWidth: "150px" }}
          value={filters.type}
          allowClear
          onChange={(value) => {
            setFilters({ ...filters, type: value });
          }}
          options={[
            { label: "Physical", value: "physical" },
            { label: "Digital", value: "digital" },
          ]}
        />
        <InputNumber
          className="!w-full"
          placeholder="min price"
          value={filters.min}
          onChange={(value) => {
            setFilters({ ...filters, min: value?.toString() });
          }}
        />
        <InputNumber
          className="!w-full"
          value={filters.max}
          placeholder="max price"
          onChange={(value) => {
            setFilters({ ...filters, max: value?.toString() });
          }}
        />
        <CategoriesSelector
          value={filters.cat}
          onChange={(value) => {
            setFilters({ ...filters, cat: value });
          }}
        />
        <Select
          placeholder="Sort By"
          allowClear
          value={filters.sort}
          onChange={(value) => {
            setFilters({ ...filters, sort: value });
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
      <div className="mt-4 flex items-center gap-2 justify-end w-full">
        <Button icon={<GrPowerReset />} onClick={handleResetFilter}>
          Reset Filter
        </Button>
        <Button icon={<CiFilter />} type="primary" onClick={handleFilterChange}>
          Apply Filter
        </Button>
      </div>
    </div>
  );
};

export default Filter;
