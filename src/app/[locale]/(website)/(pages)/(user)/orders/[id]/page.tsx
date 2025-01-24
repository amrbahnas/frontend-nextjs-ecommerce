"use client";

import { Card, Descriptions, Steps, Tag, List, Image as AntdImage } from "antd";
import Container from "@/components/container";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import dayjs from "dayjs";
import { useGetSpecificOrder } from "../_api/query";
import OrderDetailsSkeleton from "./_comps/orderDetails.skeleton";
import { use } from "react";

const getOrderStatus = (order?: any) => {
  const steps = [
    { title: "Order Placed", icon: <ShoppingCartOutlined /> },
    { title: "Payment", icon: <DollarOutlined /> },
    { title: "Delivery", icon: <CheckCircleOutlined /> },
  ];

  let current = 0;
  if (order?.isPaid) current = 1;
  if (order?.isDelivered) current = 2;

  return <Steps current={current} items={steps} className="!mb-8" />;
};

const getStatusTag = (status: string) => {
  const statusColors: { [key: string]: string } = {
    pending: "processing",
    processing: "warning",
    delivered: "success",
    cancelled: "error",
  };

  return (
    <Tag color={statusColors[status?.toLowerCase()] || "default"}>{status}</Tag>
  );
};
const OrderDetailsPage = ({ params }: { params: Params }) => {
  const { id } = use(params);
  const { order, isLoading } = useGetSpecificOrder(id);

  if (isLoading || !order) {
    return <OrderDetailsSkeleton />;
  }

  return (
    <Container>
      <div className="py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Order Details</h1>
          <p className="text-gray-500">Order ID: {order?.id}</p>
        </div>

        {getOrderStatus(order)}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card title="Order Items" loading={isLoading}>
              <List
                itemLayout="horizontal"
                dataSource={order?.orderItems}
                renderItem={(item) => (
                  <List.Item>
                    <div className="flex items-center w-full">
                      <div className="relative w-20 h-20 mr-4">
                        <Image
                          src={item.imageCover || ""}
                          alt={item.title || ""}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{item.title}</h4>
                        <div className="text-gray-500 text-sm">
                          <span>Quantity: {item.quantity}</span>
                          {item.color && (
                            <span className="ml-4">Color: {item.color}</span>
                          )}
                          {item.size && (
                            <span className="ml-4">Size: {item.size}</span>
                          )}
                        </div>
                        <div className="text-primary font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </List.Item>
                )}
              />
            </Card>
          </div>

          <div className="space-y-6">
            <Card title="Order Summary" loading={isLoading}>
              <Descriptions column={1}>
                <Descriptions.Item label="Status">
                  {getStatusTag(order?.status || "")}
                </Descriptions.Item>
                <Descriptions.Item label="Order Date">
                  {order?.createdAt
                    ? dayjs(order?.createdAt).format("DD/MM/YYYY")
                    : "-"}
                </Descriptions.Item>
                <Descriptions.Item label="Payment Method">
                  {order?.paymentMethod === "credit"
                    ? "Credit Card"
                    : "Cash on Delivery"}
                </Descriptions.Item>
                <Descriptions.Item label="Payment Status">
                  {order?.isPaid ? (
                    <Tag color="success">Paid</Tag>
                  ) : (
                    <Tag color="warning">Pending</Tag>
                  )}
                </Descriptions.Item>
                <Descriptions.Item label="Total Amount">
                  <span className="text-lg font-bold text-primary">
                    ${order?.totalOrderPrice.toFixed(2)}
                  </span>
                </Descriptions.Item>
              </Descriptions>
            </Card>

            <Card title="Delivery Information" loading={isLoading}>
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <UserOutlined className="mt-1" />
                  <div>
                    <div className="font-medium">Customer</div>
                    <div className="text-gray-500">{order?.user.name}</div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <EnvironmentOutlined className="mt-1" />
                  <div>
                    <div className="font-medium">Delivery Address</div>
                    <div className="text-gray-500">
                      {order?.address.address}, {order?.address.city},{" "}
                      {order?.address.state}, {order?.address.country}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <PhoneOutlined className="mt-1" />
                  <div>
                    <div className="font-medium">Contact</div>
                    <div className="text-gray-500">{order?.address.phone}</div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <ClockCircleOutlined className="mt-1" />
                  <div>
                    <div className="font-medium">Delivery Status</div>
                    <div>
                      {order?.isDelivered ? (
                        <Tag color="success">Delivered</Tag>
                      ) : (
                        <Tag color="processing">In Transit</Tag>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default OrderDetailsPage;
