"use client";
import React from "react";
import { Table, Button, Space, Tag, Popconfirm, TableProps } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Link from "next/link";
import NextImage from "@/components/ui/nextImage";

const formatStatus = (status: ProductStatus | undefined): string => {
  if (!status) return "Unknown";
  return status
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
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
  const router = useRouter();

  const columns: TableProps<Product>["columns"] = [
    {
      title: "No.",
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
      title: "Product ",
      key: "title",
      width: 250,
      align: "center",
      fixed: "left",
      render: (_, record) => (
        <div className="  max-w-[200px] flex items-center gap-2">
          <NextImage
            src={record.imageCover}
            alt=""
            width={40}
            height={40}
            className="object-contain"
          />
          <span className="font-semibold max-w-2/3 truncate">
            {record.title}
          </span>
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      align: "center",

      key: "price",
      width: 100,
      render: (price: number) => `$${price.toFixed(2)}`,
      sorter: (a: Product, b: Product) => a.price - b.price,
    },
    {
      title: "Category",
      key: "category",
      align: "center",

      width: 150,
      render: (_, record: Product) => (
        <div className="truncate max-w-[130px]">
          {record.category?.name || "Uncategorized"}
        </div>
      ),
    },
    {
      title: "Stock",
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      align: "center",

      render: (status: ProductStatus) => (
        <Tag color={getStatusColor(status)}>{formatStatus(status)}</Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      fixed: "right",
      render: (_, record: Product) => (
        <Space size={4} className="flex-nowrap">
          <Button
            type="link"
            className="!px-2"
            icon={<EditOutlined />}
            onClick={() => router.push(`/admin/products/${record.id}`)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete Product"
            description="Are you sure you want to delete this product?"
            onConfirm={() => onDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="link"
              danger
              loading={deleteLoading}
              className="!px-2"
              icon={<DeleteOutlined />}
            >
              Delete
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
