"use client";
import CategoriesSelector from "@/components/selectors/categoriesSelector";
import useParamsService from "@/hooks/global/useParamsService";
import { Button, Drawer, InputNumber, Select, Tag } from "antd";
import { memo, useEffect, useState } from "react";
import { CiFilter } from "react-icons/ci";
import { GiSettingsKnobs } from "react-icons/gi";
import { GrPowerReset } from "react-icons/gr";
import { IoMdClose } from "react-icons/io";

import { useGetCategories } from "../../_api/query";

type FilterProps = {
  status?: string;
  minPrice?: string;
  maxPrice?: string;
  category?: string;
  sort?: string;
};

const Filter = () => {
  const { setMultiParams, resetParams, getParams, getCurrentParams } =
    useParamsService("okay I will");

  const [showFilter, setShowFilter] = useState(false);

  const [filters, setFilters] = useState<FilterProps>({});

  const handleFilterChange = () => {
    setShowFilter(false);
    if (Object.keys(filters).length === 0) return;
    setMultiParams(filters);
  };

  useEffect(() => {
    const currentParams = getCurrentParams().reduce((acc, param) => {
      return { ...acc, [param.key]: param.value };
    }, {});
    setFilters(currentParams);
  }, []);

  const handleResetFilter = () => {
    setShowFilter(false);
    resetParams();
    setFilters({});
  };

  return (
    <div className="md:mt-4">
      <div className="flex justify-end items-center md:mb-3 gap-4">
        <FilterTags setFilters={setFilters} />
        <Button
          className="flex-shrink-0"
          type="primary"
          icon={showFilter ? <CiFilter /> : <GiSettingsKnobs />}
          onClick={() => setShowFilter((prev) => !prev)}
        />
      </div>
      <Drawer
        title={
          <div className="flex justify-between items-center w-full  ">
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
        <div className="flex flex-col gap-4">
          <Select
            placeholder="Type"
            style={{ width: "100%" }}
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
            value={filters.category}
            onChange={(value: any) => {
              setFilters({ ...filters, category: value });
            }}
          />
          <Select
            placeholder="Sort By"
            style={{ width: "100%" }}
            allowClear
            value={filters.sort}
            onChange={(value) => {
              setFilters({ ...filters, sort: value });
            }}
            options={[
              { label: "Price (low to high)", value: "price" },
              { label: "Price (high to low)", value: "-price" },
              { label: "Newest", value: "-createdAt" },
              { label: "Oldest", value: "createdAt" },
            ]}
          />
          <div className="flex  flex-col gap-2  mt-4">
            <Button
              icon={<CiFilter />}
              type="primary"
              onClick={handleFilterChange}
            >
              Apply Filter
            </Button>
            <Button icon={<GrPowerReset />} onClick={handleResetFilter}>
              Reset Filter
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default memo(Filter);

const FilterTags = ({
  setFilters,
}: {
  setFilters: (filters: FilterProps) => void;
}) => {
  const { getCurrentParams, removeParams, resetParams } =
    useParamsService("okay I will");
  const { categories } = useGetCategories();
  const params = getCurrentParams();

  if (params.length === 0) return null;

  return (
    <div className="flex gap-1 w-[80%]  flex-wrap justify-end items-center">
      {params.map((param) => (
        <Tag
          key={param.key}
          closable
          onClose={() => {
            setFilters({}); // when clear filter state , inputs values will depend on url params
            removeParams(param.key);
          }}
        >
          <span className=" capitalize mr-1">{param.key}:</span>
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
            setFilters({});
          }}
          size="small"
        >
          Reset
        </Button>
      )}
    </div>
  );
};
