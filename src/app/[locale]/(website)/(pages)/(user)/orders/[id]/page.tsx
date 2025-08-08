"use client";

import { Card, Descriptions, Steps, Tag, List, Image } from "antd";
import Container from "@/components/ui/container";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";

import dayjs from "dayjs";
import { useGetSpecificOrder } from "../_api/query";
import OrderDetailsSkeleton from "./_comps/orderDetails.skeleton";
import { use, useEffect } from "react";
import useParamsService from "@/hooks/global/useParamsService";
import toast from "react-hot-toast";
import useCardStore from "@/store/useCardStore";
import { useTranslations } from "next-intl";

const OrderDetailsPage = ({ params }: { params: Params }) => {
  const { id } = use(params);
  const resetCart = useCardStore((store) => store.resetCart);
  const { getParams, removeParams } = useParamsService({});
  const { order, isLoading } = useGetSpecificOrder(id);
  const t = useTranslations("Orders");

  const getOrderStatus = (order?: any) => {
    const steps = [
      { title: t("status.orderPlaced"), icon: <ShoppingCartOutlined /> },
      { title: t("status.payment"), icon: <DollarOutlined /> },
      { title: t("status.delivery"), icon: <CheckCircleOutlined /> },
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
      success: "success",
    };

    return (
      <Tag color={statusColors[status?.toLowerCase()] || "default"}>
        {t(`status.${status.toLowerCase()}`)}
      </Tag>
    );
  };

  useEffect(() => {
    if (Object.values(order).length === 0) return;
    const isSuccess = getParams("success");
    if (isSuccess) {
      resetCart();
      removeParams("success");
      toast.success(t("notifications.orderSuccess"), {
        duration: 1000,
        position: "bottom-center",
      });
      toast.success(t("notifications.checkEmail"), {
        duration: 4000,
        position: "bottom-center",
      });
    }
  }, [order]);

  if (isLoading || !order) {
    return <OrderDetailsSkeleton />;
  }

  return (
    <Container>
      <div className="py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">{t("orderDetails")}</h1>
          <p className="text-gray-500">
            {t("orderId")}: {order?.id}
          </p>
        </div>

        {getOrderStatus(order)}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card title={t("orderItems")} loading={isLoading}>
              <List
                itemLayout="horizontal"
                dataSource={order?.orderItems}
                renderItem={(item) => (
                  <List.Item>
                    <div className="flex items-center w-full">
                      <div className="relative w-20 h-20 me-4">
                        <Image
                          src={item.imageCover || ""}
                          alt={item.title || ""}
                          className="object-cover rounded"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{item.title}</h4>
                        <div className="text-gray-500 text-sm">
                          <span>
                            {t("quantity")}: {item.quantity}
                          </span>
                          {item.color && (
                            <span className="ms-4">
                              {t("color")}: {item.color}
                            </span>
                          )}
                          {item.size && (
                            <span className="ms-4">
                              {t("size")}: {item.size}
                            </span>
                          )}
                        </div>
                        <div className="text-primary font-medium">
                          ${(item.price * item.quantity)?.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </List.Item>
                )}
              />
            </Card>
          </div>

          <div className="space-y-6">
            <Card title={t("orderSummary")} loading={isLoading}>
              <Descriptions column={1}>
                <Descriptions.Item label={t("orderStatus")}>
                  {getStatusTag(order?.status || "")}
                </Descriptions.Item>
                <Descriptions.Item label={t("orderDate")}>
                  {order?.createdAt
                    ? dayjs(order?.createdAt).format("DD/MM/YYYY")
                    : "-"}
                </Descriptions.Item>
                <Descriptions.Item label={t("paymentMethod")}>
                  {order?.paymentMethod === "card"
                    ? t("payment.creditCard")
                    : t("payment.cashOnDelivery")}
                </Descriptions.Item>
                <Descriptions.Item label={t("paymentStatus")}>
                  {order?.isPaid ? (
                    <Tag color="success">{t("status.paid")}</Tag>
                  ) : (
                    <Tag color="warning">{t("status.pending")}</Tag>
                  )}
                </Descriptions.Item>
                <Descriptions.Item label={t("totalAmount")}>
                  <span className="text-lg font-bold text-primary">
                    ${order?.totalOrderPrice?.toFixed(2)}
                  </span>
                </Descriptions.Item>
              </Descriptions>
            </Card>

            <Card title={t("deliveryInfo")} loading={isLoading}>
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <UserOutlined className="mt-1" />
                  <div>
                    <div className="font-medium">{t("customer")}</div>
                    <div className="text-gray-500">{order?.user.name}</div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <EnvironmentOutlined className="mt-1" />
                  <div>
                    <div className="font-medium">{t("deliveryAddress")}</div>
                    <div className="text-gray-500">
                      {order?.address.address}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <PhoneOutlined className="mt-1" />
                  <div>
                    <div className="font-medium">{t("contact")}</div>
                    <div className="text-gray-500">{order?.address.phone}</div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <ClockCircleOutlined className="mt-1" />
                  <div>
                    <div className="font-medium">{t("deliveryStatus")}</div>
                    <div>
                      {order?.isDelivered ? (
                        <Tag color="success">{t("status.delivered")}</Tag>
                      ) : (
                        <Tag color="processing">{t("status.inTransit")}</Tag>
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
