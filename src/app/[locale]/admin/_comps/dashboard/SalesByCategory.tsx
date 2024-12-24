"use client";
import React from "react";
import { Card, Row, Col, Statistic } from "antd";
import { DollarOutlined, ShoppingOutlined } from "@ant-design/icons";

interface SalesByCategoryProps {
  categories: SalesByCategoryType[] | undefined;
}

export function SalesByCategory({ categories }: SalesByCategoryProps) {
  return (
    <Card title="Sales by Category" className="mt-6">
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
                    title="Total Sales"
                    value={category.totalSales}
                    prefix={<DollarOutlined />}
                    valueStyle={{ color: "#3f8600" }}
                    formatter={(value) => `$${value?.toLocaleString()}`}
                    className="text-center sm:text-left"
                  />
                </Col>
                <Col xs={24} sm={12}>
                  <Statistic
                    title="Units Sold"
                    value={category.totalUnits}
                    prefix={<ShoppingOutlined />}
                    valueStyle={{ color: "#1890ff" }}
                    suffix="units"
                    className="text-center sm:text-left"
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
