"use client";
import React from "react";
import { Card, Row, Col, Statistic } from "antd";
import { DollarOutlined, ShoppingOutlined } from "@ant-design/icons";
import { useTranslations } from "next-intl";

interface SalesByCategoryProps {
  categories: SalesByCategoryType[] | undefined;
}

export function SalesByCategory({ categories }: SalesByCategoryProps) {
  const t = useTranslations("admin.dashboard.salesByCategory");

  return (
    <Card title={t("title")} className="mt-6">
      <Row gutter={[16, 16]}>
        {categories?.map((category: SalesByCategoryType) => (
          <Col xs={24} md={12} xl={8} key={category.category}>
            <Card bordered={false} className="bg-gray-50 h-full">
              <div
                className="text-lg font-medium mb-4 truncate capitalize"
                title={category.category}
              >
                {category.category}
              </div>
              <Row gutter={[8, 16]}>
                <Col xs={24} sm={12}>
                  <Statistic
                    title={t("stats.sales")}
                    value={category.totalSales}
                    prefix={<DollarOutlined />}
                    valueStyle={{ color: "#3f8600" }}
                    formatter={(value) => `$${value?.toLocaleString()}`}
                    className="text-center sm:text-start"
                  />
                </Col>
                <Col xs={24} sm={12}>
                  <Statistic
                    title={t("stats.units")}
                    value={category.totalUnits}
                    prefix={<ShoppingOutlined />}
                    valueStyle={{ color: "#1890ff" }}
                    suffix={t("stats.unitsSuffix")}
                    className="text-center sm:text-start"
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
    </Card>
  );
}
