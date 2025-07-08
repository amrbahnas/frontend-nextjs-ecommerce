"use client";
import React from "react";
import { Table, Button, Space, Tag, Popconfirm, TableProps } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Link from "next/link";
import NextImage from "@/components/ui/nextImage";
import { useTranslations } from "next-intl";

const formatStatus = (status: ProductStatus | undefined, t: any): string => {
  if (!status) return t("table.status.unknown");
  const key = status.replace(/-/g, "_");
  return t(`table.status.${key}`);
};

const getStatusColor = (status: ProductStatus | undefined): string => {
  if (!status) return "default";
  switch (status) {
    case "trending":
      return "volcano";
    case "featured":
      return "gold";
    case "popular":
      return "green";
    case "most-sold":
      return "cyan";
    case "new-arrival":
      return "purple";
    default:
      return "default";
  }
};

interface ProductsTableProps {
  products: Product[];
  isLoading: boolean;
  pagination: any;
  deleteLoading: boolean;
  onDelete: (id: string) => void;
}

const ProductsTable = ({
  products,
  isLoading,
  pagination,
  deleteLoading,
  onDelete,
}: ProductsTableProps) => {
  const t = useTranslations("admin.products");
  const router = useRouter();

  const columns: TableProps<Product>["columns"] = [
    {
      title: t("table.columns.number"),
      key: "number",
      width: 70,
      align: "center",
      fixed: "left",
      render: (text, record, index) => (
        <Link href={`/admin/products/${record.id}`} key={record.id}>
          {index + 1}
        </Link>
      ),
    },
    {
      title: t("table.columns.product"),
      key: "title",
      width: 250,
      align: "center",
      fixed: "left",
      render: (_, record) => (
        <Link
          className="max-w-[200px] flex items-center gap-2 text-black"
          href={`/admin/products/${record.id}`}
        >
          <NextImage
            src={record.imageCover}
            alt={record.title}
            width={40}
            height={40}
            className="object-contain"
          />
          <span className="font-semibold max-w-2/3 truncate">
            {record.title}
          </span>
        </Link>
      ),
    },
    {
      title: t("table.columns.price"),
      dataIndex: "price",
      align: "center",
      key: "price",
      width: 100,
      render: (price: number) => `$${price?.toFixed(2)}`,
      sorter: (a: Product, b: Product) => a.price - b.price,
    },
    {
      title: t("table.columns.category"),
      key: "category",
      align: "center",
      width: 150,
      render: (_, record: Product) => (
        <div className="truncate max-w-[130px]">
          {record.category?.name || t("table.category.uncategorized")}
        </div>
      ),
    },
    {
      title: t("table.columns.stock"),
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
      width: 100,
      sorter: (a: Product, b: Product) => a.quantity - b.quantity,
      render: (quantity: number) => (
        <Tag color={quantity > 10 ? "green" : quantity > 0 ? "orange" : "red"}>
          {quantity}
        </Tag>
      ),
    },
    {
      title: t("table.columns.status"),
      dataIndex: "status",
      key: "status",
      width: 120,
      align: "center",
      render: (status: ProductStatus) => (
        <Tag color={getStatusColor(status)}>{formatStatus(status, t)}</Tag>
      ),
    },
    {
      title: t("table.columns.actions"),
      key: "actions",
      fixed: "right",
      align: "center",
      render: (_, record: Product) => (
        <Space size={24} className="flex-nowrap">
          <Button
            type="link"
            className="!px-2"
            icon={<EditOutlined />}
            onClick={() => router.push(`/admin/products/${record.id}`)}
          >
            {t("table.actions.edit")}
          </Button>
          <Popconfirm
            title={t("table.actions.delete.title")}
            description={t("table.actions.delete.description")}
            onConfirm={() => onDelete(record.id)}
            okText={t("table.actions.delete.confirm")}
            cancelText={t("table.actions.delete.cancel")}
          >
            <Button
              type="link"
              danger
              loading={deleteLoading}
              className="!px-2"
              icon={<DeleteOutlined />}
            >
              {t("table.actions.delete.button")}
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      loading={isLoading}
      dataSource={products}
      columns={columns}
      pagination={pagination}
      rowKey="id"
      scroll={{
        x: 950,
      }}
      className="[&_.ant-table-cell]:whitespace-nowrap"
    />
  );
};

export default ProductsTable;
