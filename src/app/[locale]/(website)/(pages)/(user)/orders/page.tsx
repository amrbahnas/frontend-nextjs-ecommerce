"use client";

import { useGetAllOrders } from "./_api/query";
import { Card, Table, Tag, Button, TableProps } from "antd";
import Container from "@/components/ui/container";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { EyeOutlined } from "@ant-design/icons";
import AllOrdersSkeleton from "./_comps/allorders.skeleton";
import Link from "next/link";

const OrdersPage = () => {
  const { orders, isLoading } = useGetAllOrders();
  const router = useRouter();

  const columns: TableProps<OrderType>["columns"] = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
      render: (id: string) => (
        <Link href={`/orders/${id}`} className="font-medium">
          #{id}
        </Link>
      ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "Total",
      dataIndex: "totalOrderPrice",
      key: "totalOrderPrice",
      render: (price: number) => (
        <span className="font-medium">${price?.toFixed(2)}</span>
      ),
    },
    {
      title: "Payment Status",
      dataIndex: "isPaid",
      key: "isPaid",
      render: (isPaid: boolean) => (
        <Tag color={isPaid ? "success" : "warning"}>
          {isPaid ? "Paid" : "Pending"}
        </Tag>
      ),
    },
    {
      title: "Delivery Status",
      dataIndex: "isDelivered",
      key: "isDelivered",
      render: (isDelivered: boolean) => (
        <Tag color={isDelivered ? "success" : "processing"}>
          {isDelivered ? "Delivered" : "In Progress"}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: OrderType) => (
        <Button
          type="link"
          icon={<EyeOutlined />}
          onClick={() => router.push(`/orders/${record.id}`)}
        >
          View Details
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
        <h1 className="text-2xl font-bold mb-2">My Orders</h1>
        <p className="text-gray-500">View and track all your orders</p>
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
