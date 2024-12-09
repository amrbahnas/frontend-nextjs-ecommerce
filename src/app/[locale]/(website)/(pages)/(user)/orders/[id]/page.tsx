"use client";;
import { use } from "react";
import Link from "next/link";
import { useGetSpecificOrder } from "../_api/query";
import { Spin } from "antd";
import Container from "@/components/container";

const OrderPage = (props: { params: Promise<{ id: string }> }) => {
  const params = use(props.params);
  const id = params.id;
  const { error, isLoading, isError, order } = useGetSpecificOrder(id);

  return (
    <Spin spinning={isLoading}>
      <Container className="flex flex-col items-center justify-center  py-10">
        <div className="bg-white shadow-lg rounded-lg px-10 py-8 w-full md:w-2/3">
          <h1 className="text-2xl font-bold mb-6">Order Details</h1>
          <div className="mt-6 flex flex-col gap-4">
            <div className="flex justify-between">
              <span className="font-medium">Order Id:</span>
              <span>{order._id}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Created At:</span>
              <span>{new Date(order.createdAt).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Receiver Name:</span>
              <span>{order.user?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Receiver Email:</span>
              <span>{order.user?.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Price:</span>
              <span className=" font-bold">{order.totalOrderPrice}$</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Payment Status:</span>
              <span>{order.isPaid ? "Paid" : "Not Paid"}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Order Status:</span>
              <span>{order.isDelivered ? "Delivered" : "Not Delivered"}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Delivery Address:</span>
              <span>{order?.address || "No address provided"}</span>
            </div>
          </div>
        </div>
        <Link
          href="/contact-us"
          className="underline mt-6 text-blue-500 hover:text-blue-700"
        >
          Have a problem? Contact us
        </Link>
      </Container>
    </Spin>
  );
};

export default OrderPage;
