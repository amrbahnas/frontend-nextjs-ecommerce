import { TableProps } from "antd";
import React from "react";
import { useGetOrders } from "../_api/query";
import Link from "next/link";
import Table from "@/components/antd/table";

const OrdersTable = () => {
  const {
    orders,
    ordersError,
    ordersIsError,
    ordersIsLoading,
    ordersRefetch,
    pagination,
  } = useGetOrders();

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
    <div className="w-full">
      <h1 className="text-2xl">Orders</h1>
      <div className="mt-2 flex flex-col">
        <Table
          dataSource={orders}
          columns={columns}
          pagination={pagination}
          loading={ordersIsLoading}
        />
      </div>
    </div>
  );
};

export default OrdersTable;
