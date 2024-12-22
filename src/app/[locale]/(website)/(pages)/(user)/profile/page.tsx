"use client";

import Container from "@/components/container";
import { Avatar, Card, Button, Spin } from "antd";
import MainInfoForm from "./_comps/mainInfoForm";
import { useGetAllOrders } from "../orders/_api/query";
import Link from "next/link";
import dayjs from "dayjs";
import { FiPackage, FiMapPin, FiChevronRight } from "react-icons/fi";
import Addresses from "./_comps/addresses";

const ProfilePage = () => {
  const { orders, isLoading } = useGetAllOrders();
  const lastThreeOrders = orders.slice(0, 3);

  return (
    <Container>
      <div className="my-6">
        <h1 className="text-2xl font-bold mb-2">My Profile</h1>
        <p className="text-gray-500">
          Manage your profile information and orders
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info Section */}
        <Card className="lg:col-span-2 shadow-sm">
          <MainInfoForm />
        </Card>

        {/* Recent Orders Section */}
        <div className="space-y-6">
          <Spin spinning={isLoading}>
            <Card
              title={
                <div className="flex items-center justify-between">
                  <span>Recent Orders</span>
                  <Link href="/orders">
                    <Button
                      type="link"
                      className="flex items-center gap-1 -mr-4"
                    >
                      View All <FiChevronRight />
                    </Button>
                  </Link>
                </div>
              }
              className="shadow-sm"
            >
              <div className="space-y-4">
                {lastThreeOrders.map((order) => (
                  <Link href={`/orders/${order.id}`} key={order.id}>
                    <div className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <FiPackage className="text-gray-600 text-lg" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">#{order.id}</span>
                          <span className="text-sm text-gray-500">
                            {dayjs(order.createdAt).format("DD/MM/YYYY")}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          ${order.totalOrderPrice.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
                {lastThreeOrders.length === 0 && (
                  <div className="text-center py-4 text-gray-500">
                    No orders yet
                  </div>
                )}
              </div>
            </Card>
          </Spin>

          {/* Addresses Section */}
          <Card
            title={
              <div className="flex items-center gap-2">
                <FiMapPin className="text-gray-500" />
                <span>Delivery Addresses</span>
              </div>
            }
            className="shadow-sm"
          >
            <Addresses />
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default ProfilePage;
