"use client";
import React from "react";
import { useAdminGetOrders } from "./_api/query";
import { Divider, Table, TableProps } from "antd";
import Link from "next/link";
import AdminPageTile from "../_comps/adminPageTile";

const Page = () => {
  const { orders, ordersLoading, pagination } = useAdminGetOrders();
  const columns: TableProps<OrderType>["columns"] = [
    {
      title: "N",
      key: "number",
      render: (text, record, index) => (
        <Link href={`/orders/${record._id}`} key={record._id}>
          {index + 1}
        </Link>
      ),
    },
    {
      title: "createdAt",
      key: "createdAt",
      render: (record) => new Date(record.createdAt).toLocaleString(),
    },
    {
      title: "total Order Price",
      dataIndex: "totalOrderPrice",
      key: "totalOrderPrice",
    },
    {
      title: "isPaid",
      dataIndex: "isPaid",
      key: "isPaid",
      render: (isPaid) => (isPaid ? "Paid" : "Not Paid"),
    },
    {
      title: "payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
    },
    {
      title: "isDelivered",
      dataIndex: "isDelivered",
      key: "isDelivered",
      render: (isDelivered) => (isDelivered ? "Delivered" : "Not Delivered"),
    },
  ];

  return (
    <div>
      <AdminPageTile>Orders</AdminPageTile>
      <Table
        dataSource={orders}
        columns={columns}
        pagination={pagination}
        loading={ordersLoading}
      />
    </div>
  );
};

export default Page;
