"use client";
import React from "react";
import { Card, Row, Col, Statistic } from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { useTranslations } from "next-intl";

interface StatsCardsProps {
  stats: any;
}

export function StatsCards({ stats }: StatsCardsProps) {
  const t = useTranslations("admin.dashboard.stats");

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} lg={6}>
        <Card bordered={false} className="hover:shadow-md transition-shadow">
          <Statistic
            title={t("users")}
            value={stats?.totalUsers}
            prefix={<UserOutlined />}
            valueStyle={{ color: "#3f8600" }}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card bordered={false} className="hover:shadow-md transition-shadow">
          <Statistic
            title={t("orders")}
            value={stats?.totalOrders}
            prefix={<ShoppingCartOutlined />}
            valueStyle={{ color: "#cf1322" }}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card bordered={false} className="hover:shadow-md transition-shadow">
          <Statistic
            title={t("revenue")}
            value={stats?.totalRevenue}
            prefix={<DollarOutlined />}
            valueStyle={{ color: "#1890ff" }}
            formatter={(value) => `$${value?.toLocaleString()}`}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card bordered={false} className="hover:shadow-md transition-shadow">
          <Statistic
            title={t("products")}
            value={stats?.totalProducts}
            prefix={<ShoppingOutlined />}
            valueStyle={{ color: "#722ed1" }}
          />
        </Card>
      </Col>
    </Row>
  );
}
