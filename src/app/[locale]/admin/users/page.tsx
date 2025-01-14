"use client";
import React from "react";
import { Table, Button, Space, Tag, Select, Modal } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useGetAdminUsers } from "./_api/query";
import { useAdminEditUser } from "./_api/actions";
import AdminPageTile from "../_comps/adminPageTile";
import ConfirmModal from "@/components/ui/confirmModal";
import toast from "react-hot-toast";
import NextImage from "@/components/ui/nextImage";
import { MdManageAccounts } from "react-icons/md";
import { FaUserSlash, FaUserCheck } from "react-icons/fa";
import UsersFilter from "./_comps/usersFilter";
import useParamsService from "@/hooks/global/useParamsService";
import Link from "next/link";

const Page = () => {
  const { getParams } = useParamsService("okay");
  const search = getParams("search");
  const { users, isLoading, refetch } = useGetAdminUsers({
    search,
  });

  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
  const [modalType, setModalType] = React.useState<"role" | "active" | null>(
    null
  );
  const [newRole, setNewRole] = React.useState<string>("");

  const {
    changeUserRole,
    changeUserRoleLoading,
    toggleActive,
    toggleActiveLoading,
  } = useAdminEditUser(selectedUser?.id);

  const handleRoleChange = async () => {
    try {
      await changeUserRole(
        { role: newRole },
        {
          onSuccess: () => {
            toast.success("User role updated successfully");
            refetch();
            setModalType(null);
          },
        }
      );
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const handleToggleActive = async () => {
    try {
      await toggleActive(
        {},
        {
          onSuccess: () => {
            toast.success(
              `User ${
                selectedUser?.active ? "deactivated" : "activated"
              } successfully`
            );
            refetch();
            setModalType(null);
          },
        }
      );
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const columns: ColumnsType<User> = [
    {
      title: "User",
      key: "user",
      fixed: "left",
      width: 250,
      render: (_, record) => (
        <Link
          href={`/admin/users/${record.id}`}
          className="flex items-center gap-3"
        >
          <NextImage
            src={record.profileImg}
            alt={record.name}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          <div>
            <div className="font-medium">{record.name}</div>
            <div className="text-sm text-gray-500">{record.email}</div>
          </div>
        </Link>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: 120,
      align: "center",
      render: (role: string) => (
        <Tag color={role === "admin" ? "red" : "blue"}>{role}</Tag>
      ),
    },
    {
      title: "Status",
      key: "status",
      width: 120,
      align: "center",
      render: (_, record) => (
        <Tag color={record.active ? "green" : "red"}>
          {record.active ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: "Email Verified",
      key: "emailVerified",
      width: 120,
      align: "center",
      render: (_, record) => (
        <Tag color={record.emailVerified ? "green" : "orange"}>
          {record.emailVerified ? "Verified" : "Not Verified"}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      fixed: "right",
      width: 100,
      align: "center",
      render: (_, record) => (
        <Space size={4} className="flex-nowrap">
          <Button
            type="link"
            className="!px-2 flex items-center gap-1"
            onClick={() => {
              setSelectedUser(record);
              setModalType("role");
              setNewRole(record.role);
            }}
          >
            <MdManageAccounts className="text-lg" />
            Role
          </Button>
          <Button
            type="link"
            danger={record.active}
            className="!px-2 flex items-center gap-1"
            onClick={() => {
              setSelectedUser(record);
              setModalType("active");
            }}
          >
            {record.active ? (
              <FaUserSlash className="text-lg" />
            ) : (
              <FaUserCheck className="text-lg" />
            )}
            {record.active ? "Block" : "Unblock"}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <AdminPageTile>Users</AdminPageTile>
      <UsersFilter />
      <Table
        columns={columns}
        dataSource={users}
        loading={isLoading}
        rowKey="id"
        scroll={{ x: "max-content" }}
        pagination={{
          position: ["bottomCenter"],
          showSizeChanger: true,
        }}
      />

      <Modal
        open={modalType === "role"}
        title="Change User Role"
        onCancel={() => setModalType(null)}
        onOk={handleRoleChange}
        confirmLoading={changeUserRoleLoading}
        okText="Change Role"
      >
        <div className="mt-4">
          <Select
            value={newRole}
            onChange={setNewRole}
            style={{ width: "100%" }}
            options={[
              { label: "User", value: "user" },
              { label: "Admin", value: "admin" },
            ]}
          />
        </div>
      </Modal>

      <ConfirmModal
        open={modalType === "active"}
        title={selectedUser?.active ? "Deactivate User" : "Activate User"}
        action={selectedUser?.active ? "Deactivate" : "Activate"}
        itemName="User"
        onConfirm={handleToggleActive}
        isLoading={toggleActiveLoading}
        onCancel={() => setModalType(null)}
      />
    </div>
  );
};

export default Page;
