"use client";
import React from "react";
import { Card, List } from "antd";

interface RecentOrdersProps {
  orders: OrderType[] | undefined;
}

export function RecentOrders({ orders }: RecentOrdersProps) {
  return (
    <Card title="Recent Orders">
      <List
        size="small"
        dataSource={orders}
        renderItem={(order: any) => (
          <List.Item>
            <div className="flex justify-between w-full">
              <span className="w-1/2 truncate">Order #{order.id}</span>
              <span className="text-gray-500">
                ${order.totalOrderPrice?.toLocaleString()}
              </span>
            </div>
          </List.Item>
        )}
        pagination={{ pageSize: 5 }}
      />
    </Card>
  );
}
