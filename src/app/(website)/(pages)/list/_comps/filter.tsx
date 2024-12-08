"use client";
import CategoriesSelector from "@/components/selectors/categoriesSelector";
import useParamsService from "@/hooks/global/useParamsService";
import { Button, InputNumber, Select, Tag } from "antd";
import { memo, useState } from "react";
import { CiFilter } from "react-icons/ci";
import { GiSettingsKnobs } from "react-icons/gi";
import { GrPowerReset } from "react-icons/gr";
import classNames from "classnames";
type FilterProps = {
  status?: string;
  minPrice?: string;
  maxPrice?: string;
  cat?: string;
  sort?: string;
};

const Filter = () => {
  const { setMultiParams, resetParams, getParams } =
    useParamsService("okay I will");

  const [showFilter, setShowFilter] = useState(false);

  const [filters, setFilters] = useState<FilterProps>({});

  const handleFilterChange = () => {
    setShowFilter(false);
    if (Object.keys(filters).length === 0) return;
    setMultiParams(filters);
  };

  const handleResetFilter = () => {
    setShowFilter(false);
    resetParams();
    setFilters({});
  };

  return (
    <div className=" md:mt-4">
      <div className="flex justify-end items-center md:mb-3 gap-4">
        <FilterTags setFilters={setFilters} />
        <Button
          className=" flex-shrink-0"
          type="primary"
          icon={showFilter ? <CiFilter /> : <GiSettingsKnobs />}
          onClick={() => setShowFilter((prev) => !prev)}
        />
      </div>
      <div
        className={classNames(
          "transition-all duration-300 overflow-hidden h-0 opacity-0 ",
          {
            " opacity-100 h-auto my-3": showFilter,
          }
        )}
      >
        <div className=" grid  gap-4 grid-cols-autoFit-150">
          <Select
            placeholder="Type"
            dropdownStyle={{ minWidth: "150px" }}
            value={filters.status || getParams("status")}
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
            value={filters.minPrice || getParams("minPrice")}
            onChange={(value) => {
              setFilters({ ...filters, minPrice: value?.toString() });
            }}
          />
          <InputNumber
            className="!w-full"
            value={filters.maxPrice || getParams("maxPrice")}
            placeholder="max price"
            onChange={(value) => {
              setFilters({ ...filters, maxPrice: value?.toString() });
            }}
          />
          <CategoriesSelector
            value={filters.cat || getParams("cat")}
            onChange={(value) => {
              setFilters({ ...filters, cat: value });
            }}
          />
          <Select
            placeholder="Sort By"
            allowClear
            value={filters.sort || getParams("sort")}
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
          <Button
            icon={<CiFilter />}
            type="primary"
            onClick={handleFilterChange}
          >
            Apply Filter
          </Button>
        </div>
      </div>
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
          <span className=" capitalize">{param.key}:</span>
          {param.value}
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
