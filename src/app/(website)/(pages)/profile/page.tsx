"use client";
import Container from "@/components/container";
import { Divider } from "antd";
import MainInfoForm from "./_comps/mainInfoForm";
import OrdersTable from "./_comps/ordersTable";
import ChangePasswordForm from "./_comps/changePasswordForm";

const ProfilePage = () => {
  return (
    <Container className="mt-8">
      <Divider orientation="left"></Divider>
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-8 items-end ">
        <MainInfoForm />
        <ChangePasswordForm />
      </div>
      <Divider />
      <OrdersTable />
    </Container>
  );
};

export default ProfilePage;
