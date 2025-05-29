"use client";
import { Card, Skeleton, Steps } from "antd";
import Container from "@/components/ui/container";
import {
  CheckCircleOutlined,
  DollarOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

const OrderDetailsSkeleton = () => {
  const steps = [
    { title: "Order Placed", icon: <ShoppingCartOutlined /> },
    { title: "Payment", icon: <DollarOutlined /> },
    { title: "Delivery", icon: <CheckCircleOutlined /> },
  ];

  return (
    <Container>
      <div>
        <div className="mb-6">
          <Skeleton.Input style={{ width: 200 }} active size="large" />
          <div className="mt-2">
            <Skeleton.Input style={{ width: 150 }} active />
          </div>
        </div>

        <Steps current={0} items={steps} className="mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card title="Order Items">
              {[1, 2].map((item) => (
                <div key={item} className="flex gap-4 mb-4">
                  <Skeleton.Image active style={{ width: 100, height: 100 }} />
                  <div className="flex-1">
                    <Skeleton active paragraph={{ rows: 2 }} />
                  </div>
                </div>
              ))}
            </Card>
          </div>

          <div className="space-y-6">
            <Card title="Order Summary">
              <Skeleton active paragraph={{ rows: 4 }} />
            </Card>

            <Card title="Delivery Information">
              <Skeleton active paragraph={{ rows: 3 }} />
            </Card>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default OrderDetailsSkeleton;
