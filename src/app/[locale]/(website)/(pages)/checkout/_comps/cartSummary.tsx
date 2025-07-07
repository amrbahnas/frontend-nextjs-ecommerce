"use client";

import { useGetCart } from "@/_api/query";
import { Card, List, Spin, Typography } from "antd";
import Image from "next/image";

const { Text } = Typography;

const CartSummary = () => {
  const { cart, isLoading } = useGetCart();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Spin />
      </div>
    );
  }

  const items = (cart?.cartItems || []) as CartItemType[];
  const total = cart?.totalCartPrice || 0;

  return (
    <div>
      <List
        itemLayout="horizontal"
        className="!min-h-[200px] "
        dataSource={items}
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
                <Text strong>{item.title}</Text>
                <div className="text-gray-500">
                  <Text>Quantity: {item.quantity}</Text>
                  <Text className="ml-4">
                    Price: ${(item.price * item.quantity)?.toFixed(2)}
                  </Text>
                </div>
              </div>
            </div>
          </List.Item>
        )}
      />
      <Card className="mt-4">
        <div className="flex justify-between items-center">
          <span className=" font-semibold text-lg">Total Amount:</span>
          <span className="text-xl font-bold">${total?.toFixed(2)}</span>
        </div>
      </Card>
    </div>
  );
};

export default CartSummary;
