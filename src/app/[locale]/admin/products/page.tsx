"use client";
import React, { useState } from "react";
import {
  Table,
  Card,
  Button,
  Input,
  Space,
  Tag,
  Popconfirm,
  message,
  TableProps,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useGetAdminProducts } from "./_api/query";
import Link from "next/link";
import useBreakPoints from "@/hooks/global/userBreakPoints";
import { useAdminDeleteProduct } from "./_api/actions";
import toast from "react-hot-toast";
import CategoriesSelector from "@/components/selectors/categoriesSelector";

const { Search } = Input;

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

export default function ProductsPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [productId, setProductId] = useState("");
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const { deleteProduct, deleteLoading } = useAdminDeleteProduct(productId);

  const { products, isLoading, pagination, refetchProduct } =
    useGetAdminProducts({
      search,
      categoryId,
    });

  const handleDelete = (id: string) => {
    setProductId(id);
    deleteProduct(
      {},
      {
        onSuccess: () => {
          toast.success("Product deleted successfully");
          refetchProduct();
        },
      }
    );
  };

  const columns: TableProps<Product>["columns"] = [
    {
      title: "No.",
      key: "number",
      width: 70,
      fixed: "left",
      render: (text, record, index) => (
        <Link href={`/admin/products/${record.id}`} key={record.id}>
          {index + 1}
        </Link>
      ),
    },
    {
      title: "Product Name",
      dataIndex: "title",
      key: "title",
      width: 250,
      fixed: "left",
      sorter: (a: Product, b: Product) => a.title.localeCompare(b.title),
      render: (text: string) => (
        <div className="truncate max-w-[200px]">{text}</div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 100,
      render: (price: number) => `$${price.toFixed(2)}`,
      sorter: (a: Product, b: Product) => a.price - b.price,
    },
    {
      title: "Category",
      key: "category",
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
            onConfirm={() => handleDelete(record.id)}
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
    <Card className="overflow-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-2xl font-bold">Products Management</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => router.push("/admin/products/create")}
        >
          Add New Product
        </Button>
      </div>

      <div className="mb-4 w-full flex gap-4 items-center">
        <Search
          placeholder="Search by product name"
          allowClear
          className="!w-[350px]"
          enterButton={<SearchOutlined />}
          size="large"
          onSearch={(value) => setSearch(value)}
        />
        <CategoriesSelector
          value={categoryId}
          onChange={(value) => setCategoryId(value)}
          className="!w-[250px]"
          placeholder="Filter by category"
          size="large"
        />
      </div>

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
    </Card>
  );
}
