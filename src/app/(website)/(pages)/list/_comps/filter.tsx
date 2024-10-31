"use client";
import CategoriesSelector from "@/components/selectors/categoriesSelector";
import useParamsService from "@/hooks/useParamsService";
import { Button, InputNumber, Select } from "antd";
import { useState } from "react";
import { CiFilter } from "react-icons/ci";
import { GrPowerReset } from "react-icons/gr";

type FilterProps = {
  status?: string;
  minPrice?: string;
  maxPrice?: string;
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
          value={filters.status}
          allowClear
          onChange={(value) => {
            setFilters({ ...filters, status: value });
          }}
          options={[
            { label: "Trending", value: "trending" },
            { label: "Featured", value: "featured" },
            { label: "Popular", value: "popular" },
            { label: "Normal", value: "normal" },
          ]}
        />
        <InputNumber
          className="!w-full"
          placeholder="min price"
          value={filters.minPrice}
          onChange={(value) => {
            setFilters({ ...filters, minPrice: value?.toString() });
          }}
        />
        <InputNumber
          className="!w-full"
          value={filters.maxPrice}
          placeholder="max price"
          onChange={(value) => {
            setFilters({ ...filters, maxPrice: value?.toString() });
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
            { label: "Price (low to high)", value: "price" },
            { label: "Price (high to low)", value: "-price" },
            { label: "Newest", value: "-createdAt" },
            { label: "Oldest", value: "createdAt" },
          ]}
        />
      </div>
      <div className="mt-4 flex items-center gap-2 justify-center md:justify-end w-full">
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
