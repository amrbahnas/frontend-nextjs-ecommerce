"use client";
import React from "react";
import { Card, Table } from "antd";

interface TopSellingProductsProps {
  products: topSellingProducts[] | undefined;
}

export function TopSellingProducts({ products }: TopSellingProductsProps) {
  const columns = [
    {
      title: "Product",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Sales",
      dataIndex: "sales",
      key: "sales",
      sorter: (a: any, b: any) => a.sales - b.sales,
    },
    {
      title: "Revenue",
      dataIndex: "revenue",
      key: "revenue",
      render: (value: number) => `$${value.toLocaleString()}`,
      sorter: (a: any, b: any) => a.revenue - b.revenue,
    },
  ];

  return (
    <Card title="Top Selling Products">
      <Table
        dataSource={products}
        columns={columns}
        pagination={{ pageSize: 5 }}
        size="small"
      />
    </Card>
  );
}
