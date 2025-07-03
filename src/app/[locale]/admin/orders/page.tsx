"use client";
import ConfirmModal from "@/components/ui/confirmModal";
import { Badge, Button, Table, TableProps } from "antd";
import dayjs from "dayjs";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaCreditCard,
  FaDollarSign,
  FaHashtag,
  FaTimesCircle,
  FaTruck,
  FaUser,
} from "react-icons/fa";
import AdminPageTile from "../_comps/adminPageTile";
import { useDeliverMultiOrder, usePayMultiOrder } from "./_api/action";
import { useAdminGetOrders } from "./_api/query";
import OrdersFilter from "./_comps/ordersFilter";
import useParamsService from "@/hooks/global/useParamsService";

const Page = () => {
  const { getParams } = useParamsService("");
  const search = getParams("search") || "";
  const createdAt = getParams("createdAt") || "";

  const { orders, ordersLoading, pagination, refetch } = useAdminGetOrders({
    userName: search,
    createdAt,
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { payMultiOrder, payMultiLoading } = usePayMultiOrder();
  const { deliverMultiOrder, deliverMultiLoading } = useDeliverMultiOrder();
  const [payModalVisible, setPayModalVisible] = useState(false);
  const [deliverModalVisible, setDeliverModalVisible] = useState(false);

  const handleBulkPay = () => {
    setPayModalVisible(true);
  };

  const handleBulkDeliver = () => {
    setDeliverModalVisible(true);
  };

  const confirmPay = () => {
    payMultiOrder(
      { orderIds: selectedRowKeys },
      {
        onSuccess: () => {
          refetch();
          toast.success("Orders paid successfully");
          setSelectedRowKeys([]);
          setPayModalVisible(false);
        },
      }
    );
  };

  const confirmDeliver = () => {
    deliverMultiOrder(
      { orderIds: selectedRowKeys },
      {
        onSuccess: () => {
          refetch();
          toast.success("Orders delivered successfully");
          setSelectedRowKeys([]);
          setDeliverModalVisible(false);
        },
      }
    );
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  const columns: TableProps<any>["columns"] = [
    {
      title: (
        <div className="flex items-center gap-1 whitespace-nowrap">
          <FaHashtag /> <span>N</span>
        </div>
      ),
      key: "number",
      align: "center",
      render: (text, record, index) => (
        <Link
          href={`/admin/orders/${record.id}`}
          key={record.id}
          className="text-lg text-center !w-full  "
        >
          {index + 1}
        </Link>
      ),
    },
    {
      title: (
        <div className="flex items-center gap-1 whitespace-nowrap">
          <FaUser /> <span>Client Name</span>
        </div>
      ),
      key: "number",
      dataIndex: ["user", "name"],
      align: "center",
    },
    {
      title: (
        <div className="flex items-center gap-1 whitespace-nowrap">
          <FaDollarSign /> <span>Total Order Price</span>
        </div>
      ),
      dataIndex: "totalOrderPrice",
      key: "totalOrderPrice",
      align: "center",
      render: (price: number) => (
        <div className="flex items-center justify-center">
          <span className="font-semibold">${price?.toFixed(2)}</span>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center gap-1 whitespace-nowrap">
          <FaCalendarAlt /> <span>Created At</span>
        </div>
      ),
      key: "createdAt",
      dataIndex: "createdAt",
      align: "center",
      render: (value) => (
        <div className="flex items-center justify-center">
          {dayjs(value).format("DD/MM/YYYY")}
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center gap-1 whitespace-nowrap">
          <FaCreditCard /> <span>Payment Status</span>
        </div>
      ),
      dataIndex: "isPaid",
      key: "isPaid",
      align: "center",
      render: (isPaid) => (
        <div className="flex items-center justify-center gap-2">
          {isPaid ? (
            <FaCheckCircle className="text-green-500 text-lg" />
          ) : (
            <FaTimesCircle className="text-red-500 text-lg" />
          )}
          <span>{isPaid ? "Paid" : "Not Paid"}</span>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center gap-1 whitespace-nowrap">
          <FaCreditCard /> <span>Payment Method</span>
        </div>
      ),
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      align: "center",
      render: (method) => (
        <div className="flex items-center justify-center gap-2">
          <FaCreditCard className="text-gray-500" />
          <span>{method}</span>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center gap-1 whitespace-nowrap">
          <FaTruck /> <span>Delivery Status</span>
        </div>
      ),
      dataIndex: "isDelivered",
      key: "isDelivered",
      align: "center",
      render: (isDelivered) => (
        <div className="flex items-center justify-center gap-2">
          {isDelivered ? (
            <FaCheckCircle className="text-green-500 text-lg" />
          ) : (
            <FaTimesCircle className="text-red-500 text-lg" />
          )}
          <span>{isDelivered ? "Delivered" : "Not Delivered"}</span>
        </div>
      ),
    },
  ];

  return (
    <div>
      <AdminPageTile>Orders</AdminPageTile>

      <OrdersFilter />
      {selectedRowKeys.length > 0 && (
        <span className="text-gray-600 block mb-3">
          Selected Orders Count:{" "}
          <Badge count={selectedRowKeys.length} color="blue" />
        </span>
      )}
      {selectedRowKeys.length > 0 && (
        <div
          style={{ marginBottom: 16 }}
          className="flex items-center flex-wrap  gap-4"
        >
          <Button
            type="primary"
            onClick={handleBulkPay}
            disabled={payMultiLoading}
            loading={payMultiLoading}
            className="w-full sm:w-auto"
          >
            Pay Selected Orders
          </Button>
          <Button
            onClick={handleBulkDeliver}
            disabled={deliverMultiLoading}
            loading={deliverMultiLoading}
            className="w-full sm:w-auto"
          >
            Deliver Selected Orders
          </Button>
        </div>
      )}
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={orders}
        loading={ordersLoading || payMultiLoading || deliverMultiLoading}
        pagination={pagination}
        rowKey="id"
        scroll={{ x: "max-content" }}
      />

      <ConfirmModal
        title="Confirm Payment"
        itemsCount={selectedRowKeys.length}
        itemName="order"
        action="Pay Orders"
        onConfirm={confirmPay}
        isLoading={payMultiLoading}
        open={payModalVisible}
        onCancel={() => setPayModalVisible(false)}
      />

      <ConfirmModal
        title="Confirm Delivery"
        itemsCount={selectedRowKeys.length}
        itemName="order"
        action="Mark as Delivered"
        onConfirm={confirmDeliver}
        isLoading={deliverMultiLoading}
        open={deliverModalVisible}
        onCancel={() => setDeliverModalVisible(false)}
      />
    </div>
  );
};

export default Page;
