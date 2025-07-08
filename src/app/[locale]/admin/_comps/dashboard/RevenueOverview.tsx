"use client";
import React from "react";
import { Card, Table } from "antd";
import { useTranslations } from "next-intl";

interface RevenueOverviewProps {
  revenue: any[];
}

export function RevenueOverview({ revenue }: RevenueOverviewProps) {
  const t = useTranslations("admin.dashboard.revenue");

  return (
    <Card className="mt-6">
      <h2 className="text-lg font-semibold mb-4">{t("title")}</h2>
      <Table
        dataSource={revenue}
        columns={[
          {
            title: t("columns.date"),
            dataIndex: "date",
            key: "date",
          },
          {
            title: t("columns.revenue"),
            dataIndex: "revenue",
            key: "revenue",
            render: (value: number) => `$${value.toLocaleString()}`,
          },
        ]}
        pagination={{ pageSize: 7 }}
        size="small"
      />
    </Card>
  );
}
