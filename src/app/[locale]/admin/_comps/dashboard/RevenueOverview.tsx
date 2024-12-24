'use client';
import React from 'react';
import { Card, Table } from 'antd';

interface RevenueOverviewProps {
  revenue: any[];
}

export function RevenueOverview({ revenue }: RevenueOverviewProps) {
  return (
    <Card className="mt-6">
      <h2 className="text-lg font-semibold mb-4">Revenue Overview</h2>
      <Table
        dataSource={revenue}
        columns={[
          {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
          },
          {
            title: 'Revenue',
            dataIndex: 'revenue',
            key: 'revenue',
            render: (value: number) => `$${value.toLocaleString()}`,
          },
        ]}
        pagination={{ pageSize: 7 }}
        size="small"
      />
    </Card>
  );
}
