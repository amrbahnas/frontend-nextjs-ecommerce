"use client";
import useBreakPoints from "@/hooks/global/userBreakPoints";
import useSearchStore from "@/store/useSearchStore";
import {
  CloseOutlined,
  HistoryOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import type { GetProps } from "antd";
import { AutoComplete, Form, Input, Space, Spin } from "antd";
import { debounce } from "lodash";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import useParamsService from "../../hooks/global/useParamsService";
import Image from "next/image";
import proxyAxiosInstance from "@/config/proxyClient";
import { useTranslations } from "next-intl";

type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;
const { Item } = Form;

const DEBOUNCE_DELAY = 300;

const SearchBar = ({ customId }: { customId?: string }) => {
  const { setParams, getParams } = useParamsService("okay I will");
  const router = useRouter();
  const search = getParams("search");
  const [form] = Form.useForm();
  const lg = useBreakPoints("lg");
  const t = useTranslations("Navigation.search");
  const [options, setOptions] = useState<
    { value: string; label: React.ReactNode }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const { searchValues, addNewSearchValue, deleteSearchValue } =
    useSearchStore();

  // Define OldSearch component first
  const OldSearch = useCallback(
    ({ value }: { value: string }) => (
      <Space className="w-full justify-between">
        <Space>
          <HistoryOutlined />
          <span>{value}</span>
        </Space>
        <CloseOutlined
          onClick={(e) => {
            e.stopPropagation();
            deleteSearchValue(value);
          }}
        />
      </Space>
    ),
    [deleteSearchValue]
  );

  // Now we can use OldSearch in useMemo
  const recentSearchOptions = useMemo(
    () =>
      searchValues.map((value) => ({
        value,
        label: <OldSearch value={value} />,
      })),
    [searchValues, OldSearch]
  );

  const saveRecentSearch = useCallback(
    (value: string) => {
      if (!value.trim()) return;
      addNewSearchValue(value);
    },
    [addNewSearchValue]
  );

  // Memoize the fetch suggestions function
  const fetchSuggestions = useCallback(
    debounce(async (value: string) => {
      if (!value.trim()) {
        setOptions(recentSearchOptions);
        return;
      }

      setIsLoading(true);
      try {
        const {
          data: { data },
        } = await proxyAxiosInstance.get("/products/search", {
          params: {
            q: value,
          },
        });

        const suggestions = data.map((product: Product) => ({
          value: product.title,
          label: (
            <Space className="w-full justify-between">
              <Space>
                <SearchOutlined />
                <span>{product.title}</span>
              </Space>
              <Image
                src={product.imageCover}
                alt={product.title}
                width={50}
                height={50}
                className="rounded-lg aspect-square"
              />
            </Space>
          ),
        }));

        // Filter recent searches that match the current input
        const filteredRecentSearches = searchValues
          .filter((s) => s.toLowerCase().includes(value.toLowerCase()))
          .map((search) => ({
            value: search,
            label: <OldSearch value={search} />,
          }));

        setOptions([...filteredRecentSearches, ...suggestions]);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setOptions(recentSearchOptions);
      } finally {
        setIsLoading(false);
      }
    }, DEBOUNCE_DELAY),
    [recentSearchOptions, searchValues, OldSearch]
  );

  const onSearch: SearchProps["onSearch"] = useCallback(
    (value: string) => {
      if (value.trim()) {
        saveRecentSearch(value);
        return router.push(`/list?search=${encodeURIComponent(value)}`);
      }
      setParams("search", value);
    },
    [router, saveRecentSearch, setParams]
  );

  const onSelect = useCallback(
    (value: string) => {
      onSearch(value);
    },
    [onSearch]
  );

  // Reset form when search param changes
  useEffect(() => {
    if (!search) {
      form.resetFields();
    }
  }, [search, form]);

  return (
    <Form
      validateTrigger="onSubmit"
      className="flex-1 md:!min-w-96"
      form={form}
      layout="inline"
      initialValues={{ search }}
      onFinish={(values) => onSearch(values.search)}
    >
      <Item noStyle name="search" className="!w-full">
        <AutoComplete
          options={options}
          onSelect={onSelect}
          onSearch={fetchSuggestions}
          value={search}
          className="!w-full"
          styles={{
            popup: {
              root: {
                top: lg ? 70 : 85,
                maxHeight: 400,
                overflow: "auto",
              },
            },
          }}
          onFocus={() => {
            setOptions(recentSearchOptions);
          }}
          notFoundContent={isLoading ? <Spin size="small" /> : null}
        >
          <Search
            id={customId || "search"}
            allowClear
            size={lg ? "large" : "middle"}
            placeholder={t("placeholder")}
            onSearch={onSearch}
          />
        </AutoComplete>
      </Item>
    </Form>
  );
};

export default SearchBar;
