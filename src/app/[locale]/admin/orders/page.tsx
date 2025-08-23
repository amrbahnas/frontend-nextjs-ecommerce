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
import { useTranslations } from "next-intl";

const Page = () => {
  const t = useTranslations("admin.orders");
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
          toast.success(t("actions.bulk.pay.success"));
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
          toast.success(t("actions.bulk.deliver.success"));
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
          <FaHashtag /> <span>{t("table.columns.number")}</span>
        </div>
      ),
      key: "number",
      align: "center",
      render: (text, record, index) => (
        <Link
          href={`/admin/orders/${record.id}`}
          key={record.id}
          className="text-lg text-center !w-full"
        >
          {index + 1}
        </Link>
      ),
    },
    {
      title: (
        <div className="flex items-center gap-1 whitespace-nowrap">
          <FaUser /> <span>{t("table.columns.client")}</span>
        </div>
      ),
      key: "number",
      dataIndex: ["user", "name"],
      align: "center",
    },
    {
      title: (
        <div className="flex items-center gap-1 whitespace-nowrap">
          <FaDollarSign /> <span>{t("table.columns.total")}</span>
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
          <FaCalendarAlt /> <span>{t("table.columns.created")}</span>
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
          <FaCreditCard /> <span>{t("table.columns.payment.status")}</span>
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
          <span>
            {isPaid
              ? t("table.columns.payment.paid")
              : t("table.columns.payment.not_paid")}
          </span>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center gap-1 whitespace-nowrap">
          <FaCreditCard /> <span>{t("table.columns.payment.method")}</span>
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
          <FaTruck /> <span>{t("table.columns.delivery.status")}</span>
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
          <span>
            {isDelivered
              ? t("table.columns.delivery.delivered")
              : t("table.columns.delivery.not_delivered")}
          </span>
        </div>
      ),
    },
  ];

  return (
    <div>
      <AdminPageTile>{t("title")}</AdminPageTile>
      <OrdersFilter />

      <div className="flex gap-2 mb-4">
        {selectedRowKeys.length > 0 && (
          <>
            <Button
              type="primary"
              onClick={handleBulkPay}
              loading={payMultiLoading}
            >
              {t("actions.bulk.pay.button")}
            </Button>
            <Button
              type="primary"
              onClick={handleBulkDeliver}
              loading={deliverMultiLoading}
            >
              {t("actions.bulk.deliver.button")}
            </Button>
          </>
        )}
      </div>

      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={orders}
        loading={ordersLoading}
        pagination={pagination}
        rowKey="id"
        scroll={{ x: true }}
      />

      <ConfirmModal
        open={payModalVisible}
        title={t("actions.bulk.pay.title")}
        action={t("actions.bulk.pay.title")}
        onConfirm={confirmPay}
        onCancel={() => setPayModalVisible(false)}
        confirmLoading={payMultiLoading}
      />

      <ConfirmModal
        open={deliverModalVisible}
        title={t("actions.bulk.deliver.title")}
        action={t("actions.bulk.deliver.title")}
        onConfirm={confirmDeliver}
        onCancel={() => setDeliverModalVisible(false)}
        confirmLoading={deliverMultiLoading}
      />
    </div>
  );
};

export default Page;
