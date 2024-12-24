"use client";
import React from "react";
import { Row, Col, Spin } from "antd";
import { useGetAdminStats, useGetAdminRevenue } from "./_api/query";
import {
  StatsCards,
  RevenueOverview,
  TopSellingProducts,
  RecentOrders,
  SalesByCategory,
} from "./_comps/dashboard";

export default function AdminDashboard() {
  const { stats, isLoading: statsLoading } = useGetAdminStats();
  const { revenue, isLoading: revenueLoading } = useGetAdminRevenue();

  if (statsLoading || revenueLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className=" space-y-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      <StatsCards stats={stats} />
      <RevenueOverview revenue={revenue} />
      <Row gutter={[16, 16]} className="mt-6">
        <Col xs={24} lg={14}>
          <TopSellingProducts products={stats?.topSellingProducts} />
        </Col>
        <Col xs={24} lg={10}>
          <RecentOrders orders={stats?.recentOrders} />
        </Col>
        <Col xs={24}>
          <SalesByCategory categories={stats?.salesByCategory} />
        </Col>
      </Row>
    </div>
  );
}
