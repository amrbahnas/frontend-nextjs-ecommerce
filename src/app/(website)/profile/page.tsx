"use client";
import { useGetOrders, useMe } from "./_api/query";
import { useUpdateUser } from "./_api/mutation";
import { Button, Form, Input, Spin, Table, TableProps } from "antd";
import { useEffect } from "react";
import { Error } from "@/components/error";
import Link from "next/link";
const { Item } = Form;

interface DataType {
  _id: string;
  createdAt: string;
  totalOrderPrice: number;
  isPaid: boolean;
  paymentMethod: string;
  isDelivered: boolean;
}
const ProfilePage = () => {
  const { user, isError, isLoading, error, refetch } = useMe();
  const {
    orders,
    ordersError,
    ordersIsError,
    ordersIsLoading,
    ordersRefetch,
    pagination,
  } = useGetOrders();
  console.log("🚀 ~ ProfilePage ~ orders:", orders);
  const {
    updateUser,
    updateUserIsPending,
    updateUserError,
    updateUserIsSuccess,
  } = useUpdateUser(refetch);

  const [form] = Form.useForm();

  useEffect(() => {
    if (user) {
      form.setFieldsValue(user);
    }
  }, [user]);

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "N",
      key: "number",
      render: (text, record, index) => (
        <Link href={`/orders/${record._id}`} key={record._id}>
          {index + 1}
        </Link>
      ),
    },
    {
      title: "createdAt",
      key: "createdAt",
      render: (record) => new Date(record.createdAt).toLocaleString(),
    },
    {
      title: "total Order Price",
      dataIndex: "totalOrderPrice",
      key: "totalOrderPrice",
    },
    {
      title: "isPaid",
      dataIndex: "isPaid",
      key: "isPaid",
      render: (isPaid) => (isPaid ? "Paid" : "Not Paid"),
    },
    {
      title: "payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
    },
    {
      title: "isDelivered",
      dataIndex: "isDelivered",
      key: "isDelivered",
      render: (isDelivered) => (isDelivered ? "Delivered" : "Not Delivered"),
    },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-24 md:h-[calc(100vh-180px)] items-center px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="w-full md:w-1/2">
        <h1 className="text-2xl">Profile</h1>
        <Spin spinning={updateUserIsPending || isLoading}>
          <Form
            onFinish={updateUser}
            form={form}
            layout="vertical"
            className="mt-12 flex flex-col gap-4"
          >
            <Item label="Name" name="name">
              <Input
                placeholder="Enter your Name"
                className=" rounded-md p-4"
              />
            </Item>
            <Item
              label="E-mail"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input
                type="email"
                placeholder="Enter your email"
                className=" rounded-md p-4"
              />
            </Item>
            <Item label="Phone" name="phone">
              <Input
                placeholder="Enter your phone"
                className=" rounded-md p-4"
              />
            </Item>
            <Button
              disabled={updateUserIsPending || isLoading}
              loading={updateUserIsPending || isLoading}
              htmlType="submit"
              className="bg-lama text-white p-2 rounded-md cursor-pointer disabled:bg-pink-200 disabled:cursor-not-allowed max-w-96"
            >
              {updateUserIsPending ? "Updating..." : "Update"}
            </Button>
            <Error error={updateUserError} />
          </Form>
        </Spin>
      </div>
      <div className="w-full md:w-1/2">
        <h1 className="text-2xl">Orders</h1>
        <div className="mt-12 flex flex-col">
          <Spin spinning={ordersIsLoading}>
            <Table
              dataSource={orders}
              columns={columns}
              pagination={pagination}
              loading={ordersIsLoading}
            />
          </Spin>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
