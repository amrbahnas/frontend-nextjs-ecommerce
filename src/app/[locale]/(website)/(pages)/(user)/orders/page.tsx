"use client";

import { useGetAllOrders } from "./_api/query";
import { Card, Table, Tag, Button, TableProps } from "antd";
import Container from "@/components/ui/container";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { EyeOutlined } from "@ant-design/icons";
import AllOrdersSkeleton from "./_comps/allorders.skeleton";
import Link from "next/link";
import { FaCreditCard, FaMoneyBill } from "react-icons/fa";
import { useTranslations } from "next-intl";

const OrdersPage = () => {
  const { orders, isLoading } = useGetAllOrders();
  const router = useRouter();
  const t = useTranslations("Orders");

  const columns: TableProps<OrderType>["columns"] = [
    {
      title: t("orderId"),
      dataIndex: "id",
      key: "id",
      render: (id: string) => (
        <Link href={`/orders/${id}`} className="font-medium">
          #{id}
        </Link>
      ),
    },
    {
      title: t("orderDate"),
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: t("paymentMethod"),
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      render: (method: string) => {
        if (method === "card") {
          return (
            <div className="flex items-center justify-center gap-2">
              <FaCreditCard className="text-gray-500" />
              <span>{t("payment.creditCard")}</span>
            </div>
          );
        }
        return (
          <div className="flex items-center justify-center gap-2">
            <FaMoneyBill className="text-gray-500" />
            <span>{t("payment.cashOnDelivery")}</span>
          </div>
        );
      },
    },
    {
      title: t("totalAmount"),
      dataIndex: "totalOrderPrice",
      key: "totalOrderPrice",
      render: (price: number) => (
        <span className="font-medium">${price?.toFixed(2)}</span>
      ),
    },
    {
      title: t("paymentStatus"),
      dataIndex: "isPaid",
      key: "isPaid",
      render: (isPaid: boolean) => (
        <Tag color={isPaid ? "success" : "warning"}>
          {isPaid ? t("status.paid") : t("status.pending")}
        </Tag>
      ),
    },
    {
      title: t("deliveryStatus"),
      dataIndex: "isDelivered",
      key: "isDelivered",
      render: (isDelivered: boolean) => (
        <Tag color={isDelivered ? "success" : "processing"}>
          {isDelivered ? t("status.delivered") : t("status.inProgress")}
        </Tag>
      ),
    },
    {
      title: t("viewDetails"),
      key: "actions",
      render: (_: any, record: OrderType) => (
        <Button
          type="link"
          icon={<EyeOutlined />}
          onClick={() => router.push(`/orders/${record.id}`)}
        >
          {t("viewDetails")}
        </Button>
      ),
    },
  ];

  if (isLoading) {
    return <AllOrdersSkeleton />;
  }

  return (
    <Container>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">{t("title")}</h1>
        <p className="text-gray-500">{t("subtitle")}</p>
      </div>

      <Card>
        <Table
          columns={columns}
          dataSource={orders}
          rowKey="id"
          scroll={{ x: "max-content" }}
          pagination={{
            pageSize: 10,
            position: ["bottomCenter"],
            showSizeChanger: false,
          }}
        />
      </Card>
    </Container>
  );
};

export default OrdersPage;
