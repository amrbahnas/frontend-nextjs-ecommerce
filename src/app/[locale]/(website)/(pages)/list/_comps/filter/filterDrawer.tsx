import CategoriesSelector from "@/components/selectors/categoriesSelector";
import useParamsService from "@/hooks/global/useParamsService";
import { Button, Drawer, Form, InputNumber, Select } from "antd";
import { useEffect } from "react";
import { CiFilter } from "react-icons/ci";
import { GrPowerReset } from "react-icons/gr";
import { IoMdClose } from "react-icons/io";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("list.filter");
  const { setMultiParams, resetParams, getCurrentParams } =
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
          <span className="font-semibold">{t("title")}</span>
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
      <Form form={form} layout="vertical" className="flex flex-col !gap-4">
        <Item name="status" label={t("type.label")}>
          <Select
            allowClear
            options={[
              { label: t("type.trending"), value: "trending" },
              { label: t("type.featured"), value: "featured" },
              { label: t("type.popular"), value: "popular" },
              { label: t("type.normal"), value: "normal" },
            ]}
          />
        </Item>

        <Item name="minPrice" label={t("price.min")}>
          <InputNumber className="!w-full" />
        </Item>

        <Item name="maxPrice" label={t("price.max")}>
          <InputNumber className="!w-full" />
        </Item>

        <Item name="category" label={t("category")}>
          <CategoriesSelector />
        </Item>

        <Item name="sort" label={t("sort.label")}>
          <Select
            allowClear
            options={[
              { label: t("sort.priceLowToHigh"), value: "price" },
              { label: t("sort.priceHighToLow"), value: "-price" },
              { label: t("sort.newest"), value: "-createdAt" },
              { label: t("sort.oldest"), value: "createdAt" },
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
            {t("buttons.apply")}
          </Button>
          <Button icon={<GrPowerReset />} onClick={handleResetFilter}>
            {t("buttons.reset")}
          </Button>
        </div>
      </Form>
    </Drawer>
  );
};

export default FilterDrawer;
