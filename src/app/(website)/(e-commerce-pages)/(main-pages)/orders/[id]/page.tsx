"use client";
import Link from "next/link";
import { useGetSpecificOrder } from "../_api/query";
import { Spin } from "antd";

const OrderPage = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const { error, isLoading, isError, order } = useGetSpecificOrder(id);

  return (
    <div className="flex flex-col  items-center justify-center ">
      <Spin spinning={isLoading}>
        <div className="shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] px-40 py-20">
          <h1 className="text-xl">Order Details</h1>
          <div className="mt-12 flex flex-col gap-6">
            <div className="">
              <span className="font-medium">Order Id: </span>
              <span>{order._id}</span>
            </div>
            <div className="">
              <span className="font-medium">Created At: </span>
              <span>{new Date(order.createdAt).toLocaleString()}</span>
            </div>
            <div className="">
              <span className="font-medium">Receiver Name: </span>
              <span>{order.user?.name}</span>
            </div>
            <div className="">
              <span className="font-medium">Receiver Email: </span>
              <span>{order.user?.email}</span>
            </div>
            <div className="">
              <span className="font-medium">Price: </span>
              <span>{order.totalOrderPrice}</span>
            </div>
            <div className="">
              <span className="font-medium">Payment Status: </span>
              <span>{order.isPaid ? "Paid" : "Not Paid"}</span>
            </div>
            <div className="">
              <span className="font-medium">Order Status: </span>
              <span>{order.isDelivered ? "Delivered" : "Not Delivered"}</span>
            </div>
            <div className="">
              <span className="font-medium">Delivery Address: </span>
              <span>{order?.address || "No address provided"}</span>
            </div>
          </div>
        </div>
      </Spin>
      <Link href="/" className="underline mt-6">
        Have a problem? Contact us
      </Link>
    </div>
  );
};

export default OrderPage;
