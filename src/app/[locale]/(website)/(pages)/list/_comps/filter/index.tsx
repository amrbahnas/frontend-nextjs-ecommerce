import { Button, Form } from "antd";
import { memo, useState } from "react";
import { CiFilter } from "react-icons/ci";
import { GiSettingsKnobs } from "react-icons/gi";

import FilterDrawer from "./filterDrawer";
import FilterTags from "./filterTags";

type FilterProps = {
  status?: string;
  minPrice?: string;
  maxPrice?: string;
  category?: string;
  sort?: string;
};

const Filter = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [form] = Form.useForm<FilterProps>();
  return (
    <div className="md:mt-4">
      <div className="flex justify-end items-center md:mb-3 gap-4">
        <FilterTags form={form} />
        <Button
          className="flex-shrink-0"
          type="primary"
          icon={showFilter ? <CiFilter /> : <GiSettingsKnobs />}
          onClick={() => setShowFilter((prev) => !prev)}
        />
      </div>
      <FilterDrawer
        showFilter={showFilter}
        setShowFilter={setShowFilter}
        form={form}
      />
    </div>
  );
};

export default memo(Filter);
