"use client";
import React from "react";
import { useAdminGetOrder } from "./_api/query";
import { useDeliverSingleOrder, usePaySingleOrder } from "./_api/action";
import {
  Badge,
  Button,
  Card,
  Descriptions,
  Divider,
  List,
  Skeleton,
  Tag,
} from "antd";
import { useParams } from "next/navigation";
import {
  FaBox,
  FaCalendarAlt,
  FaCheckCircle,
  FaCreditCard,
  FaDollarSign,
  FaMapMarkerAlt,
  FaTimesCircle,
  FaTruck,
  FaUser,
} from "react-icons/fa";
import dayjs from "dayjs";
import Image from "next/image";
import ConfirmModal from "@/components/ui/confirmModal";
import { useState } from "react";
import toast from "react-hot-toast";

const OrderDetails = () => {
  const { id } = useParams();
  const { order, isLoading } = useAdminGetOrder(id as string);
  const { paySingleOrder, paySingleLoading } = usePaySingleOrder(id as string);
  const { deliverSingleOrder, deliverSingleLoading } = useDeliverSingleOrder(
    id as string
  );
  const [payModalVisible, setPayModalVisible] = useState(false);
  const [deliverModalVisible, setDeliverModalVisible] = useState(false);

  const handlePay = () => {
    paySingleOrder(
      {},
      {
        onSuccess: () => {
          toast.success("Order marked as paid successfully");
          setPayModalVisible(false);
        },
      }
    );
  };

  const handleDeliver = () => {
    deliverSingleOrder(
      {},
      {
        onSuccess: () => {
          toast.success("Order marked as delivered successfully");
          setDeliverModalVisible(false);
        },
      }
    );
  };

  if (isLoading) {
    return <Skeleton active />;
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Order Details</h1>
        <div className="space-x-4">
          {!order?.isPaid && (
            <Button
              type="primary"
              icon={<FaCreditCard className="mr-2" />}
              onClick={() => setPayModalVisible(true)}
              loading={paySingleLoading}
            >
              Mark as Paid
            </Button>
          )}
          {order?.isPaid && !order?.isDelivered && (
            <Button
              icon={<FaTruck className="mr-2" />}
              onClick={() => setDeliverModalVisible(true)}
              loading={deliverSingleLoading}
            >
              Mark as Delivered
            </Button>
          )}
        </div>
      </div>

      {/* Order Status Section */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center space-x-3">
            <FaCreditCard className="text-xl text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Payment Status</p>
              {order?.isPaid ? (
                <div className="flex items-center text-green-500">
                  <FaCheckCircle className="mr-1" /> Paid
                </div>
              ) : (
                <div className="flex items-center text-red-500">
                  <FaTimesCircle className="mr-1" /> Not Paid
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <FaTruck className="text-xl text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Delivery Status</p>
              {order?.isDelivered ? (
                <div className="flex items-center text-green-500">
                  <FaCheckCircle className="mr-1" /> Delivered
                </div>
              ) : (
                <div className="flex items-center text-yellow-500">
                  <FaTimesCircle className="mr-1" /> Pending
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <FaDollarSign className="text-xl text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Total Amount</p>
              <p className="font-semibold">
                ${order?.totalOrderPrice.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <FaCalendarAlt className="text-xl text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Order Date</p>
              <p>{dayjs(order?.createdAt).format("DD/MM/YYYY")}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Customer & Shipping Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card
          title={
            <div className="flex items-center gap-2">
              <FaUser /> Customer Details
            </div>
          }
        >
          <Descriptions column={1}>
            <Descriptions.Item label="Name">
              {order?.user.name}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {order?.user.email}
            </Descriptions.Item>
            <Descriptions.Item label="Phone">
              {order?.user.phone}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        <Card
          title={
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt /> Shipping Address
            </div>
          }
        >
          <Descriptions column={1}>
            <Descriptions.Item label="Address">
              {order?.address.address}
            </Descriptions.Item>
            <Descriptions.Item label="City">
              {order?.address.city}
            </Descriptions.Item>
            <Descriptions.Item label="Phone">
              {order?.address.phone}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </div>

      {/* Order Items */}
      <Card
        title={
          <div className="flex items-center gap-2">
            <FaBox /> Order Items
          </div>
        }
      >
        <List
          dataSource={order?.orderItems}
          renderItem={(item) => (
            <List.Item>
              <div className="flex items-center w-full">
                <div className="relative w-16 h-16">
                  <Image
                    src={item.imageCover || ""}
                    alt={item.title || ""}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <div className="ml-4 flex-grow">
                  <h4 className="font-medium">{item.title}</h4>
                  <p className="text-gray-500">
                    ${item.price} x {item.quantity}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </List.Item>
          )}
        />
        <Divider />
        <div className="flex justify-end">
          <div className="text-right">
            <p className="text-gray-500">
              Total Items: {order?.orderItems.length}
            </p>
            <p className="text-xl font-semibold mt-2">
              Total: ${order?.totalOrderPrice.toFixed(2)}
            </p>
          </div>
        </div>
      </Card>

      {/* Confirmation Modals */}
      <ConfirmModal
        title="Confirm Payment"
        itemsCount={1}
        itemName="order"
        action="Mark as Paid"
        onConfirm={handlePay}
        isLoading={paySingleLoading}
        open={payModalVisible}
        onCancel={() => setPayModalVisible(false)}
      />

      <ConfirmModal
        title="Confirm Delivery"
        itemsCount={1}
        itemName="order"
        action="Mark as Delivered"
        onConfirm={handleDeliver}
        isLoading={deliverSingleLoading}
        open={deliverModalVisible}
        onCancel={() => setDeliverModalVisible(false)}
      />
    </div>
  );
};

export default OrderDetails;
