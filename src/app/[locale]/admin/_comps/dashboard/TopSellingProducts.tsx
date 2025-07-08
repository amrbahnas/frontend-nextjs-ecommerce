"use client";
import React from "react";
import { Card, Table } from "antd";
import { useTranslations } from "next-intl";

interface TopSellingProductsProps {
  products: topSellingProducts[] | undefined;
}

export function TopSellingProducts({ products }: TopSellingProductsProps) {
  const t = useTranslations("admin.dashboard.topProducts");

  const columns = [
    {
      title: t("columns.product"),
      dataIndex: "title",
      key: "title",
    },
    {
      title: t("columns.sales"),
      dataIndex: "sales",
      key: "sales",
      sorter: (a: any, b: any) => a.sales - b.sales,
    },
    {
      title: t("columns.revenue"),
      dataIndex: "revenue",
      key: "revenue",
      render: (value: number) => `$${value.toLocaleString()}`,
      sorter: (a: any, b: any) => a.revenue - b.revenue,
    },
  ];

  return (
    <Card title={t("title")}>
      <Table
        dataSource={products}
        columns={columns}
        pagination={{ pageSize: 5 }}
        size="small"
      />
    </Card>
  );
}
